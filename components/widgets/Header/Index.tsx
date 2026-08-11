"use client";

import React, { useState, useEffect } from "react";
import { Add, NotificationsNoneOutlined, Login, PersonAddAlt1, AdminPanelSettings } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { COLORS, ACCOUNT_TYPE } from "@/utils/enum";
import { poppins700 } from "@/utils/fonts";
import Link from "next/link";
import { useUserDetail } from "@/hooks/user/useUserDetail";
import { useSidebarStore } from "@/store/sidebarStore";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userData } = useUserDetail();
  const { isCollapsed } = useSidebarStore();

  useEffect(() => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("token") || localStorage.getItem("accessToken")
        : null;

    if (token || userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [userData]);

  return (
    <Box
      sx={{
        left: isCollapsed ? "80px" : "276px",
        right: 0,
        position: "fixed",
        top: 0,
        background: "#FFFFFF",
        height: "70px",
        borderBottom: "1px solid #01354714",
        px: 3,
        display: "flex",
        alignItems: "center",
        zIndex: 1100,
        transition: "left 0.3s ease",
      }}
    >
      <Stack
        direction={"row"}
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Search Bar on the Left */}
        <SearchBar />

        {/* Action Buttons Group on the Right */}
        <Stack direction={"row"} spacing={1.2} sx={{ alignItems: "center", flexShrink: 0 }}>
          {/* Action Button based on Role */}
          {userData?.roleName === ACCOUNT_TYPE.ADMINISTRATOR ? (
            <Link href={"/admin"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                disableElevation
                startIcon={<AdminPanelSettings sx={{ color: COLORS.SECONDARY, fontSize: 20 }} />}
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.SECONDARY,
                  borderRadius: "100px",
                  px: 2,
                  height: "46px",
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#E5B033",
                  },
                }}
              >
                Admin Console
              </Button>
            </Link>
          ) : (
            <Link href={"/dashboard/contracts/create"} style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                disableElevation
                startIcon={<Add sx={{ color: COLORS.SECONDARY, fontSize: 20 }} />}
                sx={{
                  backgroundColor: COLORS.PRIMARY,
                  color: COLORS.SECONDARY,
                  borderRadius: "100px",
                  px: 2,
                  height: "46px",
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  "&:hover": {
                    backgroundColor: "#E5B033",
                  },
                }}
              >
                Add Contract
              </Button>
            </Link>
          )}

          {/* Notifications Button */}
          <IconButton
            sx={{
              borderRadius: "100px",
              height: 46,
              width: 46,
              backgroundColor: "#FFFFFF",
              border: "1px solid #01354714",
              "&:hover": {
                backgroundColor: "#EEF6FA",
              },
            }}
          >
            <NotificationsNoneOutlined sx={{ color: "#7A9BAB", fontSize: 22 }} />
          </IconButton>

          {/* Render Login & Create Account buttons only if user is NOT logged in */}
          {!isLoggedIn && (
            <>
              {/* Login Button */}
              <Link href={"/login"} style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  startIcon={<Login sx={{ color: COLORS.SECONDARY }} />}
                  sx={{
                    color: COLORS.SECONDARY,
                    borderColor: "#01354724",
                    borderRadius: "100px",
                    px: 2,
                    height: "46px",
                    textTransform: "none",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                      borderColor: "#0135473D",
                      backgroundColor: "#EEF6FA",
                    },
                  }}
                >
                  Login
                </Button>
              </Link>

              {/* Create Account Button */}
              <Link href={"/register"} style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  disableElevation
                  startIcon={<PersonAddAlt1 sx={{ color: COLORS.WHITE }} />}
                  sx={{
                    backgroundColor: COLORS.SECONDARY,
                    color: COLORS.WHITE,
                    borderRadius: "100px",
                    px: 2,
                    height: "46px",
                    textTransform: "none",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    "&:hover": {
                      backgroundColor: "#002432",
                    },
                  }}
                >
                  Create Account
                </Button>
              </Link>
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
