"use client";

import React from "react";
import { Box, Paper, Stack, Typography, Divider } from "@mui/material";
import { ShieldOutlined } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface OrderSummaryProps {
  currentStep: number;
  plan: "standard" | "featured";
}

const OrderSummary = ({ currentStep, plan }: OrderSummaryProps) => {
  // Pricing logic based on plan and currentStep
  const isFeatured = plan === "featured";
  const isStep1 = currentStep === 1;

  const planLabel = isFeatured
    ? "Featured Plan Boost (180 days)"
    : "Standard Listing Plan (Free)";

  const planPrice = isFeatured ? "99.00" : isStep1 ? "1000.00" : "0.00";

  const vatAmount = isFeatured ? "14.85" : isStep1 ? "150.00" : "0.00";

  const totalDue = isFeatured ? "113.85" : isStep1 ? "1150.00" : "0.00";

  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      {/* Listing & Order Summary Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3.5,
          borderRadius: "24px",
          backgroundColor: COLORS.WHITE,
          border: "1px solid #0135470F",
        }}
      >
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "14px",
            color: COLORS.SECONDARY,
            mb: 2.5,
            letterSpacing: "0.5px",
          }}
        >
          LISTING & ORDER SUMMARY
        </Typography>

        {/* Product Box */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            p: 2,
            backgroundColor: "#F4F7F8",
            borderRadius: "16px",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* Villa Thumbnail */}
          <Box
            component="img"
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=300&auto=format&fit=crop"
            alt="Villa"
            sx={{
              width: 56,
              height: 56,
              borderRadius: "12px",
              objectFit: "cover",
            }}
          />
          <Box>
            {/* Tag */}
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "9px",
                color: "#7A9BAB",
                textTransform: "uppercase",
                mb: 0.5,
              }}
            >
              Residential Lease
            </Typography>
            {/* Title */}
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
                mb: 0.2,
              }}
            >
              Luxury 4BR Villa — Al Malaz Comp...
            </Typography>
            {/* Subtext */}
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
              }}
            >
              Al-Malaz, Riyadh
            </Typography>
          </Box>
        </Stack>

        {/* Price Breakdown */}
        <Stack spacing={2} sx={{ mb: 2.5 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              {planLabel}
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {planPrice} SAR
            </Typography>
          </Stack>

          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "14px",
                color: "#7A9BAB",
              }}
            >
              VAT (15%)
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                color: COLORS.SECONDARY,
              }}
            >
              {vatAmount} SAR
            </Typography>
          </Stack>
        </Stack>

        <Divider sx={{ borderColor: "#0135470F", mb: 2.5 }} />

        {/* Total Due */}
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "15px",
              color: COLORS.SECONDARY,
            }}
          >
            Total Due
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "18px",
              color: COLORS.PRIMARY,
            }}
          >
            {totalDue} SAR
          </Typography>
        </Stack>
      </Paper>

      {/* Verified Cryptographic Privacy Card */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: "24px",
          border: `1px solid rgba(231, 186, 73, 0.4)`,
          backgroundColor: "rgba(231, 186, 73, 0.03)",
          display: "flex",
          alignItems: "flex-start",
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: "rgba(231, 186, 73, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.PRIMARY,
            flexShrink: 0,
          }}
        >
          <ShieldOutlined sx={{ fontSize: 22 }} />
        </Box>
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "13px",
              color: COLORS.PRIMARY,
              mb: 0.5,
              letterSpacing: "0.5px",
            }}
          >
            VERIFIED CRYPTOGRAPHIC PRIVACY
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "12px",
              color: "#7A9BAB",
              lineHeight: "16px",
            }}
          >
            SAMA regulated payments and Nafath Unified National ID validation
            secure both buyers and sellers throughout the lease transfer
            lifecycle.
          </Typography>
        </Box>
      </Paper>
    </Stack>
  );
};

export default OrderSummary;
