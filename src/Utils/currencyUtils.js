export const formatCurrency = (currencyCode, amount) => {
  // undefined as locale falls back to the browser's default
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#locales_argument
  return new Intl.NumberFormat(undefined, { style: "currency", currency: currencyCode }).format(
    amount
  );
};
