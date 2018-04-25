'use strict';

const zlib = require('zlib');
const WritableBufferStream = require('../StreamUtils').WritableBufferStream;

const PREAMBLE = new Buffer("applitools", "utf8");
const COMPRESS_BY_RAW_BLOCKS_FORMAT = 3;

/**
 * Provides image compression based on delta between consecutive images
 */
class ImageDeltaCompressor {

    /**
     * Computes the width and height of the image data contained in the block at the input column and row.
     *
     * @private
     * @param {{width: number, height: number}} imageSize The image size in pixels.
     * @param {int} blockSize The block size for which we would like to compute the image data width and height.
     * @param {int} blockColumn The block column index
     * @param {int} blockRow The block row index
     * @return {{width: number, height: number}} The width and height of the image data contained in the block.
     */
    static _getActualBlockSize(imageSize, blockSize, blockColumn, blockRow) {
        const actualWidth = Math.min(imageSize.width - (blockColumn * blockSize), blockSize);
        const actualHeight = Math.min(imageSize.height - (blockRow * blockSize), blockSize);

        return {
            width: actualWidth,
            height: actualHeight
        };
    }

    /**
     * @private
     * @param {Buffer} sourcePixels
     * @param {Buffer} targetPixels
     * @param {{width: number, height: number}} imageSize
     * @param {int} pixelLength
     * @param {int} blockSize
     * @param {int} blockColumn
     * @param {int} blockRow
     * @param {int} channel
     * @return {{isIdentical: boolean, buffer: Buffer}}
     */
    static _compareAndCopyBlocks(sourcePixels, targetPixels, imageSize, pixelLength, blockSize, blockColumn, blockRow, channel) {
        let isIdentical = true; // initial default

        // Getting the actual amount of data in the block we wish to copy
        const actualBlockSize = ImageDeltaCompressor._getActualBlockSize(imageSize, blockSize, blockColumn, blockRow);

        const actualBlockHeight = actualBlockSize.height;
        const actualBlockWidth = actualBlockSize.width;

        const stride = imageSize.width * pixelLength;

        // The number of bytes actually contained in the block for the
        // current channel (might be less than blockSize*blockSize)
        const channelBytes = new Buffer(actualBlockHeight * actualBlockWidth);
        let channelBytesOffset = 0;

        // Actually comparing and copying the pixels
        let sourceByte, targetByte;
        for (let h = 0; h < actualBlockHeight; ++h) {
            let offset = (((blockSize * blockRow) + h) * stride) + (blockSize * blockColumn * pixelLength) + channel;
            for (let w = 0; w < actualBlockWidth; ++w) {
                sourceByte = sourcePixels[offset];
                targetByte = targetPixels[offset];
                if (sourceByte !== targetByte) {
                    isIdentical = false;
                }

                channelBytes.writeUInt8(targetByte, channelBytesOffset);
                channelBytesOffset++;
                offset += pixelLength;
            }
        }

        return {
            isIdentical,
            buffer: channelBytes
        };
    }

    //noinspection JSUnusedGlobalSymbols
    /**
     * Compresses a target image based on a difference from a source image.
     *
     * {@code blockSize} defaults to 10.
     * @param {Image} targetData The image we want to compress.
     * @param {Buffer} targetBuffer
     * @param {Image} sourceData The baseline image by which a compression will be performed.
     * @param {int} [blockSize=10] How many pixels per block.
     * @return {Buffer} The compression result.
     * @throws java.io.IOException If there was a problem reading/writing from/to the streams which are created during the process.
     */
    static compressByRawBlocks(targetData, targetBuffer, sourceData, blockSize = 10) {
        // If there's no image to compare to, or the images are in different
        // sizes, we simply return the encoded target.
        if (!targetData || !sourceData || (sourceData.width !== targetData.width) || (sourceData.height !== targetData.height)) {
            return targetBuffer;
        }

        // IMPORTANT: Notice that the pixel bytes are (A)RGB!
        const targetPixels = targetData.data;
        const sourcePixels = sourceData.data;

        // The number of bytes comprising a pixel (depends if there's an Alpha channel).
        // target.data[25] & 4 equal 0 if there is no alpha channel but 4 if there is an alpha channel.
        // noinspection NonShortCircuitBooleanExpressionJS, MagicNumberJS
        const pixelLength = (targetData.data[25] & 4) === 4 ? 4 : 3;
        const imageSize = {width: targetData.width, height: targetData.height};

        // Calculating how many block columns and rows we've got.
        const blockColumnsCount = parseInt((targetData.width / blockSize) + ((targetData.width % blockSize) === 0 ? 0 : 1));
        const blockRowsCount = parseInt((targetData.height / blockSize) + ((targetData.height % blockSize) === 0 ? 0 : 1));

        // Writing the header
        const stream = new WritableBufferStream();
        const blocksStream = new WritableBufferStream();
        stream.write(PREAMBLE);
        stream.write(new Buffer([COMPRESS_BY_RAW_BLOCKS_FORMAT]));

        // since we don't have a source ID, we write 0 length (Big endian).
        stream.writeShort(0);
        // Writing the block size (Big endian)
        stream.writeShort(blockSize);

        let compareResult;
        for (let channel = 0; channel < 3; ++channel) {

            // The image is RGB, so all that's left is to skip the Alpha
            // channel if there is one.
            const actualChannelIndex = (pixelLength === 4) ? channel + 1 : channel;

            let blockNumber = 0;
            for (let blockRow = 0; blockRow < blockRowsCount; ++blockRow) {
                for (let blockColumn = 0; blockColumn < blockColumnsCount; ++blockColumn) {

                    compareResult = ImageDeltaCompressor._compareAndCopyBlocks(sourcePixels, targetPixels, imageSize, pixelLength, blockSize, blockColumn, blockRow, actualChannelIndex);

                    if (!compareResult.isIdentical) {
                        blocksStream.writeByte(channel);
                        blocksStream.writeInt(blockNumber);
                        blocksStream.write(compareResult.buffer);

                        // If the number of bytes already written is greater
                        // then the number of bytes for the uncompressed
                        // target, we just return the uncompressed target.
                        if (stream.getBuffer().length + blocksStream.getBuffer().length > targetBuffer.length) {
                            return targetBuffer;
                        }
                    }

                    ++blockNumber;
                }
            }
        }

        stream.write(zlib.deflateRawSync(blocksStream.getBuffer(), {
            level: zlib.Z_BEST_COMPRESSION,
        }));

        if (stream.getBuffer().length > targetBuffer.length) {
            return targetBuffer;
        }

        return stream.getBuffer();
    };
}

module.exports = ImageDeltaCompressor;
