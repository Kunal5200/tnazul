"use client";

import React from "react";
import { Box, Container, IconButton, Stack, Typography } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/logo/logo.png";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface ContractHeaderProps {
  currentStep?: number;
  totalSteps?: number;
}

const STEP_TITLES = [
  "Basic Information",
  "Financial Details",
  "Conditions & Dates",
  "Attachments",
  "Review & Publish",
];

const ContractHeader = ({ currentStep = 1, totalSteps = 5 }: ContractHeaderProps) => {
  const router = useRouter();
  const stepTitle = STEP_TITLES[currentStep - 1] || "Basic Information";

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: COLORS.WHITE,
        borderBottom: "1px solid #01354717",
        py: 2,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 4 },
        }}
      >
        {/* Left Side: Back Button & Logo */}
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <IconButton
            onClick={() => router.back()}
            aria-label="go back"
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "1px solid #E4E7EC",
              backgroundColor: COLORS.WHITE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.SECONDARY,
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#CBD5E1",
                transform: "translateX(-2px)",
              },
            }}
          >
            <ArrowBack sx={{ fontSize: 18 }} />
          </IconButton>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Image
              src={logo}
              alt="Tnazul Logo"
              height={36}
              style={{ width: "auto", height: "36px" }}
            />
          </Box>
        </Stack>

        {/* Center Side: Step Indicator */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "10px",
              fontWeight: 700,
              color: COLORS.SIDEBAR_TEXT_COLOR,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              mb: 0.5,
            }}
          >
            Step {currentStep} of {totalSteps}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontSize: "15px",
              fontWeight: 700,
              color: COLORS.SECONDARY,
            }}
          >
            {stepTitle}
          </Typography>
        </Box>

        {/* Right Side: Dot Progress Indicator */}
        <Stack direction="row" spacing={0.8} sx={{ alignItems: "center" }}>
          {Array.from({ length: totalSteps }).map((_, index) => {
            const stepNum = index + 1;
            const isDotActive = stepNum === currentStep;
            const isDotCompleted = stepNum < currentStep;
            return (
              <Box
                key={index}
                sx={{
                  width: isDotActive ? 24 : 6,
                  height: 6,
                  borderRadius: "3px",
                  backgroundColor: isDotActive 
                    ? COLORS.SECONDARY 
                    : isDotCompleted 
                    ? COLORS.PRIMARY 
                    : "#E4E7EC",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            );
          })}
        </Stack>
      </Container>
    </Box>
  );
};

export default ContractHeader;
