"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowForward, MarkEmailReadOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { useVerifyOtp } from "@/hooks/authentication/verifyOtp";

interface VerifyOtpFormProps {
  referenceId: string;
  mobileNumber?: string;
  onBack?: () => void;
}

const VerifyOtpForm: React.FC<VerifyOtpFormProps> = ({
  referenceId,
  mobileNumber = "",
  onBack,
}) => {
  const router = useRouter();
  const { verifyOtp, loading } = useVerifyOtp();
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timer, setTimer] = useState<number>(30);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);
      inputRefs[3].current?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const fullOtp = otp.join("");
    if (fullOtp.length < 4) {
      setErrorMessage("Please enter the complete 4-digit OTP.");
      return;
    }

    try {
      const response = await verifyOtp({
        otp: fullOtp,
        referenceId,
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
        "Invalid OTP. Please try again.";
      setErrorMessage(msg);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ width: "100%", maxWidth: "500px" }}
    >
      {/* Icon Badge */}
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "16px",
          backgroundColor: "#0135470D",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <MarkEmailReadOutlined sx={{ fontSize: 28, color: COLORS.SECONDARY }} />
      </Box>

      {/* Title */}
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "28px",
          color: COLORS.SECONDARY,
          mb: 1,
        }}
      >
        Verify OTP
      </Typography>

      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontWeight: 500,
          fontSize: "14px",
          color: "#7A9BAB",
          lineHeight: "22px",
          mb: 4,
        }}
      >
        Enter the 4-digit verification code sent to{" "}
        <strong style={{ color: COLORS.SECONDARY }}>
          {mobileNumber || "your registered number"}
        </strong>
      </Typography>

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: "10px" }}>
          {errorMessage}
        </Alert>
      )}

      {/* OTP 4-Digit Inputs */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mb: 4, justifyContent: "center" }}
        onPaste={handlePaste}
      >

        {otp.map((digit, idx) => (
          <Box
            key={idx}
            component="input"
            ref={inputRefs[idx]}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e: any) => handleChange(idx, e.target.value)}
            onKeyDown={(e: any) => handleKeyDown(idx, e)}
            sx={{
              width: "64px",
              height: "64px",
              textAlign: "center",
              fontSize: "24px",
              fontWeight: 700,
              fontFamily: poppins700.style.fontFamily,
              color: COLORS.SECONDARY,
              backgroundColor: "#FFFFFF",
              border: digit
                ? `2px solid ${COLORS.SECONDARY}`
                : "1.5px solid #0135471F",
              borderRadius: "14px",
              outline: "none",
              transition: "all 0.2s ease",
              "&:focus": {
                borderColor: COLORS.SECONDARY,
                boxShadow: "0 0 0 3px rgba(1, 53, 71, 0.08)",
              },
            }}
          />
        ))}
      </Stack>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        disableElevation
        fullWidth
        disabled={loading || otp.join("").length < 4}
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
        {loading ? "Verifying..." : "Verify & Continue"}
        {!loading && <ArrowForward sx={{ fontSize: 18 }} />}
      </Button>

      {/* Resend Code Section */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {timer > 0 ? (
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            Resend OTP in{" "}
            <strong style={{ color: COLORS.SECONDARY }}>
              00:{timer < 10 ? `0${timer}` : timer}
            </strong>
          </Typography>
        ) : (
          <Button
            onClick={() => setTimer(30)}
            sx={{
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "13px",
              color: COLORS.SECONDARY,
              p: 0,
              minWidth: "auto",
              "&:hover": {
                textDecoration: "underline",
                backgroundColor: "transparent",
              },
            }}
          >
            Resend OTP Code
          </Button>
        )}
      </Box>

      {onBack && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button
            onClick={onBack}
            sx={{
              textTransform: "none",
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              color: "#7A9BAB",
              "&:hover": { color: COLORS.SECONDARY },
            }}
          >
            ← Back to Registration
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VerifyOtpForm;
