import React from "react";
import { Link } from "react-router-dom";

const QuickAdd = ({ accounts }) => {
  return (
    <ul>
      {accounts.map(account => {
        return (
          <Link
            key={account.accountId}
            to={{ pathname: "/fullform", initialAccountId: account.accountId }}
          >
            <li>
              {account.accountId} - {account.category} - {account.name}
            </li>
          </Link>
        );
      })}
    </ul>
  );
};

export default QuickAdd;
