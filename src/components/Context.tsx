import { Product, Vendor } from "@/types/types";
import React, { useState } from "react";

export interface AppContextState {
  user: Object | null;
  vendor: Vendor | null;
  product: Product | null;
  session: Object | null;
}

const UserContext = React.createContext<IUserContext>({
  state: { user: null, vendor: null, product: null, session: null },
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
  const [state, setState] = useState<AppContextState>({
    user: null,
    vendor: null,
    product: null,
    session: null,
  });
  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
