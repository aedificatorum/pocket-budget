export const sortBy = (array, compareFunc) => {
  if (!compareFunc) {
    return array.sort();
  }

  if (typeof compareFunc === "function") {
    return array.sort((a, b) => {
      const aComp = compareFunc(a);
      const bComp = compareFunc(b);

      return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
    });
  }
  return array.sort();
};
