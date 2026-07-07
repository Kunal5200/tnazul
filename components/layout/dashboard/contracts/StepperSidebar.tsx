"use client";

import {
  CalendarTodayOutlined,
  DescriptionOutlined,
  AttachFileOutlined,
  PaidOutlined,
  VisibilityOutlined,
  Check,
} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface StepItem {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: "Basic Information",
    subtitle: "Type, title, location",
    icon: DescriptionOutlined,
  },
  {
    id: 2,
    title: "Financial Details",
    subtitle: "Value, monthly, fees",
    icon: PaidOutlined,
  },
  {
    id: 3,
    title: "Conditions & Dates",
    subtitle: "Duration, transfer terms",
    icon: CalendarTodayOutlined,
  },
  {
    id: 4,
    title: "Attachments",
    subtitle: "Files & photos",
    icon: AttachFileOutlined,
  },
  {
    id: 5,
    title: "Review & Publish",
    subtitle: "Preview and go live",
    icon: VisibilityOutlined,
  },
];

interface StepperSidebarProps {
  currentStep?: number;
}

const StepperSidebar = ({ currentStep = 1 }: StepperSidebarProps) => {
  return (
    <Box sx={{ width: "100%", p: 1 }}>
      {/* Title */}
      <Typography
        sx={{
          fontFamily: poppins.style.fontFamily,
          fontSize: "12px",
          fontWeight: 700,
          color: COLORS.SIDEBAR_TEXT_COLOR,
          letterSpacing: "1.2px",
          textTransform: "uppercase",
          mb: 3,
          px: 1,
        }}
      >
        Form Progress
      </Typography>

      {/* Steps List */}
      <Stack spacing={2}>
        {STEPS.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const IconComponent = step.icon;

          // Determine colors and backgrounds based on step state
          let containerBg = "transparent";
          if (isActive) {
            containerBg = COLORS.SECONDARY;
          } else if (isCompleted) {
            containerBg = "#EDF9F1"; // Light green tint
          }

          let iconBg = "#EEF6FA";
          let iconColor: string = COLORS.SIDEBAR_ICON_COLOR;
          if (isActive) {
            iconBg = "rgba(231, 186, 73, 0.15)";
            iconColor = COLORS.PRIMARY;
          } else if (isCompleted) {
            iconBg = "#D1F3DF"; // Green circle background
            iconColor = "#12B76A"; // Green check icon color
          }

          let titleColor: string = COLORS.SECONDARY;
          if (isActive) {
            titleColor = COLORS.WHITE;
          } else if (isCompleted) {
            titleColor = "#10753E"; // Completed title green
          }

          let subtitleColor: string = COLORS.SIDEBAR_TEXT_COLOR;
          if (isActive) {
            subtitleColor = "rgba(255, 255, 255, 0.6)";
          } else if (isCompleted) {
            subtitleColor = "#12B76A"; // Completed subtitle green
          }

          return (
            <Stack
              key={step.id}
              direction="row"
              sx={{
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                borderRadius: "16px",
                backgroundColor: containerBg,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isActive
                    ? COLORS.SECONDARY
                    : isCompleted
                    ? "#E1F5E8"
                    : "rgba(1, 53, 71, 0.03)",
                },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                {/* Circle Icon Container */}
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: iconBg,
                    color: iconColor,
                    transition: "all 0.3s ease",
                  }}
                >
                  {isCompleted ? (
                    <Check sx={{ fontSize: 20 }} />
                  ) : (
                    <IconComponent sx={{ fontSize: 20 }} />
                  )}
                </Box>

                {/* Step Description */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontSize: "14px",
                      fontWeight: isActive || isCompleted ? 700 : 500,
                      color: titleColor,
                      mb: 0.2,
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "11px",
                      fontWeight: 500,
                      color: subtitleColor,
                    }}
                  >
                    {step.subtitle}
                  </Typography>
                </Box>
              </Stack>

              {/* Yellow Dot for Active Step */}
              {isActive && (
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: COLORS.PRIMARY,
                    mr: 1,
                  }}
                />
              )}
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};

export default StepperSidebar;
