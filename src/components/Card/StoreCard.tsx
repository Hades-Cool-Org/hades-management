import { Store } from "@/types/types";
import {
  Autocomplete,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import TextFieldStandard from "../TextField";

interface VendorCardProps {
  store: Store;
  index: number;
  handleStoresQuantity: any;
  vehicles: any;
  handleVehicleChange: any;
}

export default function VendorCard({
  store,
  index,
  handleStoresQuantity,
  vehicles,
  handleVehicleChange,
}: VendorCardProps) {
  const { name, id } = store;

  return (
    <Card key={index}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Autocomplete
          // multiple need to check if this is correct
          id="tags-standard"
          options={vehicles}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => handleVehicleChange(store, value)}
          renderInput={(params) => (
            <TextField {...params} variant="standard" label="Caminhão" />
          )}
        />
        <TextFieldStandard
          number
          label={"Qtde."}
          fieldName={id}
          handleChange={handleStoresQuantity}
        />
      </CardContent>
    </Card>
  );
}
