export const addCatSubcatFromAccount = (accountList, item) => {
  // TODO: Remove once data is cleaned up
  if(item.category) {
    return;
  }
  const account = accountList.find(acc => acc.accountId === item.accountId);
  Object.assign(item, {
    category: account.category,
    subcategory: account.name
  });
};