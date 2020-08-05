'use strict';

function sanitizeAuthUrl(urlStr) {
  const url = new URL(urlStr);
  if (url.username) {
    url.username = '';
  }
  if (url.password) {
    url.password = '';
  }
  return url.href;
}

module.exports = sanitizeAuthUrl;
