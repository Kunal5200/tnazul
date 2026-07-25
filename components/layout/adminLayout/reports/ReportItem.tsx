"use client";

import React from "react";
import {
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Chip,
  Divider,
} from "@mui/material";
import { Description, Person, Visibility, Cancel } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

export interface ReportData {
  id: string;
  type: "listing" | "user";
  typeLabel: string;
  title: string;
  isUrgent: boolean;
  reason: string;
  reporterInfo: string;
  actionLabel: string;
}

interface ReportItemProps {
  item: ReportData;
  onAction: (id: string) => void;
  onReview: (id: string) => void;
  onDismiss: (id: string) => void;
}

const ReportItem = ({
  item,
  onAction,
  onReview,
  onDismiss,
}: ReportItemProps) => {
  // Configs based on type
  const isListing = item.type === "listing";
  const iconBg = item.isUrgent
    ? "rgba(211, 47, 47, 0.1)"
    : "rgba(231, 186, 73, 0.1)";
  const iconColor = item.isUrgent ? "#D32F2F" : "#E78B49";

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "24px",
        backgroundColor: COLORS.WHITE,
        border: item.isUrgent
          ? "1px solid rgba(211, 47, 47, 0.3)"
          : "1px solid #0135470F",
        overflow: "hidden",
        mb: 3,
        transition: "box-shadow 0.2s ease, transform 0.2s ease",
        "&:hover": {
          boxShadow: item.isUrgent
            ? "0px 8px 24px rgba(211, 47, 47, 0.06)"
            : "0px 8px 24px rgba(1, 53, 71, 0.04)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Content Area */}
      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={2.5} sx={{ alignItems: "flex-start" }}>
          {/* Circular Icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              backgroundColor: iconBg,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: iconColor,
              flexShrink: 0,
            }}
          >
            {isListing ? (
              <Description sx={{ fontSize: 22 }} />
            ) : (
              <Person sx={{ fontSize: 22 }} />
            )}
          </Box>

          {/* Info Details */}
          <Box sx={{ flexGrow: 1 }}>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "center", mb: 1, flexWrap: "wrap", gap: 1 }}
            >
              {/* Type Chip */}
              <Chip
                label={item.typeLabel}
                size="small"
                sx={{
                  backgroundColor: isListing
                    ? "rgba(46, 125, 50, 0.1)"
                    : "rgba(22, 108, 170, 0.1)",
                  color: isListing ? "#2E7D32" : "#166CA9",
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "11px",
                  borderRadius: "6px",
                  height: "22px",
                }}
              />

              {/* Urgent Chip */}
              {item.isUrgent && (
                <Chip
                  label="Urgent"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(211, 47, 47, 0.1)",
                    color: "#D32F2F",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "11px",
                    borderRadius: "6px",
                    height: "22px",
                  }}
                />
              )}
            </Stack>

            {/* Title */}
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "17px",
                color: COLORS.SECONDARY,
                mb: 1.5,
              }}
            >
              {item.title}
            </Typography>

            {/* Reason */}
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "14px",
                color: "#7A9BAB",
                mb: 1,
              }}
            >
              <Box
                component="span"
                sx={{ fontWeight: 700, color: COLORS.SECONDARY }}
              >
                Reason:{" "}
              </Box>
              {item.reason}
            </Typography>

            {/* Reporter details */}
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
              }}
            >
              Reported by {item.reporterInfo}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "#0135470F" }} />

      {/* Action Buttons Row */}
      <Box sx={{ p: 2.5, px: 3, backgroundColor: "rgba(1, 53, 71, 0.01)" }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" spacing={1.5}>
            {/* Primary Action Button (Remove Listing / Warn User) */}
            <Button
              variant="contained"
              disableElevation
              startIcon={<Cancel sx={{ fontSize: 16 }} />}
              onClick={() => onAction(item.id)}
              sx={{
                backgroundColor: "#D32F2F",
                color: COLORS.WHITE,
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                px: 3,
                py: 1,
                "&:hover": {
                  backgroundColor: "#B71C1C",
                },
              }}
            >
              {item.actionLabel}
            </Button>

            {/* Review Button */}
            <Button
              variant="outlined"
              startIcon={<Visibility sx={{ fontSize: 16 }} />}
              onClick={() => onReview(item.id)}
              sx={{
                borderColor: "#0135471A",
                color: COLORS.SECONDARY,
                borderRadius: "100px",
                textTransform: "none",
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "14px",
                px: 3,
                py: 1,
                backgroundColor: COLORS.WHITE,
                "&:hover": {
                  borderColor: "#0135473D",
                  backgroundColor: "#F4F7F8",
                },
              }}
            >
              Review
            </Button>
          </Stack>

          {/* Dismiss Button */}
          <Button
            variant="outlined"
            onClick={() => onDismiss(item.id)}
            sx={{
              borderColor: "#0135471A",
              color: "#7A9BAB",
              borderRadius: "100px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "13px",
              px: 3,
              py: 0.8,
              backgroundColor: COLORS.WHITE,
              "&:hover": {
                borderColor: "#0135473D",
                color: COLORS.SECONDARY,
                backgroundColor: "#F4F7F8",
              },
            }}
          >
            Dismiss
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
};

export default ReportItem;
