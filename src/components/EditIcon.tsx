import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

interface EditIconProps {
  handleClick?: () => void;
}

export default function EditIcon({ handleClick }: EditIconProps): JSX.Element {
  return (
    <IconButton onClick={handleClick} color="primary">
      <Edit />
    </IconButton>
  );
}
