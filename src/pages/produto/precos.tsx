import ProductCard from "@/components/Card/ProductCard";
import useFetch from "@/hooks/useFetch";
import { BASE_API } from "@/utils/api";
import React from "react";

const ProductPrices = () => {
  const { data, loading, error } = useFetch(BASE_API + "/products");
  // console.log(data);
  return (
    <>
      {
        // @ts-ignore: Object is possibly 'null'
        data?.products.map((product, index) => {
          console.log(product);
          return <ProductCard key={index} product={product} index={index} />;
        })
      }
    </>
  );
};

export default ProductPrices;
