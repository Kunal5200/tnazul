import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export interface VerticalStep {
  label: string;
  description: string;
  status: "complete" | "current" | "upcoming";
}

interface TransferStatusTimelineProps {
  steps: VerticalStep[];
}

export const TransferStatusTimeline: React.FC<TransferStatusTimelineProps> = ({ steps }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        p: 3.5,
        border: "1px solid #0135470D",
        boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
      }}
    >
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "10.5px",
          color: "#7A9BAB",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          mb: 3,
        }}
      >
        Transfer Status
      </Typography>
      <Stack spacing={2.5}>
        {steps.map((step, idx) => (
          <Stack key={idx} direction="row" spacing={2}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: 24,
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  backgroundColor:
                    step.status === "complete"
                      ? "#10753E"
                      : step.status === "current"
                        ? "rgba(16, 117, 62, 0.15)"
                        : "transparent",
                  border:
                    step.status === "upcoming"
                      ? "2px solid #EDF1F2"
                      : "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color:
                    step.status === "complete"
                      ? "#FFFFFF"
                      : step.status === "current"
                        ? "#10753E"
                        : "transparent",
                  zIndex: 2,
                }}
              >
                {step.status === "complete" && (
                  <CheckCircle sx={{ fontSize: 14 }} />
                )}
                {step.status === "current" && (
                  <Box
                    sx={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: "#10753E",
                    }}
                  />
                )}
              </Box>
              {idx !== steps.length - 1 && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 24,
                    bottom: -20,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 2,
                    backgroundColor:
                      step.status === "complete"
                        ? "#10753E"
                        : "#EDF1F2",
                    zIndex: 1,
                  }}
                />
              )}
            </Box>
            <Box sx={{ pb: idx !== steps.length - 1 ? 2 : 0 }}>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  color:
                    step.status === "upcoming"
                      ? "#A0B1B9"
                      : COLORS.SECONDARY,
                }}
              >
                {step.label}
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "12px",
                  color:
                    step.status === "upcoming" ? "#C5D1D7" : "#7A9BAB",
                }}
              >
                {step.description}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};
