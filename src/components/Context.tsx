// import { Context } from "@/types";
import React from "react";

const Context = React.createContext<any>({
  state: {
    test: "test",
    user: {
      id: "1",
      name: "testName",
      phone: "testPhone",
      email: "testEmail",
    },
  },
});

export default Context;
