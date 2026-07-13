"use client";

import { Box, Typography } from "@mui/material";
import React from "react";
import banner from "@/public/images/banner_login/login__banner.png";
import Image from "next/image";
import logo from "@/public/images/logo/logo.png";
import LoginForm from "./LoginForm";
import { poppins } from "@/utils/fonts";

const LoginLayout = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${banner.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        {/* Logo Container */}
        <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
          <Image
            src={logo}
            alt="logo"
            width={120}
            height={44}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* Login Form Card */}
        <LoginForm />

        {/* Terms and Privacy Policy Footer */}
        <Typography
          sx={{
            mt: 4,
            fontFamily: poppins.style.fontFamily,
            fontSize: "11px",
            color: "#7A9BAB",
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          By logging in you agree to Tnazul's{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Terms of Service</span> and{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>Privacy Policy</span>.
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginLayout;
