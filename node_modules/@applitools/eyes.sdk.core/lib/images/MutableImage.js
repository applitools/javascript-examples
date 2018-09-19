'use strict';

const fs = require('fs');

const { Location } = require('../geometry/Location');
const { RectangleSize } = require('../geometry/RectangleSize');
const { ImageUtils } = require('./ImageUtils');
const { GeneralUtils } = require('../utils/GeneralUtils');

const disabled = !fs.open;

/**
 * Parses the image if possible - meaning dimensions and BMP are extracted and available
 *
 * @param {MutableImage} that The context of the current instance of MutableImage
 */
const parseImage = that => that._promiseFactory.makePromise(resolve => {
  if (that._isParsed || disabled) {
    return resolve();
  }

  return ImageUtils.parseImage(that._imageBuffer, that._promiseFactory).then(imageData => {
    that._imageBmp = imageData;
    // noinspection JSUnresolvedVariable
    that._width = imageData.width;
    // noinspection JSUnresolvedVariable
    that._height = imageData.height;
    that._isParsed = true;
    resolve();
  });
});

/**
 * Packs the image if possible - meaning the buffer is updated according to the edited BMP
 *
 * @param {MutableImage} that The context of the current instance of MutableImage
 */
const packImage = that => that._promiseFactory.makePromise(resolve => {
  if (!that._isParsed || that._imageBuffer || disabled) {
    return resolve();
  }

  return ImageUtils.packImage(that._imageBmp, that._promiseFactory).then(buffer => {
    that._imageBuffer = buffer;
    resolve();
  });
});

/**
 * Retrieve image size - if image is not parsed, get image size from buffer
 *
 * @private
 * @param {MutableImage} that The context of the current instance of MutableImage
 */
const retrieveImageSize = that => {
  if (that._isParsed || (that._width && that._height)) {
    return;
  }

  const imageSize = ImageUtils.getImageSizeFromBuffer(that._imageBuffer);
  that._width = imageSize.width;
  that._height = imageSize.height;
};

/**
 * A wrapper for image buffer that parses it to BMP to allow editing and extracting its dimensions
 */
class MutableImage {
  /**
   * @param {Buffer|string} image Encoded bytes of image (buffer or base64 string)
   * @param {PromiseFactory} promiseFactory An object which will be used for creating deferreds/promises.
   */
  constructor(image, promiseFactory) {
    if (GeneralUtils.isBase64(image)) {
      return MutableImage.fromBase64(image, promiseFactory);
    }

    /** @type {Buffer} */
    this._imageBuffer = image;
    /** @type {PromiseFactory} */
    this._promiseFactory = promiseFactory;
    /** @type {boolean} */
    this._isParsed = false;
    /** @type {png.Image|Image} */
    this._imageBmp = undefined;
    /** @type {number} */
    this._width = 0;
    /** @type {number} */
    this._height = 0;
    /** @type {number} */
    this._top = 0;
    /** @type {number} */
    this._left = 0;
  }

  /**
   * @param {string} str Base64 string of image
   * @param {PromiseFactory} promiseFactory An object which will be used for creating deferreds/promises.
   * @return {MutableImage}
   */
  static fromBase64(str, promiseFactory) {
    return new MutableImage(Buffer.from(str, 'base64'), promiseFactory);
  }

