import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const localStorageKeys = [
  "default_currency",
  "default_location",
  "default_project"
];

const admin = ({ categories }) => {
  const removeDefaults = () => {
    localStorageKeys.forEach(k => {
      localStorage.removeItem(k);
    });
  };

  return (
    <div>
      <section>
        <h2>Categories</h2>
        <table css={tw`table-auto w-full text-left`}>
          <tbody>
            {categories.map((category, i) => {
              return (
                <tr key={i}>
                  <td>{category.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <section>
        <h2>Defaults (Local Storage)</h2>
        {localStorageKeys.map(k => {
          return (
            <div key={k}>
              {k}:{localStorage.getItem(k)}
            </div>
          );
        })}
        <button onClick={removeDefaults}>Remove Defaults</button>
      </section>
    </div>
  );
};

export default admin;
