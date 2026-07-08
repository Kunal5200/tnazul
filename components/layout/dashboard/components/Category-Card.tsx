"use client";

import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import { COLORS } from "@/utils/enum";

export interface CategoryCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  count,
  icon,
  isActive = false,
  onClick,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: isActive ? COLORS.SECONDARY : "#ffffff",
        border: isActive ? "none" : "1px solid #EDF1F2",
        borderRadius: "20px",
        height: "88px",
        px: 2.5,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow: isActive 
          ? "0px 8px 24px rgba(1, 53, 71, 0.15)"
          : "none",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.04)",
          borderColor: isActive ? "none" : COLORS.PRIMARY,
        },
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {/* Icon wrapper */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "48px",
            height: "48px",
            borderRadius: "14px",
            backgroundColor: isActive ? "rgba(255, 255, 255, 0.1)" : "#0135470F",
            color: isActive ? COLORS.PRIMARY : COLORS.SECONDARY,
          }}
        >
          {React.cloneElement(icon as React.ReactElement<any>, {
            sx: { fontSize: 24 }
          })}
        </Box>

        {/* Text */}
        <Box>
          <Typography
            sx={{
              fontSize: "16px",
              fontWeight: 700,
              color: isActive ? "#ffffff" : COLORS.SECONDARY,
              lineHeight: 1.2,
              mb: 0.5,
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: isActive ? "rgba(255, 255, 255, 0.6)" : COLORS.SIDEBAR_TEXT_COLOR,
            }}
          >
            {count}
          </Typography>
        </Box>
      </Box>

      {/* Active tag */}
      {isActive && (
        <Chip
          label="Active"
          sx={{
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.SECONDARY,
            fontSize: "12px",
            fontWeight: 700,
            height: "24px",
            borderRadius: "8px",
            "& .MuiChip-label": {
              px: 1.5,
            },
          }}
        />
      )}
    </Box>
  );
};

export default CategoryCard;
