"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowBack, ArrowForward, InfoOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface FinancialFormProps {
  formData: any;
  updateFormData: (fields: any) => void;
  onBack: () => void;
  onNext: () => void;
}

const FinancialForm = ({ formData, updateFormData, onBack, onNext }: FinancialFormProps) => {
  const {
    totalValue,
    monthlyAmount,
    transferFee,
    securityDeposit,
    negotiable,
  } = formData;

  const setTotalValue = (val: string) => updateFormData({ totalValue: val });
  const setMonthlyAmount = (val: string) => updateFormData({ monthlyAmount: val });
  const setTransferFee = (val: string) => updateFormData({ transferFee: val });
  const setSecurityDeposit = (val: string) => updateFormData({ securityDeposit: val });
  const setNegotiable = (val: boolean) => updateFormData({ negotiable: val });

  // Custom Input Label Component
  const FormLabel = ({ label, required = false }: { label: string; required?: boolean }) => (
    <Typography
      sx={{
        fontFamily: poppins700.style.fontFamily,
        fontSize: "11px",
        fontWeight: 700,
        color: COLORS.SECONDARY,
        letterSpacing: "0.5px",
        mb: 1,
        display: "flex",
        alignItems: "center",
      }}
    >
      {label}
      {required && (
        <span style={{ color: COLORS.PRIMARY, marginLeft: "4px", fontSize: "14px" }}>*</span>
      )}
    </Typography>
  );

  // Common Input styling with SAR prefix
  const inputStyleProps = {
    fullWidth: true,
    variant: "outlined" as const,
    type: "number",
    sx: {
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#F9FAFB",
        borderRadius: "14px",
        fontFamily: poppins.style.fontFamily,
        fontSize: "14px",
        "& fieldset": {
          borderColor: "#E4E7EC",
        },
        "&:hover fieldset": {
          borderColor: "#CBD5E1",
        },
        "&.Mui-focused fieldset": {
          borderColor: COLORS.PRIMARY,
          borderWidth: "1px",
        },
      },
      "& .MuiInputBase-input": {
        py: 1.8,
        px: 2,
        color: COLORS.SECONDARY,
        "&::placeholder": {
          color: "#98A2B3",
          opacity: 1,
        },
      },
    },
    InputProps: {
      startAdornment: (
        <InputAdornment position="start" sx={{ mr: 1 }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontSize: "12px",
              fontWeight: 700,
              color: "#5A7A8A",
              mr: 1.5,
              ml: 0.5,
            }}
          >
            SAR
          </Typography>
          <Box sx={{ width: "1px", height: "22px", backgroundColor: "#E4E7EC" }} />
        </InputAdornment>
      ),
    },
  };

  const formatAmount = (val: string) => {
    if (!val) return "0";
    const num = parseFloat(val);
    if (isNaN(num)) return "0";
    return num.toLocaleString();
  };

  const isFormValid = totalValue.trim() !== "" && monthlyAmount.trim() !== "";

  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        borderRadius: "24px",
        boxShadow: "0px 8px 30px rgba(1, 53, 71, 0.04)",
        p: { xs: 3, md: 4 },
        width: "100%",
        border: "1px solid #01354705",
      }}
    >
      {/* Info Alert Banner */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          backgroundColor: "#F8F9FA",
          border: "1px solid #E4E7EC",
          borderRadius: "14px",
          p: 2,
          mb: 4,
        }}
      >
        <InfoOutlined sx={{ color: "#5A7A8A", mr: 1.5, fontSize: 20, mt: 0.2 }} />
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontSize: "12px",
            color: "#5A7A8A",
            lineHeight: 1.5,
          }}
        >
          All amounts are in Saudi Riyals (SAR). Accurate financial details build buyer trust and speed up transfers.
        </Typography>
      </Box>

      <form onSubmit={(e) => e.preventDefault()}>
        <Grid container spacing={3}>
          {/* Total Contract Value */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="TOTAL CONTRACT VALUE" required />
            <TextField
              placeholder="e.g. 150000"
              value={totalValue}
              onChange={(e) => setTotalValue(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>

          {/* Monthly Amount */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="MONTHLY AMOUNT" required />
            <TextField
              placeholder="e.g. 85000"
              value={monthlyAmount}
              onChange={(e) => setMonthlyAmount(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>

          {/* Transfer Fee */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="TRANSFER FEE" />
            <TextField
              placeholder="e.g. 5000"
              value={transferFee}
              onChange={(e) => setTransferFee(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>

          {/* Security Deposit */}
          <Grid size={{ xs: 12, md: 6 }}>
            <FormLabel label="SECURITY DEPOSIT" />
            <TextField
              placeholder="e.g. 10000"
              value={securityDeposit}
              onChange={(e) => setSecurityDeposit(e.target.value)}
              {...inputStyleProps}
            />
          </Grid>

          {/* Price Negotiable Section */}
          <Grid size={{ xs: 12 }}>
            <FormLabel label="PRICE NEGOTIABLE?" />
            <Box
              sx={{
                display: "inline-flex",
                backgroundColor: "#F2F4F7",
                borderRadius: "14px",
                p: 0.5,
                mb: 1,
              }}
            >
              <Button
                onClick={() => setNegotiable(false)}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: !negotiable ? COLORS.SECONDARY : "transparent",
                  color: !negotiable ? COLORS.WHITE : "#475467",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: !negotiable ? COLORS.SECONDARY : "rgba(0, 0, 0, 0.03)",
                    boxShadow: "none",
                  },
                }}
              >
                Fixed Price
              </Button>
              <Button
                onClick={() => setNegotiable(true)}
                sx={{
                  borderRadius: "10px",
                  backgroundColor: negotiable ? COLORS.SECONDARY : "transparent",
                  color: negotiable ? COLORS.WHITE : "#475467",
                  px: 3,
                  py: 1,
                  textTransform: "none",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13px",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: negotiable ? COLORS.SECONDARY : "rgba(0, 0, 0, 0.03)",
                    boxShadow: "none",
                  },
                }}
              >
                Yes, Negotiable
              </Button>
            </Box>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color: "#98A2B3",
              }}
            >
              Negotiable listings receive more inquiries. You remain in full control of the final price.
            </Typography>
          </Grid>

          {/* Financial Preview Box */}
          <Grid size={{ xs: 12 }}>
            <Box
              sx={{
                backgroundColor: "#F8F9FA",
                border: "1px solid #E4E7EC",
                borderRadius: "16px",
                p: { xs: 2.5, md: 3 },
                mt: 1,
              }}
            >
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "10px",
                  fontWeight: 700,
                  color: "#5A7A8A",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Financial Preview
              </Typography>
              <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontSize: "24px",
                      fontWeight: 700,
                      color: COLORS.SECONDARY,
                      mb: 0.5,
                    }}
                  >
                    {formatAmount(totalValue)}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "11px",
                      color: "#7A9BAB",
                    }}
                  >
                    Total Value (SAR)
                  </Typography>
                </Box>
                <Box sx={{ width: "1px", height: "40px", backgroundColor: "#E4E7EC" }} />
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontSize: "24px",
                      fontWeight: 700,
                      color: COLORS.SECONDARY,
                      mb: 0.5,
                    }}
                  >
                    {formatAmount(monthlyAmount)}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "11px",
                      color: "#7A9BAB",
                    }}
                  >
                    Per Month
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        {/* Action Buttons */}
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            mt: 5,
            pt: 2,
            borderTop: "1px solid #F2F4F7",
          }}
        >
          {/* Back Button */}
          <Button
            variant="outlined"
            onClick={onBack}
            startIcon={<ArrowBack />}
            sx={{
              borderRadius: "14px",
              border: "1px solid #E4E7EC",
              color: COLORS.SECONDARY,
              px: 3,
              py: 1.5,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D0D5DD",
              },
            }}
          >
            Back
          </Button>

          {/* Continue Button */}
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            {!isFormValid && (
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  color: "#98A2B3",
                }}
              >
                Fill required fields to continue
              </Typography>
            )}
            <Button
              variant="contained"
              onClick={onNext}
              endIcon={<ArrowForward />}
              disabled={!isFormValid}
              sx={{
                borderRadius: "14px",
                backgroundColor: isFormValid ? COLORS.SECONDARY : "#E4E7EC",
                color: isFormValid ? COLORS.WHITE : "#98A2B3",
                px: 4,
                py: 1.5,
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: isFormValid ? "rgba(1, 53, 71, 0.9)" : "#E4E7EC",
                  boxShadow: "none",
                },
                "&.Mui-disabled": {
                  backgroundColor: "#E4E7EC",
                  color: "#98A2B3",
                },
              }}
            >
              Continue
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default FinancialForm;
