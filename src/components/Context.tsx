import { Product, Vendor } from "@/types/types";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Cookie from "js-cookie";

export interface AppContextState {
  user: Object | null;
  vendor: Vendor | null;
  product: Product | null;
  products: Product[];
  session: Object | null;
  order: Object | null;
  delivery: Object | null;
  store: Object | null;
}

interface IUserContext {
  state: AppContextState;
  setState: Dispatch<SetStateAction<Object>>;
}

interface UserContextProps {
  children: JSX.Element;
}

export const initialState = {
  user: null,
  vendor: null,
  product: null,
  products: [],
  session: null,
  order: null,
  delivery: null,
  store: null,
};

const UserContext = React.createContext<IUserContext>({
  state: initialState,
  setState: (state) => {},
});

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [state, setState] = useState<AppContextState>(initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  useEffect(() => {
    if (state == initialState) {
      const cookieState = Cookie.get("state");
      if (typeof cookieState === "string") {
        const parsedCookie = JSON.parse(cookieState);
        setState((prevState) => ({
          ...parsedCookie,
        }));
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
