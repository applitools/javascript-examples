'use strict';

const psetTimeout = t =>
  new Promise(res => {
    setTimeout(res, t);
  });

async function getImageSizes({bgImages, timeout = 5000, Image = window.Image}) {
  return (
    await Promise.all(
      Array.from(bgImages).map(url =>
        Promise.race([
          new Promise(resolve => {
            const img = new Image();
            img.onload = () => resolve({url, width: img.naturalWidth, height: img.naturalHeight});
            img.onerror = () => resolve();
            img.src = url;
          }),
          psetTimeout(timeout),
        ]),
      ),
    )
  ).reduce((images, curr) => {
    if (curr) {
      images[curr.url] = {width: curr.width, height: curr.height};
    }
    return images;
  }, {});
}

module.exports = getImageSizes;
