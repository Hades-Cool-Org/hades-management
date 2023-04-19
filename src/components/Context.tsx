import React, { useState } from "react";

interface AppContextState {
  user: Object;
  vendor: Object;
}

const UserContext = React.createContext<IUserContext>({
  state: { user: null, vendor: null },
  setState: (state: AppContextState) => {},
});

interface IUserContext {
  state: AppContextState;
  setState: (state: AppContextState) => any;
}

interface UserContextProps {
  children: JSX.Element;
}

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [state, setState] = useState({});
  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
