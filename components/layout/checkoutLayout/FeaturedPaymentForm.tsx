"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, 
  Paper, 
  Stack, 
  Typography, 
  Grid, 
  TextField, 
  Button, 
  InputAdornment,
} from "@mui/material";
import { 
  CreditCard, 
  Lock, 
  PhoneIphone 
} from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

// Import modular sub-components
import CardGraphic from "./components/CardGraphic";
import ApplePayModal from "./components/ApplePayModal";
import StcPayOtpModal from "./components/StcPayOtpModal";

interface FeaturedPaymentFormProps {
  onBack: () => void;
  onSubmit: (cardholder: string, method: string) => void;
  amount: string;
}

const FeaturedPaymentForm = ({ onBack, onSubmit, amount }: FeaturedPaymentFormProps) => {
  const [activeMethod, setActiveMethod] = useState<"card" | "mada" | "apple" | "stc">("card");
  
  // Card Form State
  const [cardholder, setCardholder] = useState("Ahmed Mohamed");
  const [cardNumber, setCardNumber] = useState("4123 5678 9012 3456");
  const [expiry, setExpiry] = useState("09/28");
  const [cvv, setCvv] = useState("123");

  // STC Pay State
  const [stcMobile, setStcMobile] = useState("0501234567");
  const [showStcOtpModal, setShowStcOtpModal] = useState(false);

  const [showApplePayModal, setShowApplePayModal] = useState(false);

  // Sync inputs based on method selection
  const handleMethodChange = (method: "card" | "mada" | "apple" | "stc") => {
    setActiveMethod(method);
    if (method === "mada") {
      setCardholder("Sara Al-Harbi");
      setCardNumber("9123 4567 8901 2345");
      setExpiry("12/29");
      setCvv("999");
    } else if (method === "card") {
      setCardholder("Ahmed Mohamed");
      setCardNumber("4123 5678 9012 3456");
      setExpiry("09/28");
      setCvv("123");
    }
  };

  // Simulate Apple Pay Face ID Verification sheet
  useEffect(() => {
    if (activeMethod === "apple") {
      setShowApplePayModal(true);
      const timer = setTimeout(() => {
        setShowApplePayModal(false);
        onSubmit("Ahmed Mohamed", "APPLE PAY");
      }, 3500); // 3.5s scan feedback simulation
      return () => clearTimeout(timer);
    } else {
      setShowApplePayModal(false);
    }
  }, [activeMethod]);

  const handleCancelApplePay = () => {
    setShowApplePayModal(false);
    handleMethodChange("card");
  };

  const handleSubmit = () => {
    if (cardholder.trim() && cardNumber.trim() && expiry.trim() && cvv.trim()) {
      onSubmit(
        activeMethod === "mada" ? "Sara Al-Harbi" : cardholder,
        activeMethod === "mada" ? "MADA" : "CREDIT CARD"
      );
    }
  };

  const handleVerifyStcPay = () => {
    setShowStcOtpModal(false);
    onSubmit("Ahmed Mohamed", "STC PAY");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4.5,
        borderRadius: "24px",
        backgroundColor: COLORS.WHITE,
        border: "1px solid #0135470F",
        width: "100%",
        boxSizing: "border-box"
      }}
    >
      {/* Title */}
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 800,
          fontSize: "18px",
          color: COLORS.SECONDARY,
          mb: 3
        }}
      >
        SELECT SECURE PAYMENT METHOD
      </Typography>

      {/* Payment Tabs Row */}
      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        {/* Credit Card Tab */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <Box
            onClick={() => handleMethodChange("card")}
            sx={{
              p: 2,
              borderRadius: "12px",
              border: activeMethod === "card" ? "2px solid #013547" : "1px solid #0135471A",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: activeMethod === "card" ? "rgba(1, 53, 71, 0.02)" : "transparent",
              transition: "all 0.2s ease"
            }}
          >
            <CreditCard sx={{ color: activeMethod === "card" ? COLORS.SECONDARY : "#7A9BAB", mb: 0.5 }} />
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "11px", fontWeight: 700, color: COLORS.SECONDARY }}>
              CREDIT CARD
            </Typography>
          </Box>
        </Grid>

        {/* Mada Tab */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <Box
            onClick={() => handleMethodChange("mada")}
            sx={{
              p: 2,
              borderRadius: "12px",
              border: activeMethod === "mada" ? "2px solid #013547" : "1px solid #0135471A",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: activeMethod === "mada" ? "rgba(1, 53, 71, 0.02)" : "transparent",
              transition: "all 0.2s ease"
            }}
          >
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "18px", fontWeight: 800, color: activeMethod === "mada" ? "#166CA9" : "#7A9BAB", mb: 0.2 }}>
              mada
            </Typography>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "11px", fontWeight: 700, color: COLORS.SECONDARY }}>
              MADA
            </Typography>
          </Box>
        </Grid>

        {/* Apple Pay Tab */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <Box
            onClick={() => handleMethodChange("apple")}
            sx={{
              p: 2,
              borderRadius: "12px",
              border: activeMethod === "apple" ? "2px solid #013547" : "1px solid #0135471A",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: activeMethod === "apple" ? "rgba(1, 53, 71, 0.02)" : "transparent",
              transition: "all 0.2s ease"
            }}
          >
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", fontWeight: 800, color: COLORS.SECONDARY, mb: 0.5 }}>
               Pay
            </Typography>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "11px", fontWeight: 700, color: COLORS.SECONDARY }}>
              APPLE PAY
            </Typography>
          </Box>
        </Grid>

        {/* STC Pay Tab */}
        <Grid size={{ xs: 6, sm: 3 }}>
          <Box
            onClick={() => handleMethodChange("stc")}
            sx={{
              p: 2,
              borderRadius: "12px",
              border: activeMethod === "stc" ? "2px solid #013547" : "1px solid #0135471A",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: activeMethod === "stc" ? "rgba(1, 53, 71, 0.02)" : "transparent",
              transition: "all 0.2s ease"
            }}
          >
            <PhoneIphone sx={{ color: activeMethod === "stc" ? COLORS.SECONDARY : "#7A9BAB", mb: 0.5 }} />
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "11px", fontWeight: 700, color: COLORS.SECONDARY }}>
              STC PAY
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Credit Card / Mada Form Content */}
      {activeMethod !== "stc" && (
        <Grid container spacing={4} sx={{ mb: 3 }}>
          {/* Left Side: Custom Card Graphic */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <CardGraphic
              activeMethod={activeMethod}
              cardNumber={cardNumber}
              cardholder={cardholder}
              expiry={expiry}
            />
          </Grid>

          {/* Right Side: Form Inputs */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            <Stack spacing={2}>
              {/* Holder Name */}
              <Box>
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "10px", fontWeight: 700, color: "#7A9BAB", mb: 0.5 }}>
                  CARDHOLDER NAME
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={cardholder}
                  onChange={(e) => setCardholder(e.target.value)}
                  slotProps={{
                    input: {
                      sx: {
                        borderRadius: "10px",
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "14px"
                      }
                    }
                  }}
                />
              </Box>

              {/* Card Number Input */}
              <Box>
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "10px", fontWeight: 700, color: "#7A9BAB", mb: 0.5 }}>
                  CARD NUMBER
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <CreditCard sx={{ color: "#7A9BAB" }} />
                        </InputAdornment>
                      ),
                      sx: {
                        borderRadius: "10px",
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "14px"
                      }
                    }
                  }}
                />
              </Box>

              {/* Expiry and CVV */}
              <Grid container spacing={2}>
                <Grid size={{ xs: 6 }}>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "10px", fontWeight: 700, color: "#7A9BAB", mb: 0.5 }}>
                    EXPIRY DATE
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: "10px",
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "14px"
                        }
                      }
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "10px", fontWeight: 700, color: "#7A9BAB", mb: 0.5 }}>
                    SECURITY CODE (CVV)
                  </Typography>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    slotProps={{
                      input: {
                        sx: {
                          borderRadius: "10px",
                          fontFamily: poppins.style.fontFamily,
                          fontSize: "14px"
                        }
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      )}

      {/* STC Pay Form Content */}
      {activeMethod === "stc" && (
        <Stack spacing={4} sx={{ mb: 4, alignItems: "center", maxWidth: "480px", margin: "40px auto 40px auto" }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", textAlign: "center" }}>
            Provide your registered STC Pay mobile number to initiate the transaction request.
          </Typography>
          
          <Box sx={{ width: "100%" }}>
            <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "10px", fontWeight: 700, color: "#7A9BAB", mb: 0.5 }}>
              STC PAY MOBILE NUMBER
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={stcMobile}
              onChange={(e) => setStcMobile(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Typography sx={{ color: "#7A9BAB", fontFamily: poppins700.style.fontFamily, fontSize: "14px", fontWeight: 700 }}>
                        +966
                      </Typography>
                    </InputAdornment>
                  ),
                  sx: {
                    borderRadius: "12px",
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "15px",
                    fontWeight: 600,
                    color: COLORS.SECONDARY
                  }
                }
              }}
            />
          </Box>

          <Button
            variant="contained"
            disableElevation
            onClick={() => setShowStcOtpModal(true)}
            startIcon={<PhoneIphone sx={{ color: COLORS.SECONDARY }} />}
            sx={{
              width: "100%",
              backgroundColor: "#E7BA49", // Gold background
              color: COLORS.SECONDARY,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              py: 1.8,
              "&:hover": {
                backgroundColor: "#d5aa3c",
              }
            }}
          >
            Send Verification OTP
          </Button>
        </Stack>
      )}

      {/* Back & Pay Button Row (Hidden for STC Pay) */}
      {activeMethod !== "stc" && (
        <Stack direction="row" spacing={2} sx={{ pt: 2, alignItems: "center" }}>
          <Button
            variant="outlined"
            onClick={onBack}
            sx={{
              borderRadius: "12px",
              borderColor: "#0135471A",
              color: COLORS.SECONDARY,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              px: 3,
              py: 1.5,
              backgroundColor: COLORS.WHITE,
              "&:hover": {
                borderColor: "#0135473D",
                backgroundColor: "#F4F7F8",
              },
            }}
          >
            Back
          </Button>

          <Button
            variant="contained"
            disableElevation
            onClick={handleSubmit}
            startIcon={<Lock sx={{ fontSize: 16 }} />}
            sx={{
              flexGrow: 1,
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              borderRadius: "12px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              py: 1.5,
              "&:hover": {
                backgroundColor: "#002432",
              }
            }}
          >
            Pay {amount} SAR
          </Button>
        </Stack>
      )}

      {/* Modular Apple Pay Sheet */}
      <ApplePayModal
        open={showApplePayModal}
        onClose={handleCancelApplePay}
      />

      {/* Modular STC Pay OTP Sheet */}
      <StcPayOtpModal
        open={showStcOtpModal}
        onClose={() => setShowStcOtpModal(false)}
        onSubmit={handleVerifyStcPay}
        stcMobile={stcMobile}
      />
    </Paper>
  );
};

export default FeaturedPaymentForm;
