import Context from "@/components/Context";
import Layout from "@/components/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/layout.css";

export default function App({ Component, pageProps }: AppProps) {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    <Context.Provider
      value={{
        state: {
          test: "test",
        },
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Context.Provider>
  );
}
