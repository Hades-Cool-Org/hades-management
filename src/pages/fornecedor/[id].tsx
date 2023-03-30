import UserContext from "@/components/Context";
import {
  Button,
  Card,
  CardContent,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import styles from "@/styles/Root.module.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@/types/types";
import Link from "next/link";
import TextFieldStandard from "@/components/TextField";
import { ShoppingCart } from "@mui/icons-material";
import { useRouter } from "next/router";

const VendorPage = () => {
  const [products, setProducts] = useState([]);
  const [itemsList, setItemsList] = useState<any>({});
  let context = useContext(UserContext);
  const { vendor } = context.state;

  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      const data = await axios
        .get("http://localhost:3333/v1/products")
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data.products);
            return response;
          }
        })
        .catch((error) => {
          console.log(`Error: ${error}`);
        });
    }

    fetchProducts();
  }, []);

  const handleItemChange = (e: any) => {
    const { name, value } = e;
    itemsList[name] = value;
    setItemsList({ ...itemsList });
  };

  useEffect(() => {
    console.log(itemsList);
  }, [itemsList]);

  return (
    <main className={styles.main}>
      <Typography variant="h5">{vendor.name}</Typography>
      <Link href={"/produto/adicionar"}>
        <Button variant="contained">Adicionar Produto</Button>
      </Link>
      {products &&
        products.map((product: Product, index) => {
          return (
            <Card key={index}>
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography>Quantidade sugerida:</Typography>
                <TextField
                  key={index}
                  label="Qtd"
                  onChange={handleItemChange}
                />
              </CardContent>
            </Card>
          );
        })}
      <IconButton onClick={() => {router.back()}}>
        <ShoppingCart fontSize="small" style={{ fill: "black" }} />
      </IconButton>
    </main>
  );
};

export default VendorPage;
