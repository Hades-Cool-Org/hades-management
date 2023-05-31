import React from "react";
import Head from "next/head";

interface SEOProps {
  pageTitle: string;
  pageDescription: string;
}

export default function SEO({ pageTitle, pageDescription }: SEOProps) {
  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
    </Head>
  );
}
