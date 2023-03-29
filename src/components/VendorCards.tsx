import { Vendor } from "@/types/types";
import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

interface VendorCardProps {
  vendor: Vendor;
  index: number;
}

export default function VendorCard({ vendor, index }: VendorCardProps) {
  const { name, location } = vendor;
  return (
    <Card key={index}>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography>{location}</Typography>
      </CardContent>
    </Card>
  );
}
