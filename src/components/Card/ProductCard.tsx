import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  product: any;
  index: number;
  selected?: boolean;
  handleLinkClick?: any;
}

const ProductCard = ({
  product,
  index,
  selected,
  handleLinkClick,
}: ProductCardProps) => {
  return (
    <Link
      href={{ pathname: `/produto/${product.id}` }}
      onClick={handleLinkClick}
    >
      {selected ? (
        <Card key={index} style={{ backgroundColor: "#777777" }}>
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>Unidade de medida:{product.measuring_unit}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Card key={index}>
          <CardContent>
            <Typography variant="h5">{product.name}</Typography>
            <Typography>Unidade de medida:{product.measuring_unit}</Typography>
          </CardContent>
        </Card>
      )}
    </Link>
  );
};

export default ProductCard;
