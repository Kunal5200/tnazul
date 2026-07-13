"use client";

import { COLORS } from "@/utils/enum";
import { Box, Divider, Stack, Typography, Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Login, PersonAddAlt1, Logout } from "@mui/icons-material";
import LogoBox from "./components/LogoBox";
import LinkBox from "./components/LinkBox";
import { SIDEBAR_LINKS, SIDEBAR_PROFILE_LINKS } from "@/utils/constant";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    const isProfileRoute =
      pathname.startsWith("/dashboard/my-profile") ||
      pathname.startsWith("/dashboard/saved") ||
      pathname.startsWith("/dashboard/my-contracts") ||
      pathname.startsWith("/dashboard/messages") ||
      pathname.startsWith("/dashboard/notifications") ||
      pathname.startsWith("/dashboard/settings");

    if (token || isProfileRoute) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

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
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          pb: 3,
        }}
      >
        {/* Navigation Links */}
        <Box
          sx={{
            overflowY: "auto",
            flexGrow: 1,
            "::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <LogoBox />
          <LinkBox data={SIDEBAR_LINKS} />
          
          {isLoggedIn && (
            <>
              <Box sx={{ px: 2, my: 1.5 }}>
                <Divider />
              </Box>
              <LinkBox data={SIDEBAR_PROFILE_LINKS} />
            </>
          )}
        </Box>

        {/* Bottom Section */}
        <Box sx={{ px: 2 }}>
          {!isLoggedIn ? (
            <>
              <Divider sx={{ mb: 3 }} />

              {/* Browsing as Guest Card */}
              <Box
                sx={{
                  backgroundColor: "#F4F7F8",
                  borderRadius: "16px",
                  p: 2,
                  mb: 2,
                  border: "1px solid #0135470D",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    color: COLORS.SECONDARY,
                    mb: 0.5,
                  }}
                >
                  Browsing as Guest
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "12px",
                    color: "#7A9BAB",
                    lineHeight: "16px",
                  }}
                >
                  Register free to unlock all features and contact sellers.
                </Typography>
              </Box>

              {/* Action Buttons */}
              <Stack spacing={1.5}>
                <Link href={"/register"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    disableElevation
                    fullWidth
                    startIcon={<PersonAddAlt1 sx={{ color: COLORS.WHITE, fontSize: 18 }} />}
                    sx={{
                      backgroundColor: COLORS.SECONDARY,
                      color: COLORS.WHITE,
                      borderRadius: "100px",
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

                <Link href={"/login"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<Login sx={{ color: COLORS.SECONDARY, fontSize: 18 }} />}
                    sx={{
                      color: COLORS.SECONDARY,
                      borderColor: "#01354724",
                      borderRadius: "100px",
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
              </Stack>
            </>
          ) : (
            <>
              {/* User Profile Card */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 1.5,
                  backgroundColor: "#F4F7F8",
                  borderRadius: "16px",
                  border: "1px solid #0135470D",
                }}
              >
                {/* Avatar */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: "#166CA9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.WHITE,
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    flexShrink: 0,
                  }}
                >
                  AM
                </Box>

                {/* Details */}
                <Box sx={{ flexGrow: 1, minWidth: 0, ml: 1.5 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13px",
                      color: COLORS.SECONDARY,
                    }}
                  >
                    Ahmed Mohamed
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#10753E",
                      }}
                    />
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontWeight: 600,
                        fontSize: "11px",
                        color: "#10753E",
                      }}
                    >
                      Premium
                    </Typography>
                  </Stack>
                </Box>

                {/* Logout Button */}
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: "#7A9BAB",
                    padding: 1,
                    "&:hover": {
                      color: COLORS.SECONDARY,
                      backgroundColor: "#EEF6FA",
                    },
                  }}
                >
                  <Logout sx={{ fontSize: 20 }} />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
