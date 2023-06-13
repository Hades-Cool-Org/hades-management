import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface DeleteIconProps {
  handleClick?: () => void;
}

export default function DeleteIcon({
  handleClick,
}: DeleteIconProps): JSX.Element {
  return (
    <IconButton onClick={handleClick} color="error">
      <Delete />
    </IconButton>
  );
}
