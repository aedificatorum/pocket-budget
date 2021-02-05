export const formatCurrency = (currencyCode, amount) => {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: currencyCode }).format(amount)
}