'use strict';

function makeFetchCss(fetch, {fetchTimeLimit} = {}) {
  return async function fetchCss(url) {
    const controller = new AbortController();
    const response = fetch(url, {cache: 'force-cache', signal: controller.signal})
      .then(response => {
        if (response.ok) {
          return response.text();
        }
        console.log('/failed to fetch (status ' + response.status + ') css from: ' + url + '/');
      })
      .catch(err => {
        console.log('/failed to fetch (error ' + err.toString() + ') css from: ' + url + '/');
      });
    const result = [response];
    if (!Number.isNaN(Number(fetchTimeLimit))) {
      result.push(
        new Promise(resolve => setTimeout(resolve, fetchTimeLimit)).then(() => controller.abort()),
      );
    }
    return Promise.race(result);
  };
}

module.exports = makeFetchCss;
