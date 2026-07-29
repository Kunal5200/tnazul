"use client";

import { LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { useLogin } from "@/hooks/authentication/login";
import { loginValidationSchema } from "@/utils/validationSchema";

const LoginForm = () => {
  const router = useRouter();
  const { login, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      identity: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const response = await login({
          identity: values.identity,
          password: values.password,
        });

        const accessToken =
          response?.data?.accessToken ||
          response?.accessToken ||
          response?.token;
        const refreshToken =
          response?.data?.refreshToken ||
          response?.refreshToken;

        if (accessToken) {
          localStorage.setItem("token", accessToken);
          localStorage.setItem("accessToken", accessToken);
        }
        if (refreshToken) {
          localStorage.setItem("refreshToken", refreshToken);
        }

        router.push("/dashboard");

      } catch (err: any) {
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to login. Please check your credentials.";
        setErrorMessage(msg);
      }
    },
  });

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
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 16.5L6 12.5L7.41 11.09L10 13.67L16.59 7.08L18 8.5L10 16.5Z"
          fill="white"
        />
      </svg>
    </Box>
  );

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
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
            mb: 3,
          }}
        >
          Login securely to your Tnazul account.
        </Typography>

        {errorMessage && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
            {errorMessage}
          </Alert>
        )}

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
          id="identity"
          name="identity"
          value={formik.values.identity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.identity && formik.errors.identity)}
          helperText={formik.touched.identity && formik.errors.identity}
          placeholder="05X XXX XXXX or name@email.com"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <span
                    style={{
                      color: "#7A9BAB",
                      fontSize: "15px",
                      fontWeight: 600,
                    }}
                  >
                    @
                  </span>
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
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #FFFFFF inset !important",
              WebkitTextFillColor: `${COLORS.SECONDARY} !important`,
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
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          placeholder="Enter your password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <LockOutlined sx={{ color: "#7A9BAB", fontSize: 18 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ fontSize: 18 }} />
                    ) : (
                      <Visibility sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
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
            "& input:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #FFFFFF inset !important",
              WebkitTextFillColor: `${COLORS.SECONDARY} !important`,
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
          disabled={loading}
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
            "&.Mui-disabled": {
              backgroundColor: "#B0C3CC",
              color: "#FFFFFF99",
            },
            "&:hover": {
              backgroundColor: "#002432",
            },
          }}
        >
          {loading ? "Logging in..." : "Secure Login"}
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
