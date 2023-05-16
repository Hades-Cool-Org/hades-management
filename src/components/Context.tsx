import { Product, Vendor } from "@/types/types";
import React, { useEffect, useState } from "react";

export interface AppContextState {
  user: Object | null;
  vendor: Vendor | null;
  product: Product | null;
  products: Product[];
  session: Object | null;
}

const UserContext = React.createContext<IUserContext>({
  state: {
    user: null,
    vendor: null,
    product: null,
    products: [],
    session: null,
  },
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
    products: [],
    session: null,
  });

  useEffect(() => {
    console.log(state);
  }, [state]);
  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
