import { UserContextProvider } from "@/components/Context";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/layout.css";
import type { Page } from "../types/pages";

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <UserContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContextProvider>
  );
}
