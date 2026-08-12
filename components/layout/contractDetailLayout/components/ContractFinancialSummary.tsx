"use client";

import React from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import { CalendarMonthOutlined, TimerOutlined, PaymentsOutlined, SecurityOutlined } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export interface ContractFinancialSummaryProps {
  totalContractValue?: number;
  monthlyAmount?: number;
  remainingDuration?: string;
  transferFee?: number;
  securityDeposit?: number;
}

export const ContractFinancialSummary: React.FC<ContractFinancialSummaryProps> = ({
  totalContractValue,
  monthlyAmount,
  remainingDuration,
  transferFee = 2500,
  securityDeposit = 17000,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F4F7F8",
        borderRadius: "24px",
        p: 3.5,
        border: "1px solid #0135470D",
      }}
    >
      {/* Header Title inside card */}
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
            }}
          >
            Financial Summary
          </Typography>
        </Stack>
        {/* Negotiable status badge */}
        <Box
          sx={{
            borderRadius: "6px",
            py: 0.5,
            px: 1.25,
            backgroundColor: "#E8F5E9",
            color: "#10753E",
          }}
        >
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
            Negotiable
          </Typography>
        </Box>
      </Stack>

      {/* Total remaining value display */}
      <Box sx={{ mb: 3.5 }}>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "11px",
            color: "#7A9BAB",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            mb: 0.5,
          }}
        >
          Total Remaining Value
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "36px",
            color: COLORS.SECONDARY,
            lineHeight: 1,
          }}
        >
          {totalContractValue?.toLocaleString() || "0"}{" "}
          <Box component="span" sx={{ fontSize: "20px", fontWeight: 700, color: "#7A9BAB", ml: 0.5 }}>
            SAR
          </Box>
        </Typography>
      </Box>

      {/* 2x2 Grid of Financial parameters */}
      <Grid container spacing={2.5}>
        {/* Card 1: Monthly amount */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(231, 186, 73, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
              <CalendarMonthOutlined sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                Monthly Amount
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                {monthlyAmount?.toLocaleString() || "0"} SAR
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Card 2: Remaining payments */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(22, 108, 169, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
              <TimerOutlined sx={{ color: "#166CA9", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                Remaining Payments
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                {remainingDuration || "N/A"}
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Card 3: Transfer fee */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(16, 117, 62, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
              <PaymentsOutlined sx={{ color: "#10753E", fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                Transfer Fee
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                {transferFee.toLocaleString()} SAR
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Card 4: Security deposit */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(1, 53, 71, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
              <SecurityOutlined sx={{ color: COLORS.SECONDARY, fontSize: 20 }} />
            </Box>
            <Box>
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                Security Deposit
              </Typography>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                {securityDeposit.toLocaleString()} SAR
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
