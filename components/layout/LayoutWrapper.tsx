import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import GuestSidebar from "../widgets/Sidebar/GuestSidebar";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box>
      <GuestSidebar />
      {children}
    </Box>
  );
};

export default LayoutWrapper;
