'use strict';

const RESOURCE_STORAGE_KEY = '__process_resource';

function makeSessionCache({log, sessionStorage}) {
  let sessionStorageCache;
  try {
    sessionStorage = sessionStorage || window.sessionStorage;
    const sessionStorageCacheStr = sessionStorage.getItem(RESOURCE_STORAGE_KEY);
    sessionStorageCache = sessionStorageCacheStr ? JSON.parse(sessionStorageCacheStr) : {};
  } catch (ex) {
    log('error creating session cache', ex);
  }

  return {
    getItem,
    setItem,
    keys,
    persist,
  };

  function getItem(key) {
    if (sessionStorageCache) {
      return sessionStorageCache[key];
    }
  }

  function setItem(key, value) {
    if (sessionStorageCache) {
      log('saving to in-memory sessionStorage, key:', key, 'value:', value);
      sessionStorageCache[key] = value;
    }
  }

  function keys() {
    if (sessionStorageCache) {
      return Object.keys(sessionStorageCache);
    } else {
      return [];
    }
  }

  function persist() {
    if (sessionStorageCache) {
      sessionStorage.setItem(RESOURCE_STORAGE_KEY, JSON.stringify(sessionStorageCache));
    }
  }
}

module.exports = makeSessionCache;
