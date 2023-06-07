import { Card, CardContent } from "@mui/material";
import React from "react";

var cardStyle = {
  display: "block",
  width: "60vw",
  height: "40vw",
};

export default function BaseCard({ children }: { children: JSX.Element }) {
  return (
    <Card style={cardStyle}>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
