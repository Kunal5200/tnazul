import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  DescriptionOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
  AccessTimeOutlined,
  CheckCircleOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { ContractItem } from "../types";

// Stepper item component
const StepperPill = ({ label, icon, activeColor, isActive }: { label: string; icon: React.ReactNode; activeColor?: string; isActive: boolean }) => {
  return (
    <Box
      sx={{
        borderRadius: "100px",
        py: 0.75,
        px: 2,
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        backgroundColor: isActive ? activeColor || COLORS.SECONDARY : "#FFFFFF",
        border: isActive ? `1.38px solid ${activeColor || COLORS.SECONDARY}` : "1.38px solid #01354717",
        color: isActive ? "#FFFFFF" : "#7A9BAB",
        boxSizing: "border-box",
        minHeight: "32px",
      }}
    >
      {icon}
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "12px",
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

interface ContractCardProps {
  contract: ContractItem;
}

export const ContractCard = ({ contract }: ContractCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        p: 3,
        border: "1px solid #0135470D",
        boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 3.5,
      }}
    >
      {/* Image Box */}
      <Box
        sx={{
          width: 140,
          height: 96,
          borderRadius: "16px",
          overflow: "hidden",
          position: "relative",
          flexShrink: 0,
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Image
          src={contract.image}
          alt={contract.title}
          fill
          sizes="140px"
          style={{ objectFit: "cover" }}
        />
      </Box>

      {/* Content Box */}
      <Box sx={{ flexGrow: 1, width: "100%" }}>
        {/* Title & Status Row */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1 }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "17px",
              color: COLORS.SECONDARY,
            }}
          >
            {contract.title}
          </Typography>
          
          {/* Status Badging */}
          <Box
            sx={{
              borderRadius: "6px",
              px: 1.25,
              py: 0.4,
              fontSize: "10.5px",
              fontWeight: 700,
              fontFamily: poppins700.style.fontFamily,
              textTransform: "capitalize",
              backgroundColor:
                contract.status === "active"
                  ? "#E8F5E9"
                  : contract.status === "draft"
                  ? "#F4F7F8"
                  : "#FFEBEE",
              color:
                contract.status === "active"
                  ? "#10753E"
                  : contract.status === "draft"
                  ? "#5A7A8A"
                  : "#FF5C5C",
            }}
          >
            {contract.status}
          </Box>
        </Stack>

        {/* Specs Details Row */}
        <Stack
          direction="row"
          spacing={2.5}
          useFlexGap
          sx={{
            alignItems: "center",
            flexWrap: "wrap",
            color: "#7A9BAB",
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13px",
            mb: contract.status === "active" ? 2.5 : 0,
          }}
        >
          <Typography sx={{ color: "#7A9BAB", fontSize: "13px" }}>
            {contract.location}
          </Typography>
          <Typography sx={{ color: COLORS.SECONDARY, fontWeight: 700, fontSize: "13px" }}>
            {contract.price}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <VisibilityOutlined sx={{ fontSize: 15 }} />
            <Typography sx={{ fontSize: "13px" }}>{contract.views}</Typography>
          </Stack>
          {contract.timeLeft && (
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
              <AccessTimeOutlined sx={{ fontSize: 15 }} />
              <Typography sx={{ fontSize: "13px" }}>{contract.timeLeft}</Typography>
            </Stack>
          )}
        </Stack>

        {/* Progress Stepper (Only active contracts) */}
        {contract.status === "active" && contract.steps && (
          <Stack spacing={1.5} sx={{ mt: 2 }}>
            {/* Stepper Steps Flexbox list */}
            <Stack
              direction="row"
              useFlexGap
              sx={{
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {contract.steps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <StepperPill
                    label={step.label}
                    icon={step.icon(step.isActive)}
                    activeColor={step.color}
                    isActive={step.isActive}
                  />
                  {idx < (contract.steps?.length || 0) - 1 && (
                    <Box
                      sx={{
                        height: "1.5px",
                        width: { xs: "12px", sm: "30px" },
                        backgroundColor: "#01354717",
                      }}
                    />
                  )}
                </React.Fragment>
              ))}
            </Stack>

            {/* Dynamic Instructions Subtext */}
            {contract.subtext && (
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 600,
                  fontSize: "12px",
                  color: contract.subtextColor || COLORS.SECONDARY,
                  pl: 0.5,
                }}
              >
                {contract.subtext}
              </Typography>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
};
