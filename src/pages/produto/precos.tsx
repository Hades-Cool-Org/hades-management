import ProductCard from "@/components/Card/ProductCard";
import useFetch from "@/hooks/useFetch";
import React from "react";

const ProductPrices = () => {
  const { data, loading, error } = useFetch(
    "http://localhost:3333/v1/products"
  );
  // console.log(data);
  return (
    <>
      {
        // @ts-ignore: Object is possibly 'null'
        data?.products.map((product, index) => {
          console.log(product);
          return <ProductCard product={product} index={index} />;
        })
      }
    </>
  );
};

export default ProductPrices;
