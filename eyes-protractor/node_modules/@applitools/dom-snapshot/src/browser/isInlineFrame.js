'use strict';

function isInlineFrame(frame) {
  return (
    !/^https?:.+/.test(frame.src) ||
    (frame.contentDocument &&
      frame.contentDocument.location &&
      ['about:blank', 'about:srcdoc'].includes(frame.contentDocument.location.href))
  );
}

module.exports = isInlineFrame;
