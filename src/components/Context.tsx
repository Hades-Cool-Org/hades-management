import { Product, Vendor } from "@/types/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface AppContextState {
  user: Object | null;
  vendor: Vendor | null;
  product: Product | null;
  products: Product[];
  session: Object | null;
  order: Object | null;
  delivery: Object | null;
}

const UserContext = React.createContext<IUserContext>({
  state: {
    user: null,
    vendor: null,
    product: null,
    products: [],
    session: null,
    order: null,
    delivery: null,
  },
  setState: (state) => {},
});

interface IUserContext {
  state: AppContextState;
  setState: Dispatch<SetStateAction<Object>>;
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
    order: null,
    delivery: null,
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
