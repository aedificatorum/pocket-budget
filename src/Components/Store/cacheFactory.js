let resultCache = {};

export const addCacheToFunction = (func, cacheKey, cacheDurationSeconds = 5 /* 5 seconds */) => {
  // TODO: Figure out cache expiration
  
  return (...args) => {
    if(!resultCache[cacheKey]) {
      console.log("No cache entry found, running query");
      resultCache[cacheKey] = func(...args);
    } else {
      console.log("Data found in cache");
    }

    return resultCache[cacheKey];
  }
}