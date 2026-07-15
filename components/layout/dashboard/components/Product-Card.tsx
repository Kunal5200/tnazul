"use client";

import React, { useState } from "react";
import { Box, Typography, Chip, Button, IconButton, SvgIcon, SvgIconProps } from "@mui/material";
import { 
  Star, 
  Favorite, 
  FavoriteBorder, 
  AccessTime, 
  Place, 
  ChatBubbleOutlined, 
  Visibility,
  CheckCircle,
  InsertDriveFile,
  LocalFireDepartment
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";

// WhatsApp Icon component
const WhatsAppIcon = (props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.37 5.054L2 22l5.077-1.331a9.92 9.92 0 004.93 1.317h.004c5.505 0 9.988-4.478 9.99-9.986A9.97 9.97 0 0012.012 2zm5.82 14.183c-.32.905-1.6 1.634-2.285 1.73-.666.096-1.528.163-2.484-.145-3.754-1.21-6.195-5.01-6.38-5.258-.184-.247-1.5-1.993-1.5-3.805 0-1.812.946-2.704 1.285-3.053.339-.348.74-.436.985-.436.247 0 .495.002.71.011.23.01.536-.089.84.646.31.748 1.058 2.585 1.15 2.771.093.186.155.403.031.65-.124.248-.186.372-.372.588-.186.217-.39.484-.557.65-.186.186-.38.389-.164.76.216.372.96 1.583 2.057 2.558 1.415 1.26 2.607 1.65 2.978 1.835.372.186.588.155.805-.093.217-.248.928-1.082 1.176-1.453.247-.372.495-.31.826-.186.33.124 2.106 1.021 2.467 1.201.36.18.6.268.68.412.083.145.083.826-.237 1.73z"
    />
  </SvgIcon>
);

export interface ProductCardProps {
  id: string;
  category: string;
  categoryLabel: string;
  categoryIcon: React.ReactNode;
  title: string;
  location: string;
  totalValue: string;
  monthlyValue: string;
  currency?: string;
  imageUrl: string;
  timeLeft: string;
  views: number;
  isStarred?: boolean;
  isFavoriteInitial?: boolean;
  tags?: { label: string; type: "verified" | "docs-ready" | "urgent" }[];
  whatsappAvailable?: boolean;
  viewMode?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  categoryLabel,
  categoryIcon,
  title,
  location,
  totalValue,
  monthlyValue,
  currency = "SAR",
  imageUrl,
  timeLeft,
  views,
  isStarred = false,
  isFavoriteInitial = false,
  tags = [],
  whatsappAvailable = false,
  viewMode = "grid",
}) => {
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);

  const renderImageSection = (customWidth?: string | object) => (
    <Box
      sx={{
        position: "relative",
        width: customWidth || "100%",
        height: viewMode === "list" ? { xs: "200px", sm: "240px" } : "240px",
        overflow: "hidden",
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        flexShrink: 0,
      }}
    >
      {/* Top Left Row (Star & Category) */}
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          display: "flex",
          alignItems: "center",
          gap: 1,
          zIndex: 2,
        }}
      >
        {isStarred && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: COLORS.PRIMARY,
              boxShadow: "0px 4px 10px rgba(231, 186, 73, 0.3)",
            }}
          >
            <Star sx={{ color: COLORS.SECONDARY, fontSize: 18 }} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            backgroundColor: "rgba(1, 53, 71, 0.65)",
            backdropFilter: "blur(8px)",
            borderRadius: "100px",
            px: 1.8,
            py: 0.8,
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#ffffff",
          }}
        >
          {React.cloneElement(categoryIcon as React.ReactElement<any>, {
            sx: { fontSize: 14, color: "#ffffff" }
          })}
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: 700,
              fontFamily: poppins700.style.fontFamily,
            }}
          >
            {categoryLabel}
          </Typography>
        </Box>
      </Box>

      {/* Top Right (Favorite) */}
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorite(!isFavorite);
        }}
        sx={{
          position: "absolute",
          top: 16,
          right: 16,
          backgroundColor: "#ffffff",
          color: isFavorite ? "#E53935" : COLORS.SECONDARY,
          width: "36px",
          height: "36px",
          zIndex: 2,
          "&:hover": {
            backgroundColor: "#f5f5f5",
            transform: "scale(1.05)",
          },
          transition: "all 0.2s ease",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {isFavorite ? (
          <Favorite sx={{ fontSize: 18 }} />
        ) : (
          <FavoriteBorder sx={{ fontSize: 18 }} />
        )}
      </IconButton>

      {/* WhatsApp Overlay (Chat with Us) */}
      {whatsappAvailable && (
        <Button
          variant="contained"
          startIcon={<WhatsAppIcon sx={{ fontSize: 16 }} />}
          onClick={(e) => {
            e.stopPropagation();
            window.open("https://wa.me/#", "_blank");
          }}
          sx={{
            position: "absolute",
            top: "50%",
            right: 16,
            transform: "translateY(-50%)",
            backgroundColor: "#25D366",
            color: "#ffffff",
            borderRadius: "100px",
            px: 2,
            py: 0.8,
            fontSize: "12px",
            fontWeight: 700,
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            boxShadow: "0px 8px 20px rgba(37, 211, 102, 0.25)",
            zIndex: 2,
            "&:hover": {
              backgroundColor: "#20ba56",
              transform: "translateY(-50%) scale(1.03)",
            },
            transition: "all 0.2s ease",
          }}
        >
          Chat with Us
        </Button>
      )}

      {/* Bottom Right (Time Left) */}
      <Box
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          display: "flex",
          alignItems: "center",
          gap: 0.8,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          borderRadius: "100px",
          px: 1.5,
          py: 0.6,
          color: "#ffffff",
          zIndex: 2,
        }}
      >
        <AccessTime sx={{ fontSize: 13, color: "rgba(255, 255, 255, 0.8)" }} />
        <Typography
          sx={{
            fontSize: "11px",
            fontWeight: 600,
            fontFamily: poppins.style.fontFamily,
          }}
        >
          {timeLeft}
        </Typography>
      </Box>

      {/* Image Overlay Gradient */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.02) 50%, rgba(0, 0, 0, 0.2) 100%)",
          zIndex: 1,
        }}
      />
    </Box>
  );

  const renderContentSection = () => (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, height: "100%", justifyContent: "space-between" }}>
      <Box>
        {/* Title */}
        <Link href="/dashboard/contracts/detail" passHref style={{ textDecoration: "none" }}>
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
              icon = <CheckCircle sx={{ color: "inherit !important", fontSize: "14px !important" }} />;
            } else if (tag.type === "docs-ready") {
              bgColor = "#E8F1FE";
              textColor = "#1A73E8";
              icon = <InsertDriveFile sx={{ color: "inherit !important", fontSize: "14px !important" }} />;
            } else if (tag.type === "urgent") {
              bgColor = "#E53935";
              textColor = "#ffffff";
              icon = <LocalFireDepartment sx={{ color: "inherit !important", fontSize: "14px !important" }} />;
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

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, color: "#A0B1B9" }}>
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

  if (viewMode === "list") {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "28px",
          border: "1px solid #EDF1F2",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
          transform: "translateZ(0)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.06)",
            borderColor: "rgba(1, 53, 71, 0.08)",
          },
        }}
      >
        {renderImageSection({ xs: "100%", sm: "240px", md: "280px" })}
        <Box sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}>
          {renderContentSection()}
        </Box>
      </Box>
    );
  }

  // Default Grid layout
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "28px",
        border: "1px solid #EDF1F2",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        transform: "translateZ(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.06)",
          borderColor: "rgba(1, 53, 71, 0.08)",
        },
      }}
    >
      {renderImageSection()}
      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {renderContentSection()}
      </Box>
    </Box>
  );
};

export default ProductCard;
