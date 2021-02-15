export const sortBy = (array, compareFuncOrProp) => {
  const copy = [...array];

  if (!compareFuncOrProp) {
    copy.sort();
  } else if (typeof compareFuncOrProp === "function") {
    copy.sort((a, b) => {
      const aComp = compareFuncOrProp(a);
      const bComp = compareFuncOrProp(b);

      return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
    });
  } else if (typeof compareFuncOrProp === "string") {
    copy.sort((a, b) => {
      const aComp = a[compareFuncOrProp];
      const bComp = b[compareFuncOrProp];

      return aComp > bComp ? 1 : aComp < bComp ? -1 : 0;
    });
  }

  return copy;
};
