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
import { poppins, poppins700 } from "@/utils/fonts";
import { MuiTelInput, MuiTelInputInfo } from "mui-tel-input";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/utils/validationSchema";
import { useRegister } from "@/hooks/authentication/register";
import { RegisterPayload } from "@/utils/types";

import VerifyOtpForm from "./VerifyOtpForm";

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

  const formik = useFormik({
    initialValues: {
      accountType: ACCOUNT_TYPE.INDIVIDUAL,
      fullName: "",
      mobileNumber: "+966",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: false,
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      let countryCode = "+966";
      let phoneNo = "";

      if (telInfo && telInfo.countryCallingCode) {
        countryCode = "+" + telInfo.countryCallingCode;
        if (telInfo.nationalNumber) {
          phoneNo = telInfo.nationalNumber.replace(/\D/g, "");
        } else {
          const raw = telInfo.numberValue || values.mobileNumber;
          phoneNo = raw.replace("+" + telInfo.countryCallingCode, "").replace(/\D/g, "");
        }
      } else {
        const trimmed = values.mobileNumber.trim();
        const parts = trimmed.split(/\s+/);
        if (parts.length > 1 && parts[0].startsWith("+")) {
          countryCode = parts[0];
          phoneNo = parts.slice(1).join("").replace(/\D/g, "");
        } else {
          const digits = trimmed.replace(/\D/g, "");
          if (trimmed.startsWith("+966")) {
            countryCode = "+966";
            phoneNo = digits.substring(3);
          } else if (trimmed.startsWith("+91")) {
            countryCode = "+91";
            phoneNo = digits.substring(2);
          } else {
            countryCode = "+966";
            phoneNo = digits;
          }
        }
      }

      if (countryCode.length > 4) {
        countryCode = countryCode.substring(0, 4);
      }

      const payload: RegisterPayload = {
        name: values.fullName,
        email: values.email,
        password: values.password,
        phoneNo,
        countryCode,
        accountType: values.accountType,
      };

      console.log("Submitting Register Payload:", payload);

      try {
        const res = await register(payload);
        const refId =
          res?.data?.referenceId ||
          res?.referenceId ||
          res?.data?.id ||
          res?.id ||
          "";

        setOtpStep({
          active: true,
          referenceId: refId,
          mobileNumber: `${countryCode} ${phoneNo}`,
        });
      } catch (err: any) {
        console.error("Register error response:", err?.response?.data || err);
        const msg =
          err?.response?.data?.message ||
          err?.message ||
          "Registration failed. Please try again.";
        setErrorMessage(msg);
      }
    },
  });

  if (otpStep.active) {
    return (
      <VerifyOtpForm
        referenceId={otpStep.referenceId}
        mobileNumber={otpStep.mobileNumber}
        onBack={() => setOtpStep({ active: false, referenceId: "", mobileNumber: "" })}
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

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
          {errorMessage}
        </Alert>
      )}


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
        {/* Individual Account Selector */}
        <Box
          onClick={() =>
            formik.setFieldValue("accountType", ACCOUNT_TYPE.INDIVIDUAL)
          }
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: "18px",
            borderRadius: "14px",
            cursor: "pointer",
            border:
              formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL
                ? `1.5px solid ${COLORS.SECONDARY}`
                : "1.5px solid #0135471F",
            backgroundColor:
              formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL
                ? COLORS.SECONDARY
                : "#FFFFFF",
            color:
              formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL
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
                formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL
                  ? "#FFFFFF15"
                  : "#0135470A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <PersonOutlined
              sx={{
                color:
                  formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL
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
              Individual Account
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color:
                  formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL
                    ? "#A0B7C5"
                    : "#7A9BAB",
              }}
            >
              For personal contracts
            </Typography>
          </Box>
          {formik.values.accountType === ACCOUNT_TYPE.INDIVIDUAL && (
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

        {/* Business Account Selector */}
        <Box
          onClick={() =>
            formik.setFieldValue("accountType", ACCOUNT_TYPE.BUSINESS)
          }
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: "18px",
            borderRadius: "14px",
            cursor: "pointer",
            border:
              formik.values.accountType === ACCOUNT_TYPE.BUSINESS
                ? `1.5px solid ${COLORS.SECONDARY}`
                : "1.5px solid #0135471F",
            backgroundColor:
              formik.values.accountType === ACCOUNT_TYPE.BUSINESS
                ? COLORS.SECONDARY
                : "#FFFFFF",
            color:
              formik.values.accountType === ACCOUNT_TYPE.BUSINESS
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
                formik.values.accountType === ACCOUNT_TYPE.BUSINESS
                  ? "#FFFFFF15"
                  : "#0135470A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <BusinessOutlined
              sx={{
                color:
                  formik.values.accountType === ACCOUNT_TYPE.BUSINESS
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
              Business Account
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color:
                  formik.values.accountType === ACCOUNT_TYPE.BUSINESS
                    ? "#A0B7C5"
                    : "#7A9BAB",
              }}
            >
              For registered companies
            </Typography>
          </Box>
          {formik.values.accountType === ACCOUNT_TYPE.BUSINESS && (
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
      </Stack>

      {/* Row 1: Full Name and Mobile Number */}
      <Stack direction={{ xs: "column", sm: "row" }} spacing={3} sx={{ mb: 3 }}>
        {/* Full Name */}
        <Box sx={{ flex: 1 }}>
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
            FULL NAME<span style={{ color: COLORS.PRIMARY }}>*</span>
          </Typography>
          <TextField
            fullWidth
            id="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={Boolean(formik.touched.fullName && formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
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
            sx={{
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
            }}
          />
        </Box>

        {/* Mobile Number */}
        <Box sx={{ flex: 1 }}>
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
            MOBILE NUMBER<span style={{ color: COLORS.PRIMARY }}>*</span>
          </Typography>
          <MuiTelInput
            fullWidth
            id="mobileNumber"
            name="mobileNumber"
            defaultCountry="SA"
            preferredCountries={["SA", "AE", "KW", "QA", "BH", "OM"]}
            value={formik.values.mobileNumber}
            onChange={(newValue, info) => {
              formik.setFieldValue("mobileNumber", newValue);
              setTelInfo(info);
            }}

            onBlur={() => formik.setFieldTouched("mobileNumber", true)}
            error={Boolean(
              formik.touched.mobileNumber && formik.errors.mobileNumber
            )}
            helperText={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
            placeholder="5X XXX XXXX"
            sx={{
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
          sx={{
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
          }}
        />
      </Box>

      {/* Row 3: Password */}
      <Box sx={{ mb: 3 }}>
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
          sx={{
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
          }}
        />
      </Box>

      {/* Row 4: Confirm Password */}
      <Box sx={{ mb: 4 }}>
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
            formik.touched.confirmPassword && formik.errors.confirmPassword
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
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
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
          sx={{
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
          }}
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