  /**
   * @param {number} width
   * @param {number} height
   * @param {PromiseFactory} promiseFactory An object which will be used for creating deferreds/promises.
   * @return {MutableImage}
   */
  static newImage(width, height, promiseFactory) {
    const result = new MutableImage(null, promiseFactory);
    result._isParsed = true;
    result._imageBmp = ImageUtils.createImage(width, height);
    result._width = width;
    result._height = height;
    return result;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Coordinates represent the image's position in a larger context (if any).
   * E.g., A screenshot of the browser's viewport of a web page.
   *
   * @return {Promise<Location>} The coordinates of the image in the larger context (if any)
   */
  getCoordinates() {
    return this._promiseFactory.resolve(new Location(this._left, this._top));
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Coordinates represent the image's position in a larger context (if any).
   * E.g., A screenshot of the browser's viewport of a web page.
   *
   * @param {Location} coordinates
   * @return {Promise<void>}
   */
  setCoordinates(coordinates) {
    this._left = coordinates.getX();
    this._top = coordinates.getY();
    return this._promiseFactory.resolve();
  }

  /**
   * Size of the image. Parses the image if necessary
   *
   * @return {RectangleSize}
   */
  getSize() {
    retrieveImageSize(this);
    return new RectangleSize(this._width, this._height);
  }

  /**
   * @return {number}
   */
  getWidth() {
    retrieveImageSize(this);
    return this._width;
  }

  /**
   * @return {number}
   */
  getHeight() {
    retrieveImageSize(this);
    return this._height;
  }

  // noinspection JSUnusedGlobalSymbols
  /**
   * Return the image as buffer and image width and height.
   *
   * @return {Promise<{imageBuffer: Buffer, width: number, height: number}>}
   */
  asObject() {
    const that = this;
    return packImage(that)
      .then(() => retrieveImageSize(that))
      .then(() => ({
        imageBuffer: that._imageBuffer,
        width: that._width,
        height: that._height,
      }));
  }

  /**
   * Scales the image in place (used to downsize by 2 for retina display chrome bug - and tested accordingly).
   *
   * @param {number} scaleRatio
   * @return {Promise<MutableImage>}
   */
  scale(scaleRatio) {
    if (scaleRatio === 1) {
      return this._promiseFactory.resolve(this);
    }

    const that = this;
    return parseImage(that).then(() => {
      if (that._isParsed) {
        return ImageUtils.scaleImage(that._imageBmp, scaleRatio, that._promiseFactory).then(() => {
          that._imageBuffer = null;
          that._width = that._imageBmp.width;
          that._height = that._imageBmp.height;
          return that;
        });
      }
      return that;
    });
  }

  /**
   * Crops the image according to the given region.
   *
   * @param {Region} region
   * @return {Promise<MutableImage>}
   */
  crop(region) {
    const that = this;
    return parseImage(that).then(() => {
      if (that._isParsed) {
        return ImageUtils.cropImage(that._imageBmp, region, that._promiseFactory).then(() => {
          that._imageBuffer = null;
          that._width = that._imageBmp.width;
          that._height = that._imageBmp.height;
          return that;
        });
      }
      return that;
    });
  }

  /**
   * Crops the image according to the given region and return new image, do not override existing
   * !WARNING this method copy image and crop it. Use image.crop() when it is possible
   *
   * @param {Region} region
   * @return {Promise<MutableImage>}
   */
  getImagePart(region) {
    const that = this;
    return packImage(that).then(() => {
      const newImage = new MutableImage(Buffer.from(that._imageBuffer), that._promiseFactory);
      return newImage.crop(region);
    });
  }

  /**
   * Rotates an image clockwise by a number of degrees rounded to the nearest 90 degrees.
   *
   * @param {number} degrees The number of degrees to rotate the image by
   * @return {Promise<MutableImage>}
   */
  rotate(degrees) {
    const that = this;
    // noinspection MagicNumberJS
    if (degrees % 360 === 0) {
      return that._promiseFactory.resolve(that);
    }

    return parseImage(that).then(() => {
      if (that._isParsed) {
        // If the region's coordinates are relative to the image, we convert them to absolute coordinates.
        return ImageUtils.rotateImage(that._imageBmp, degrees, that._promiseFactory).then(() => {
          that._imageBuffer = null;
          that._width = that._imageBmp.width;
          that._height = that._imageBmp.height;
          return that;
        });
      }
      return that;
    });
  }

  /**
   * @param {number} dx
   * @param {number} dy
   * @param {MutableImage} srcImage
   * @return {Promise<void>}
   */
  copyRasterData(dx, dy, srcImage) {
    const that = this;
    return parseImage(that)
      .then(() => srcImage.getImageData())
      .then(srcImageBmp => {
        let width = srcImage.getWidth();
        let height = srcImage.getHeight();
        const maxWidth = that.getWidth() - dx;
        const maxHeight = that.getHeight() - dy;

        if (maxWidth < width) {
          width = maxWidth;
        }

        if (maxHeight < height) {
          height = maxHeight;
        }

        ImageUtils.copyPixels(that._imageBmp, { x: dx, y: dy }, srcImageBmp, { x: 0, y: 0 }, { width, height });
      });
  }

  /**
   * Write image to local directory
   *
   * @param {string} filename
   * @return {Promise<void>}
   */
  save(filename) {
    const that = this;
    return that.getImageBuffer().then(imageBuffer => ImageUtils.saveImage(imageBuffer, filename, that._promiseFactory));
  }

  /**
   * @return {?Promise<Buffer>}
   */
  getImageBuffer() {
    const that = this;
    return packImage(that).then(() => that._imageBuffer);
  }

  /**
   * @return {?Promise<Buffer>}
   */
  getImageBase64() {
    const that = this;
    return packImage(that).then(() => that._imageBuffer.toString('base64'));
  }

  /**
   * @return {?Promise<png.Image|Image>}
   */
  getImageData() {
    const that = this;
    return parseImage(that).then(() => that._imageBmp);
  }

  /**
   * @param [value=this] What to resolve
   * @return {Promise<MutableImage>}
   */
  resolve(value = this) {
    return this._promiseFactory.resolve(value);
  }
}

exports.MutableImage = MutableImage;
