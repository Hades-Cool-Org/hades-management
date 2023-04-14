import { LoginBody, ProductBody } from "@/types/types";
import axios from "axios";
// @ts-ignore
import cookieCutter from "cookie-cutter";
import parseJwt from "@/utils/parseJwt";

export const login = async (body: LoginBody, push: (arg0: string) => void) => {
  const data = await axios
    .post("http://localhost:3333/login", body)
    .then((response) => {
      if (response.status === 200) {
        cookieCutter.set("user", JSON.stringify(parseJwt(response.data.jwt)));
        push("/comprador");
        return response;
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  console.log(data);
  return data;
};

export const addProduct = async (body: ProductBody, back: () => void) => {
  const data = await axios
    .post("http://localhost:3333/v1/products", body)
    .then((response) => {
      if (response.status === 201) {
        back();
        return response;
      }
    })
    .catch((error) => {
      console.log(`Error: ${error}`);
    });
  return data;
};
