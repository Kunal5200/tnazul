"use client";

import { Box } from "@mui/material";
import React from "react";
import banner from "@/public/images/banner_login/login__banner.png";
import Image from "next/image";
import logo from "@/public/images/logo/logo.png";
const LoginLayout = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${banner.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={logo} alt="logo" />
      </Box>
    </Box>
  );
};

export default LoginLayout;
