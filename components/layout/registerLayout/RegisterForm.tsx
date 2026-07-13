"use client";

import {
  LockOutlined,
  PersonOutlined,
  MailOutlined,
  Visibility,
  VisibilityOff,
  BusinessOutlined,
  CheckCircle,
  AssignmentIndOutlined,
  Security,
  ArrowForward,
  CheckCircleOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

const RegisterForm = () => {
  const [accountType, setAccountType] = useState<"individual" | "business">("individual");
  const [fullName, setFullName] = useState("");
  const [countryCode, setCountryCode] = useState("+966");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [nafathVerified, setNafathVerified] = useState(false);

  const handleNafathVerify = () => {
    // Mock Nafath verification flow
    if (nationalId.trim().length >= 9) {
      setNafathVerified(true);
    } else {
      alert("Please enter a valid National ID / Iqama Number first.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    // Registration execution logic goes here
    alert("Registration submitted successfully!");
  };

  const SaudiFlag = () => (
    <Box sx={{ display: "flex", alignItems: "center", mr: 0.5 }}>
      {/* Saudi Flag SVG icon representation */}
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="18" height="12" fill="#006C35" />
        <path d="M6 7.5L8 9.5L12 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Box>
  );

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%", maxWidth: "700px" }}>
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
          mb: 4,
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
        {/* Individual Account Selector */}
        <Box
          onClick={() => setAccountType("individual")}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: "18px",
            borderRadius: "14px",
            cursor: "pointer",
            border: accountType === "individual" ? `1.5px solid ${COLORS.SECONDARY}` : "1.5px solid #0135471F",
            backgroundColor: accountType === "individual" ? COLORS.SECONDARY : "#FFFFFF",
            color: accountType === "individual" ? COLORS.WHITE : COLORS.SECONDARY,
            transition: "all 0.2s ease",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: accountType === "individual" ? "#FFFFFF15" : "#0135470A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <PersonOutlined sx={{ color: accountType === "individual" ? COLORS.WHITE : COLORS.SECONDARY }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "14px" }}>
              Individual Account
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color: accountType === "individual" ? "#A0B7C5" : "#7A9BAB",
              }}
            >
              For personal contracts
            </Typography>
          </Box>
          {accountType === "individual" && (
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
          onClick={() => setAccountType("business")}
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            p: "18px",
            borderRadius: "14px",
            cursor: "pointer",
            border: accountType === "business" ? `1.5px solid ${COLORS.SECONDARY}` : "1.5px solid #0135471F",
            backgroundColor: accountType === "business" ? COLORS.SECONDARY : "#FFFFFF",
            color: accountType === "business" ? COLORS.WHITE : COLORS.SECONDARY,
            transition: "all 0.2s ease",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: accountType === "business" ? "#FFFFFF15" : "#0135470A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <BusinessOutlined sx={{ color: accountType === "business" ? COLORS.WHITE : COLORS.SECONDARY }} />
          </Box>
          <Box>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "14px" }}>
              Business Account
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color: accountType === "business" ? "#A0B7C5" : "#7A9BAB",
              }}
            >
              For registered companies
            </Typography>
          </Box>
          {accountType === "business" && (
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
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
                "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
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
            SAUDI MOBILE NUMBER<span style={{ color: COLORS.PRIMARY }}>*</span>
          </Typography>
          <Stack direction="row" spacing={1}>
            {/* Country code selector */}
            <Select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value as string)}
              IconComponent={() => null}
              sx={{
                width: "90px",
                borderRadius: "10px",
                height: "48px",
                fontFamily: poppins.style.fontFamily,
                fontSize: "13.5px",
                color: COLORS.SECONDARY,
                borderColor: "#0135471F",
                "& .MuiOutlinedInput-input": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  pl: 2,
                  pr: "0px !important",
                },
                "& fieldset": { borderColor: "#0135471F" },
                "&:hover fieldset": { borderColor: "#0135473D" },
                "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
              }}
            >
              <MenuItem value="+966" sx={{ display: "flex", alignItems: "center" }}>
                <SaudiFlag />
                <Typography sx={{ ml: 0.5, fontFamily: poppins.style.fontFamily, fontSize: "13.5px", fontWeight: 500 }}>+966</Typography>
              </MenuItem>
            </Select>

            {/* Mobile number text field */}
            <TextField
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
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
                  "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
                },
              }}
            />
          </Stack>
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
              "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
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
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
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
              "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
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
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff sx={{ fontSize: 18 }} /> : <Visibility sx={{ fontSize: 18 }} />}
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
              "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
            },
          }}
        />
      </Box>

      {/* Identity Verification Section */}
      <Box
        sx={{
          backgroundColor: "#F4F7F8",
          borderRadius: "16px",
          border: "1px solid #0135470D",
          p: 3,
          mb: 4,
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                backgroundColor: "#E7BA491F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Security sx={{ color: COLORS.PRIMARY, fontSize: 18 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  color: COLORS.SECONDARY,
                }}
              >
                Identity Verification
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "10.5px",
                  color: "#7A9BAB",
                }}
              >
                Powered by Nafath - Saudi Government Digital Identity
              </Typography>
            </Box>
          </Stack>
          <Box
            sx={{
              border: "1.2px solid #10753E",
              borderRadius: "6px",
              px: 1.5,
              py: 0.5,
              backgroundColor: "#10753E08",
            }}
          >
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "9px",
                color: "#10753E",
                letterSpacing: "0.5px",
              }}
            >
              GOV. VERIFIED
            </Typography>
          </Box>
        </Stack>

        {/* National ID Field */}
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
          NATIONAL ID / IQAMA NUMBER<span style={{ color: COLORS.PRIMARY }}>*</span>
        </Typography>
        <TextField
          fullWidth
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
          placeholder="e.g. 1XXXXXXXXX"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start" sx={{ mr: 0.5 }}>
                  <AssignmentIndOutlined sx={{ color: "#7A9BAB", fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            mb: 2,
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              height: "48px",
              fontFamily: poppins.style.fontFamily,
              fontSize: "13.5px",
              color: COLORS.SECONDARY,
              "& fieldset": { borderColor: "#0135471F" },
              "&:hover fieldset": { borderColor: "#0135473D" },
              "&.Mui-focused fieldset": { borderColor: COLORS.SECONDARY, borderWidth: "1.5px" },
            },
          }}
        />

        {/* Nafath Green Verification Button */}
        <Button
          onClick={handleNafathVerify}
          variant="contained"
          disableElevation
          fullWidth
          sx={{
            height: "48px",
            borderRadius: "10px",
            backgroundColor: nafathVerified ? "#10753E" : "#10753E",
            color: COLORS.WHITE,
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13.5px",
            display: "flex",
            justifyContent: "space-between",
            px: 3,
            mb: 2,
            "&:hover": {
              backgroundColor: "#0d5c31",
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Security sx={{ mr: 1, fontSize: 18 }} />
            {nafathVerified ? "Identity Verified" : "Verify with Nafath"}
          </Box>
          <ArrowForward sx={{ fontSize: 18 }} />
        </Button>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "10.5px",
            color: "#7A9BAB",
            lineHeight: "15px",
            mb: 3,
          }}
        >
          Your ID is verified directly through Saudi Arabia's official Nafath platform. No documents need to be uploaded.
        </Typography>

        {/* Safe Data Badge */}
        <Box
          sx={{
            backgroundColor: "#10753E0A",
            border: "1px solid #10753E14",
            borderRadius: "8px",
            p: 1.5,
            display: "flex",
            alignItems: "flex-start",
          }}
        >
          <CheckCircleOutlined sx={{ color: "#10753E", fontSize: 18, mr: 1.5, mt: 0.2 }} />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "11px",
              color: "#10753E",
              lineHeight: "16px",
            }}
          >
            <strong>Your data is protected.</strong> Tnazul does not store your ID or personal documents. Verification is handled entirely by the Saudi Government's Nafath infrastructure.
          </Typography>
        </Box>
      </Box>

      {/* Terms and Conditions Checkbox */}
      <Box sx={{ mb: 4, display: "flex", alignItems: "flex-start" }}>
        <Checkbox
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
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
            <span style={{ fontWeight: 700, color: COLORS.SECONDARY }}>Terms & Conditions</span>
          </Link>{" "}
          and{" "}
          <Link href={"/login"} style={{ textDecoration: "none" }}>
            <span style={{ fontWeight: 700, color: COLORS.SECONDARY }}>Transfer Privacy Policy</span>
          </Link>
          . By creating an account you consent to Tnazul's KYC process.
        </Typography>
      </Box>

      {/* Create Account Button */}
      <Button
        type="submit"
        variant="contained"
        disableElevation
        fullWidth
        disabled={!agreeTerms || !nafathVerified}
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
        Create Account
        <ArrowForward sx={{ fontSize: 18 }} />
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
