import UserContext from "@/components/Context";
import { Typography } from "@mui/material";
import React, { useContext } from "react";

const VendorPage = () => {
  let context = useContext(UserContext);

  console.log(context);
  
  return <Typography>name</Typography>;
};

export default VendorPage;
