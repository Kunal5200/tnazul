import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import Image from "next/image";
import React from "react";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { useSidebarStore } from "@/store/sidebarStore";

const LogoBox = () => {
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  return (
    <div>
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          p: 1.5,
          transition: "all 0.3s ease",
        }}
      >
        {!isCollapsed && (
          <Image
            src={logo}
            alt="Logo"
            style={{ width: "auto", height: "32px", objectFit: "contain" }}
          />
        )}
        <Tooltip
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          placement="right"
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "8px",
              backgroundColor: COLORS.lightGray,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s ease, background-color 0.2s",
              "&:hover": {
                backgroundColor: "#E2E8F0",
              },
            }}
          >
            {isCollapsed ? (
              <ArrowForwardIos
                sx={{ width: 14, height: 14, color: COLORS.SECONDARY }}
              />
            ) : (
              <ArrowBackIosNew
                sx={{ width: 14, height: 14, color: COLORS.SECONDARY }}
              />
            )}
          </IconButton>
        </Tooltip>
      </Stack>
      <Box sx={{ borderBottom: "1px solid #01354717" }}></Box>
    </div>
  );
};

export default LogoBox;
