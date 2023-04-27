import { Store } from "@/types/types";
import {
  Autocomplete,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import TextFieldStandard from "../TextField";

interface VendorCardProps {
  store: Store;
  index: number;
  handleStoresQuantity: any;
}

export default function VendorCard({
  store,
  index,
  handleStoresQuantity,
}: VendorCardProps) {
  const { name } = store;
  return (
    <Card key={index}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Autocomplete
          multiple
          id="tags-standard"
          options={[{ name: "caminhão 1" }, { name: "caminhão 2" }]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Caminhão" />
          )}
        />
        <TextFieldStandard
          label={"Qtde."}
          fieldName={name}
          handleChange={handleStoresQuantity}
        />
      </CardContent>
    </Card>
  );
}
