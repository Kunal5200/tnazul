"use client";

import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import Sidebar from "../widgets/Sidebar/Sidebar";
import Header from "../widgets/Header/Index";
import { usePathname } from "next/navigation";

const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();

  // Routes that should NOT render the default GuestSidebar and Header
  const excludeDefaultLayout =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/dashboard/contracts/create" ||
    pathname.startsWith("/dashboard/marketplace") ||
    pathname.startsWith("/dashboard/contracts/detail");

  // Routes that should NOT render the default Guest Header, but still render Sidebar
  const excludeHeaderOnly =
    pathname.startsWith("/dashboard/my-profile") ||
    pathname.startsWith("/dashboard/saved") ||
    pathname.startsWith("/dashboard/my-contracts") ||
    pathname.startsWith("/dashboard/messages") ||
    pathname.startsWith("/dashboard/notifications") ||
    pathname.startsWith("/dashboard/settings");

  const showSidebar = !excludeDefaultLayout;
  const showHeader = !excludeDefaultLayout && !excludeHeaderOnly;

  // Full-screen locked height dashboard pages (e.g. messages, notifications)
  const isFixedLayout =
    pathname.startsWith("/dashboard/messages") ||
    pathname.startsWith("/dashboard/notifications");

  return (
    <Box>
      {showSidebar && <Sidebar />}
      {showHeader && <Header />}
      <Box
        sx={{
          marginLeft: showSidebar ? "276px" : 0,
          marginTop: showHeader ? "70px" : 0,
          height: isFixedLayout ? "100vh" : "auto",
          minHeight: isFixedLayout ? "auto" : "100vh",
          overflow: isFixedLayout ? "hidden" : "visible",
          backgroundColor: "#F9F8F6EB",
          transition: "margin 0.3s ease",
          px: showSidebar ? 3 : 0,
          pt: showHeader ? 3 : (excludeHeaderOnly ? (isFixedLayout ? 3 : 4) : 0),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default LayoutWrapper;
