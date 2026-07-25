"use client";

import React from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

export interface AttentionItemProps {
  id: string;
  title: string;
  subtext: string;
  imageUrl: string;
  status: string;
  statusColor?: string;
}

const AttentionItem = ({
  title,
  subtext,
  imageUrl,
  status,
  statusColor = "#E78B49", // Orange/amber for review
}: AttentionItemProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: "20px",
        backgroundColor: COLORS.WHITE,
        border: "1px solid rgba(231, 186, 73, 0.3)", // Subtle orange tint border to match Figma
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 8px 24px rgba(231, 186, 73, 0.08)",
        },
      }}
    >
      <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
        {/* Preview Image */}
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          sx={{
            width: 60,
            height: 60,
            borderRadius: "14px",
            objectFit: "cover",
            backgroundColor: "#F4F7F8",
          }}
        />

        {/* Text Details */}
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "16px",
              color: COLORS.SECONDARY,
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            {subtext}
          </Typography>
        </Box>
      </Stack>

      {/* Status Badge */}
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: statusColor,
          }}
        />
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13px",
            color: statusColor,
          }}
        >
          {status}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default AttentionItem;
