/* global window */
'use strict';

function fetchUrl(url, fetch = window.fetch) {
  return fetch(url, {cache: 'force-cache', credentials: 'same-origin'}).then(resp =>
    resp.status === 200
      ? resp.arrayBuffer().then(buff => ({
          url,
          type: resp.headers.get('Content-Type'),
          value: buff,
        }))
      : Promise.reject(`bad status code ${resp.status}`),
  );
}

module.exports = fetchUrl;
