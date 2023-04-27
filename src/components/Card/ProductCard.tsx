import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import React from "react";

interface ProductCardProps {
  product: any;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <Card key={index}>
      <CardContent>
        <Typography variant="h5">{product.name}</Typography>
        <Typography>Motorista:{product.measuring_unit}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
