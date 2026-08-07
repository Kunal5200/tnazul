"use client";

import {
  LockOutlined,
  PersonOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff,
  BusinessOutlined,
  CheckCircle,
  ArrowForward,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { ACCOUNT_TYPE, COLORS } from "@/utils/enum";
import { ACCOUNT_TYPE_OPTIONS } from "@/utils/constant";
import { poppins, poppins700 } from "@/utils/fonts";
import { matchIsValidTel, MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/utils/validationSchema";
import { useRegister } from "@/hooks/authentication/register";
import { RegisterPayload } from "@/utils/types";

import VerifyOtpForm from "./VerifyOtpForm";
import { useSnackbarStore } from "@/store/snackbarStore";

const labelStyles = {
  fontFamily: poppins.style.fontFamily,
  fontWeight: 600,
  fontSize: "10.5px",
  color: "#7A9BAB",
  letterSpacing: "0.5px",
  mb: 1,
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    height: "48px",
    fontFamily: poppins.style.fontFamily,
    fontSize: "13.5px",
    color: COLORS.SECONDARY,
    "& fieldset": { borderColor: "#0135471F" },
    "&:hover fieldset": { borderColor: "#0135473D" },
    "&.Mui-focused fieldset": {
      borderColor: COLORS.SECONDARY,
      borderWidth: "1.5px",
    },
  },
};

const RegisterForm = () => {
  const { register, loading } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [telInfo, setTelInfo] = useState<MuiTelInputInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [otpStep, setOtpStep] = useState<{
    active: boolean;
    referenceId: string;
    mobileNumber: string;
  }>({ active: false, referenceId: "", mobileNumber: "" });

  const [phoneNumber, setPhoneNumber] = useState("");

  const { showSuccess, showError } = useSnackbarStore();

  const formik = useFormik({
    initialValues: {
      accountType: ACCOUNT_TYPE.INDIVIDUAL,
      email: "",
      password: "",
      name: "",
      phoneNo: "",
      countryCode: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      if (!values.accountType) {
        showError("Please select account type");
        return;
      }
      if (!values.agreeTerms) {
        showError("Please agree to terms and conditions");
        return;
      }

      const payload: RegisterPayload = {
        accountType: values.accountType,
        email: values.email,
        password: values.password,
        name: values.name,
        phoneNo: values.phoneNo,
        countryCode: values.countryCode,
      };

      register(payload);
    },
  });

  const phoneChangeHandler = (phone: string, info: MuiTelInputInfo | null) => {
    setPhoneNumber(phone);
    const validPhone = matchIsValidTel(phoneNumber);

    if (validPhone) {
      formik.setFieldValue("phoneNo", info?.nationalNumber);
      formik.setFieldValue("countryCode", info?.countryCallingCode);
    }
  };

  if (otpStep.active) {
    return (
      <VerifyOtpForm
        referenceId={otpStep.referenceId}
        mobileNumber={otpStep.mobileNumber}
        onBack={() =>
          setOtpStep({ active: false, referenceId: "", mobileNumber: "" })
        }
      />
    );
  }

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ width: "100%", maxWidth: "700px" }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "30px",
          color: COLORS.SECONDARY,
          mb: 0.5,
        }}
      >
        Create your account
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
        Join the Kingdom's most trusted contract transfer platform.
      </Typography>

      {/* Account Type Selection */}
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 600,
          fontSize: "10.5px",
          color: "#7A9BAB",
          letterSpacing: "0.5px",
          mb: 1.5,
        }}
      >
        ACCOUNT TYPE
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 4 }}>
        {ACCOUNT_TYPE_OPTIONS.map((option) => (
          <Box
            key={option.type}
            onClick={() => formik.setFieldValue("accountType", option.type)}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              p: "18px",
              borderRadius: "14px",
              cursor: "pointer",
              border:
                formik.values.accountType === option.type
                  ? `1.5px solid ${COLORS.SECONDARY}`
                  : "1.5px solid #0135471F",
              backgroundColor:
                formik.values.accountType === option.type
                  ? COLORS.SECONDARY
                  : "#FFFFFF",
              color:
                formik.values.accountType === option.type
                  ? COLORS.WHITE
                  : COLORS.SECONDARY,
              transition: "all 0.2s ease",
              position: "relative",
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                backgroundColor:
                  formik.values.accountType === option.type
                    ? "#FFFFFF15"
                    : "#0135470A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <option.Icon
                sx={{
                  color:
                    formik.values.accountType === option.type
                      ? COLORS.WHITE
                      : COLORS.SECONDARY,
                }}
              />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                {option.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "11px",
                  color:
                    formik.values.accountType === option.type
                      ? "#A0B7C5"
                      : "#7A9BAB",
                }}
              >
                {option.desc}
              </Typography>
            </Box>
            {formik.values.accountType === option.type && (
              <CheckCircle
                sx={{
                  position: "absolute",
                  right: 16,
                  color: COLORS.PRIMARY,
                  fontSize: 20,
                }}
              />
            )}
          </Box>
        ))}
      </Stack>

      {/* Row 1: Full Name and Mobile Number */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mb: 3 }}>
        {/* Full Name */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={labelStyles}>
            FULL NAME<span style={{ color: COLORS.PRIMARY }}>*</span>
          </Typography>
          <TextField
            fullWidth
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            placeholder="e.g. Abdullah Al-Rashidi"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start" sx={{ mr: 0.5 }}>
                    <PersonOutlined sx={{ color: "#7A9BAB", fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={inputStyles}
          />
        </Box>

        {/* Mobile Number */}
        <Box sx={{ flex: 1 }}>
          <Typography sx={labelStyles}>
            MOBILE NUMBER<span style={{ color: COLORS.PRIMARY }}>*</span>
          </Typography>
          <MuiTelInput
            fullWidth
            id="phoneNo"
            name="phoneNo"
            defaultCountry="SA"
            value={phoneNumber}
            onChange={phoneChangeHandler}
            onBlur={() => formik.setFieldTouched("phoneNo", true)}
            error={Boolean(formik.touched.phoneNo && formik.errors.phoneNo)}
            helperText={formik.touched.phoneNo && formik.errors.phoneNo}
            placeholder="5X XXX XXXX"
            sx={{
              ...inputStyles,
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
              },
            }}
          />
        </Box>
      </Stack>

      {/* Row 2: Email Address */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={labelStyles}>
          EMAIL ADDRESS<span style={{ color: COLORS.PRIMARY }}>*</span>
        </Typography>
        <TextField
          fullWidth
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(formik.touched.email && formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          placeholder="name@example.com"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <MailOutlined sx={{ color: "#7A9BAB", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={inputStyles}
        />
      </Box>

      {/* Row 3: Password */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={labelStyles}>
          PASSWORD<span style={{ color: COLORS.PRIMARY }}>*</span>
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
          placeholder="Minimum 8 characters"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <LockOutlined sx={{ color: "#7A9BAB", fontSize: 20 }} />
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
          sx={inputStyles}
        />
      </Box>

      {/* Row 4: Confirm Password */}
      <Box sx={{ mb: 4 }}>
        <Typography sx={labelStyles}>
          CONFIRM PASSWORD<span style={{ color: COLORS.PRIMARY }}>*</span>
        </Typography>
        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={Boolean(
            formik.touched.confirmPassword && formik.errors.confirmPassword,
          )}
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
          placeholder="Re-enter your password"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <LockOutlined sx={{ color: "#7A9BAB", fontSize: 20 }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? (
                      <VisibilityOff sx={{ fontSize: 18 }} />
                    ) : (
                      <Visibility sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          sx={inputStyles}
        />
      </Box>

      {/* Terms and Conditions Checkbox */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          <Checkbox
            id="agreeTerms"
            name="agreeTerms"
            checked={formik.values.agreeTerms}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            sx={{
              color: "#01354724",
              p: 0,
              mr: 1.5,
              mt: 0.3,
              "&.Mui-checked": {
                color: COLORS.SECONDARY,
              },
            }}
          />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "12px",
              color: "#7A9BAB",
              lineHeight: "18px",
            }}
          >
            I agree to the{" "}
            <Link href={"/login"} style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 700, color: COLORS.SECONDARY }}>
                Terms & Conditions
              </span>
            </Link>{" "}
            and{" "}
            <Link href={"/login"} style={{ textDecoration: "none" }}>
              <span style={{ fontWeight: 700, color: COLORS.SECONDARY }}>
                Transfer Privacy Policy
              </span>
            </Link>
            . By creating an account you consent to Tnazul's KYC process.
          </Typography>
        </Box>
        {formik.touched.agreeTerms && formik.errors.agreeTerms && (
          <FormHelperText error sx={{ ml: 4, mt: 0.5 }}>
            {formik.errors.agreeTerms}
          </FormHelperText>
        )}
      </Box>

      {/* Create Account Button */}
      <Button
        type="submit"
        variant="contained"
        disableElevation
        fullWidth
        disabled={loading}
        sx={{
          height: "50px",
          borderRadius: "10px",
          backgroundColor: COLORS.SECONDARY,
          color: COLORS.WHITE,
          textTransform: "none",
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "14px",
          mb: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          "&.Mui-disabled": {
            backgroundColor: "#B0C3CC",
            color: "#FFFFFF99",
          },
          "&:hover": {
            backgroundColor: "#002432",
          },
        }}
      >
        {loading ? "Creating Account..." : "Create Account"}
        {!loading && <ArrowForward sx={{ fontSize: 18 }} />}
      </Button>

      {/* Login Navigation Link */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "13px",
            color: "#7A9BAB",
          }}
        >
          Already have an account?{" "}
          <Link href={"/login"} style={{ textDecoration: "none" }}>
            <span
              style={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                color: COLORS.SECONDARY,
                cursor: "pointer",
              }}
            >
              Login
            </span>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterForm;
