"use client";

import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import GuestSidebar from "../widgets/Sidebar/GuestSidebar";
import Header from "../widgets/Header/Index";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Routes that should NOT render the default GuestSidebar and Header
  const excludeDefaultLayout =
    pathname === "/login" || pathname === "/dashboard/contracts/create";

  return (
    <Box>
      {!excludeDefaultLayout && <GuestSidebar />}
      {!excludeDefaultLayout && <Header />}
      <Box
        sx={{
          marginLeft: excludeDefaultLayout ? 0 : "276px",
          marginTop: excludeDefaultLayout ? 0 : "70px",
          minHeight: "100vh",
          backgroundColor: "#F9F8F6EB",
          transition: "margin 0.3s ease",
          px: 3,
          pt: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LayoutWrapper;
