import React, { useState } from "react";

const UserContext = React.createContext<IUserContext>({user:null,setUser:null});

interface IUserContext {
  user: null;
  setUser: React.Dispatch<React.SetStateAction<null>> | null;
}

interface UserContextProps {
  children: JSX.Element;
}

export const UserContextProvider = ({ children }: UserContextProps) => {
  const [user, setUser] = useState(null);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
