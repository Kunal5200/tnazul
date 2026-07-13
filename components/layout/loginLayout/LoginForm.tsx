"use client";

import { LockOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

const LoginForm = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login execution logic goes here
  };

  const NafathIcon = () => (
    <Box
      sx={{
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: "#10753E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mr: 1,
      }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5L6 12.5L7.41 11.09L10 13.67L16.59 7.08L18 8.5L10 16.5Z" fill="white"/>
      </svg>
    </Box>
  );

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "460px",
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        boxShadow: "0px 10px 40px rgba(1, 53, 71, 0.06)",
        overflow: "hidden",
        border: "1px solid #0135470D",
      }}
    >
      {/* Brand Gradient Bar */}
      <Box
        sx={{
          height: "6px",
          background: COLORS.linearGradient,
        }}
      />

      {/* Form Fields Box */}
      <Box sx={{ p: 4 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "26px",
            color: COLORS.SECONDARY,
            mb: 0.5,
          }}
        >
          Welcome back
        </Typography>
        
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13px",
            color: "#7A9BAB",
            mb: 4,
          }}
        >
          Login securely to your Tnazul account.
        </Typography>

        {/* Identifier Field */}
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: "10.5px",
            color: "#7A9BAB",
            letterSpacing: "0.5px",
            mb: 1,
          }}
        >
          MOBILE NUMBER OR EMAIL
        </Typography>
        <TextField
          fullWidth
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="05X XXX XXXX or name@email.com"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <span style={{ color: "#7A9BAB", fontSize: "15px", fontWeight: 600 }}>@</span>
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: "48px",
              fontFamily: poppins.style.fontFamily,
              fontSize: "13.5px",
              color: COLORS.SECONDARY,
              "& fieldset": {
                borderColor: "#0135471F",
              },
              "&:hover fieldset": {
                borderColor: "#0135473D",
              },
              "&.Mui-focused fieldset": {
                borderColor: COLORS.SECONDARY,
                borderWidth: "1.5px",
              },
            },
          }}
        />

        {/* Password Field */}
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: "10.5px",
            color: "#7A9BAB",
            letterSpacing: "0.5px",
            mb: 1,
          }}
        >
          PASSWORD
        </Typography>
        <TextField
          fullWidth
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <LockOutlined sx={{ color: "#7A9BAB", fontSize: 18 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 1.5,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: "48px",
              fontFamily: poppins.style.fontFamily,
              fontSize: "13.5px",
              color: COLORS.SECONDARY,
              "& fieldset": {
                borderColor: "#0135471F",
              },
              "&:hover fieldset": {
                borderColor: "#0135473D",
              },
              "&.Mui-focused fieldset": {
                borderColor: COLORS.SECONDARY,
                borderWidth: "1.5px",
              },
            },
          }}
        />

        {/* Forgot Password Link */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
          <Link href={"/login"} style={{ textDecoration: "none" }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "12.5px",
                color: COLORS.SECONDARY,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              Forgot Password?
            </Typography>
          </Link>
        </Box>

        {/* Secure Login Button */}
        <Button
          type="submit"
          variant="contained"
          disableElevation
          fullWidth
          sx={{
            height: "48px",
            borderRadius: "10px",
            backgroundColor: COLORS.SECONDARY,
            color: COLORS.WHITE,
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            mb: 3,
            "&:hover": {
              backgroundColor: "#002432",
            },
          }}
        >
          Secure Login
        </Button>

        {/* Divider */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Divider sx={{ flexGrow: 1, borderColor: "#01354714" }} />
          <Typography
            sx={{
              px: 2,
              fontFamily: poppins.style.fontFamily,
              fontSize: "10px",
              fontWeight: 600,
              color: "#7A9BAB",
              letterSpacing: "0.5px",
            }}
          >
            OR CONTINUE WITH
          </Typography>
          <Divider sx={{ flexGrow: 1, borderColor: "#01354714" }} />
        </Box>

        {/* Nafath Button */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<NafathIcon />}
          sx={{
            height: "48px",
            borderRadius: "100px",
            borderColor: "#01354724",
            color: COLORS.SECONDARY,
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            backgroundColor: "#FFFFFF",
            mb: 3,
            "&:hover": {
              borderColor: "#0135473D",
              backgroundColor: "#EEF6FA",
            },
          }}
        >
          Login with Nafath
        </Button>

        {/* Registration Link */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            Don't have an account?{" "}
            <Link href={"/register"} style={{ textDecoration: "none" }}>
              <span
                style={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  cursor: "pointer",
                }}
              >
                Register here
              </span>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginForm;
