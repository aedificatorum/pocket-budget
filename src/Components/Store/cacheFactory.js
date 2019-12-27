let resultCache = {};
let resultCacheDates = {};

export const addCacheToFunction = (func, cacheKey, cacheDurationSeconds = 60) => {

  return (...args) => {
    if(!resultCache[cacheKey] || resultCacheDates[cacheKey] < new Date().getTime()) {
      resultCache[cacheKey] = func(...args);
      resultCacheDates[cacheKey] = (new Date().getTime() + (cacheDurationSeconds * 1000));
    }

    return resultCache[cacheKey];
  }
}

export const addCacheToFunctionWithArgs = (func, cacheKeyBuilderFunc, cacheDurationSeconds = 60) => {
  return (...args) => {
    const cacheKey = cacheKeyBuilderFunc(...args);

    if(!resultCache[cacheKey] || resultCacheDates[cacheKey] < new Date().getTime()) {
      resultCache[cacheKey] = func(...args);
      resultCacheDates[cacheKey] = (new Date().getTime() + (cacheDurationSeconds * 1000));
    }

    return resultCache[cacheKey];
  }
}