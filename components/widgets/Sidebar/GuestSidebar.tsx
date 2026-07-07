import { COLORS } from "@/utils/enum";
import { Box, Divider, IconButton, Stack } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/logo/logo.png";
import { ArrowBackIosNew } from "@mui/icons-material";
import LogoBox from "./components/LogoBox";
import LinkBox from "./components/LinkBox";
import { SIDEBAR_LINKS, SIDEBAR_PROFILE_LINKS } from "@/utils/constant";
const GuestSidebar = () => {
  return (
    <Box>
      <Box
        sx={{
          width: 276,
          background: COLORS.WHITE,
          position: "fixed",
          borderRight: "1.38px solid #01354717",
          left: 0,
          top: 0,
          maxHeight: "100vh",
          overflowY: "auto",
          "::webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <LogoBox />
        <LinkBox data={SIDEBAR_LINKS} />
        <Divider />
        <Box sx={{ mt: 7 }}>
          <LinkBox data={SIDEBAR_PROFILE_LINKS} />
        </Box>
      </Box>
    </Box>
  );
};

export default GuestSidebar;
