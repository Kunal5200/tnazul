import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  AccessTime,
  DescriptionOutlined,
  PlaceOutlined,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface CardPreviewProps {
  formData: any;
  remainingDurationText: string;
  formatCurrency: (val: string) => string;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  formData,
  remainingDurationText,
  formatCurrency,
}) => {
  return (
    <Box
      sx={{
        borderRadius: "20px",
        border: "1px solid #EAECF0",
        overflow: "hidden",
        boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
        backgroundColor: COLORS.WHITE,
      }}
    >
      {/* Card Image Area */}
      <Box sx={{ position: "relative", width: "100%", paddingTop: "62%" }}>
        <Box
          component="img"
          src={
            formData.asset?.[0]?.content ||
            "/images/villa_preview.png"
          }
          alt="Property Preview"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Category Pill (Top Left) */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            left: 12,
            backgroundColor: "rgba(1, 53, 71, 0.75)",
            color: COLORS.WHITE,
            borderRadius: "20px",
            px: 1.8,
            py: 0.6,
            backdropFilter: "blur(4px)",
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontSize: "10px",
              fontWeight: 700,
            }}
          >
            {formData.contractType || "Real Estate"}
          </Typography>
        </Box>

        {/* Time Remaining Pill (Bottom Right) */}
        <Box
          sx={{
            position: "absolute",
            bottom: 12,
            right: 12,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: COLORS.WHITE,
            borderRadius: "20px",
            px: 1.5,
            py: 0.5,
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            backdropFilter: "blur(4px)",
          }}
        >
          <AccessTime sx={{ fontSize: 12, color: COLORS.WHITE }} />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "10px",
              fontWeight: 500,
            }}
          >
            {remainingDurationText} left
          </Typography>
        </Box>
      </Box>

      {/* Details Content Area */}
      <Box sx={{ p: 2.5 }}>
        <Typography
          noWrap
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontSize: "16px",
            fontWeight: 700,
            color: COLORS.SECONDARY,
            mb: 0.5,
          }}
        >
          {formData.contractTitle || "3BR Villa - Al Nakheel District"}
        </Typography>

        {/* Location */}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 2 }}>
          <PlaceOutlined sx={{ fontSize: 14, color: "#667085" }} />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "12px",
              color: "#667085",
            }}
          >
            {formData.city
              ? `${formData.district ? formData.district + ", " : ""}${formData.city}`
              : "Al Nakheel, Riyadh"}
          </Typography>
        </Stack>

        {/* Gray Value Card Container */}
        <Box
          sx={{
            backgroundColor: "#F9FAFB",
            border: "1px solid #EAECF0",
            borderRadius: "14px",
            p: 2,
            mb: 2,
          }}
        >
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "#667085",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                }}
              >
                Total Value
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "18px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  mt: 0.2,
                }}
              >
                {formatCurrency(formData.totalValue)}{" "}
                <span style={{ fontSize: "12px" }}>SAR</span>
              </Typography>
            </Box>
            <Box sx={{ textAlign: "right" }}>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "14px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                }}
              >
                {formatCurrency(formData.monthlyAmount)}
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 500,
                    color: "#667085",
                    marginLeft: "2px",
                  }}
                >
                  /month
                </span>
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Badges Row */}
        <Stack direction="row" spacing={1}>
          {/* Verified Badge */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: "center",
              backgroundColor: "#ECFDF3",
              borderRadius: "14px",
              px: 1.5,
              py: 0.5,
              border: "1px solid #D1F3DF",
            }}
          >
            <VerifiedUserOutlined sx={{ fontSize: 12, color: "#12B76A" }} />
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "10px",
                fontWeight: 700,
                color: "#12B76A",
              }}
            >
              Verified
            </Typography>
          </Stack>

          {/* Docs Ready Badge */}
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              alignItems: "center",
              backgroundColor: "#EFF8FF",
              borderRadius: "14px",
              px: 1.5,
              py: 0.5,
              border: "1px solid #B9E6FE",
            }}
          >
            <DescriptionOutlined sx={{ fontSize: 12, color: "#1570EF" }} />
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "10px",
                fontWeight: 700,
                color: "#1570EF",
              }}
            >
              Docs Ready
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default CardPreview;
