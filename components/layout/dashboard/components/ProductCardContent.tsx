"use client";

import React from "react";
import { Box, Typography, Chip, Button } from "@mui/material";
import {
  Place,
  ChatBubbleOutlined,
  Visibility,
  CheckCircle,
  InsertDriveFile,
  LocalFireDepartment,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";

export interface ProductCardContentProps {
  id: string;
  title: string;
  location: string;
  totalValue: string;
  monthlyValue: string;
  currency?: string;
  tags?: { label: string; type: "verified" | "docs-ready" | "urgent" }[];
  views: number;
}

export const ProductCardContent: React.FC<ProductCardContentProps> = ({
  id,
  title,
  location,
  totalValue,
  monthlyValue,
  currency = "SAR",
  tags = [],
  views,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        {/* Title */}
        <Link
          href={`/dashboard/contracts/detail/${id}`}
          passHref
          style={{ textDecoration: "none" }}
        >
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 800,
              color: COLORS.SECONDARY,
              fontFamily: poppins700.style.fontFamily,
              lineHeight: 1.25,
              mb: 0.8,
              letterSpacing: "-0.2px",
              "&:hover": {
                color: COLORS.PRIMARY,
              },
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
          >
            {title}
          </Typography>
        </Link>

        {/* Location */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mb: 2 }}>
          <Place sx={{ fontSize: 16, color: "#A0B1B9" }} />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 500,
              color: "#A0B1B9",
              fontFamily: poppins.style.fontFamily,
            }}
          >
            {location}
          </Typography>
        </Box>

        {/* Total Value container */}
        <Box
          sx={{
            backgroundColor: "#F4F7F8",
            borderRadius: "16px",
            p: "14px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: 700,
                color: "#7A9BAB",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                fontFamily: poppins.style.fontFamily,
                mb: 0.2,
              }}
            >
              Total Value
            </Typography>
            <Typography
              sx={{
                fontSize: "22px",
                fontWeight: 800,
                color: COLORS.SECONDARY,
                fontFamily: poppins700.style.fontFamily,
                display: "flex",
                alignItems: "baseline",
                gap: 0.5,
              }}
            >
              {totalValue}
              <Typography
                component="span"
                sx={{ fontSize: "13px", fontWeight: 700, color: "#7A9BAB" }}
              >
                {currency}
              </Typography>
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: 800,
              color: COLORS.SECONDARY,
              fontFamily: poppins700.style.fontFamily,
            }}
          >
            {monthlyValue}
            <Typography
              component="span"
              sx={{ fontSize: "11px", fontWeight: 500, color: "#7A9BAB" }}
            >
              /month
            </Typography>
          </Typography>
        </Box>

        {/* Status badges */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {tags.map((tag, idx) => {
            let bgColor = "#EAF8F1";
            let textColor = "#10753E";
            let icon: React.ReactNode = null;

            if (tag.type === "verified") {
              bgColor = "#EAF8F1";
              textColor = "#10753E";
              icon = (
                <CheckCircle
                  sx={{
                    color: "inherit !important",
                    fontSize: "14px !important",
                  }}
                />
              );
            } else if (tag.type === "docs-ready") {
              bgColor = "#E8F1FE";
              textColor = "#1A73E8";
              icon = (
                <InsertDriveFile
                  sx={{
                    color: "inherit !important",
                    fontSize: "14px !important",
                  }}
                />
              );
            } else if (tag.type === "urgent") {
              bgColor = "#E53935";
              textColor = "#ffffff";
              icon = (
                <LocalFireDepartment
                  sx={{
                    color: "inherit !important",
                    fontSize: "14px !important",
                  }}
                />
              );
            }

            return (
              <Chip
                key={idx}
                label={tag.label}
                icon={icon as React.ReactElement}
                size="small"
                sx={{
                  backgroundColor: bgColor,
                  color: textColor,
                  fontSize: "11px",
                  fontWeight: 700,
                  fontFamily: poppins700.style.fontFamily,
                  height: "26px",
                  borderRadius: "8px",
                  px: 0.5,
                  "& .MuiChip-label": {
                    px: 1.2,
                  },
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pt: 1.5,
          borderTop: "1px solid #EDF1F2",
        }}
      >
        <Button
          variant="outlined"
          startIcon={<ChatBubbleOutlined sx={{ fontSize: 16 }} />}
          sx={{
            borderColor: "#EDF1F2",
            color: COLORS.SECONDARY,
            borderRadius: "100px", // Pill shape matching design
            textTransform: "none",
            fontSize: "13px",
            fontWeight: 700,
            fontFamily: poppins700.style.fontFamily,
            px: 3,
            py: 1,
            "&:hover": {
              borderColor: COLORS.SECONDARY,
              backgroundColor: "rgba(1, 53, 71, 0.02)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Contact Seller
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            color: "#A0B1B9",
          }}
        >
          <Visibility sx={{ fontSize: 18 }} />
          <Typography
            sx={{
              fontSize: "13px",
              fontWeight: 700,
              fontFamily: poppins700.style.fontFamily,
              color: "#A0B1B9",
            }}
          >
            {views}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
