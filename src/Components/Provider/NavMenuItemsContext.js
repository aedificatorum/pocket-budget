import React, { useState, useContext } from "react";

const NavMenuItemsContext = React.createContext([[], () => []]);

const NavMenuItemsProvider = ({ children }) => {
  const [navState, setNavState] = useState([]);

  return (
    <NavMenuItemsContext.Provider value={[navState, setNavState]}>
      {children}
    </NavMenuItemsContext.Provider>
  );
};

const useNavMenuItems = () => {
  const [menuItems] = useContext(NavMenuItemsContext);
  return menuItems;
};

const useSetNavMenuItems = () => {
  const [, setMenuItems] = useContext(NavMenuItemsContext);
  return setMenuItems;
};

export { NavMenuItemsProvider, NavMenuItemsContext, useNavMenuItems, useSetNavMenuItems };
