import { Card, CardContent } from "@mui/material";
import React from "react";

var cardStyle = {
  display: "flex",
  width: "60vw",
  height: "40vw",
  margin: "1rem",
};

export default function BaseCard({ children }: { children: JSX.Element }) {
  return (
    <Card style={cardStyle}>
      <CardContent className="base-card-content">{children}</CardContent>
    </Card>
  );
}
