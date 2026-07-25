"use client";

import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

export interface MetricCardProps {
  value: string;
  label: string;
  subLabel: string;
  subLabelColor?: string;
  icon: React.ReactNode;
  iconBgColor: string;
  iconColor: string;
}

const MetricCard = ({
  value,
  label,
  subLabel,
  subLabelColor = "#7A9BAB",
  icon,
  iconBgColor,
  iconColor,
}: MetricCardProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "24px",
        backgroundColor: COLORS.WHITE,
        border: "1px solid #0135470F",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.04)",
        },
      }}
    >
      {/* Icon Row */}
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          backgroundColor: iconBgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: iconColor,
        }}
      >
        {icon}
      </Box>

      {/* Content */}
      <Box>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "32px",
            color: COLORS.SECONDARY,
            lineHeight: "38px",
            mb: 0.5,
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            color: COLORS.SECONDARY,
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "12px",
            color: subLabelColor,
          }}
        >
          {subLabel}
        </Typography>
      </Box>
    </Paper>
  );
};

export default MetricCard;
