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
import BaseCard from "./BaseCard";

interface StoreCardProps {
  store: Store;
  index: number;
  handleStoresQuantity: any;
}

export default function StoreCard({
  store,
  index,
  handleStoresQuantity,
}: StoreCardProps) {
  const { name, id } = store;

  return (
    <BaseCard>
      <>
        <Typography variant="h5">{name}</Typography>
        <TextFieldStandard
          number
          label={"Qtde."}
          fieldName={id}
          handleChange={handleStoresQuantity}
        />
      </>
    </BaseCard>
  );
}
