import { Box } from "@mui/material";
import React, { ReactNode } from "react";

const CustomWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <Box sx={{ marginLeft: "280px" }}>{children}</Box>
    </Box>
  );
};

export default CustomWrapper;
