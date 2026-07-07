import { Button, ButtonProps } from "@mui/material";
import React from "react";

const FilledButton = ({ children, sx, ...props }: ButtonProps) => {
  return (
    <Button variant="contained" sx={sx} {...props}>
      {children}
    </Button>
  );
};

export default FilledButton;
