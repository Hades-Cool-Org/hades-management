import { Box, Card, CardContent } from "@mui/material";
import React from "react";

var cardStyle = {
  margin: "1rem",
};

export default function BaseCard({ children }: { children: JSX.Element }) {
  return (
    <Card style={cardStyle}>
      <CardContent className="base-card-content">
        <Box className="card-box-content">{children}</Box>
      </CardContent>
    </Card>
  );
}
