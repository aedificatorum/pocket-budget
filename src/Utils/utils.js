export const sortBy = (array, compareFuncOrProp) => {
  if (!compareFuncOrProp) {
    return array.sort();
  }

  if (typeof compareFuncOrProp === "function") {
    return array.sort((a, b) => {
      const aComp = compareFuncOrProp(a);
      const bComp = compareFuncOrProp(b);

      return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
    });
  } else if (typeof compareFuncOrProp === "string") {
    return array.sort((a, b) => {
      const aComp = a[compareFuncOrProp];
      const bComp = b[compareFuncOrProp];

      return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
    });
  }

  return array.sort();
};
