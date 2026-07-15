import React from "react";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import {
  PlaceOutlined,
  AccessTimeOutlined,
  Close,
  Whatshot,
} from "@mui/icons-material";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import { SavedItem } from "../types";

interface SavedCardProps {
  item: SavedItem;
  onRemove: (id: string) => void;
}

export const SavedCard = ({ item, onRemove }: SavedCardProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        border: "1px solid #0135470D",
        boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.06)",
        },
      }}
    >
      {/* Top Image Section */}
      <Box sx={{ height: 210, width: "100%", position: "relative" }}>
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 600px) 100vw, 350px"
          style={{ objectFit: "cover" }}
        />

        {/* Overlay: Urgent tag */}
        {item.isUrgent && (
          <Box
            sx={{
              position: "absolute",
              top: 14,
              left: 14,
              borderRadius: "100px",
              py: 0.6,
              px: 1.75,
              backgroundColor: "#E53935",
              color: "#FFFFFF",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <Whatshot sx={{ fontSize: 13, color: "#FFFFFF" }} />
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "10.5px",
                lineHeight: 1,
                textTransform: "uppercase",
              }}
            >
              Urgent
            </Typography>
          </Box>
        )}

        {/* Overlay: Remove Button */}
        <IconButton
          onClick={() => onRemove(item.id)}
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            width: 32,
            height: 32,
            backgroundColor: "rgba(229, 57, 53, 0.9)",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#D32F2F",
            },
          }}
        >
          <Close sx={{ fontSize: 16 }} />
        </IconButton>

        {/* Overlay: Time Duration badge */}
        <Box
          sx={{
            position: "absolute",
            bottom: 14,
            right: 14,
            borderRadius: "100px",
            py: 0.6,
            px: 1.5,
            backgroundColor: "rgba(1, 53, 71, 0.65)",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            backdropFilter: "blur(4px)",
          }}
        >
          <AccessTimeOutlined sx={{ fontSize: 13, color: "#FFFFFF" }} />
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "11px",
              lineHeight: 1,
            }}
          >
            {item.duration}
          </Typography>
        </Box>
      </Box>

      {/* Bottom Content Body */}
      <Box sx={{ p: 2.5 }}>
        {/* Title */}
        <Typography
          noWrap
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "16px",
            color: COLORS.SECONDARY,
            mb: 0.5,
          }}
        >
          {item.title}
        </Typography>

        {/* Location row */}
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", mb: 3 }}>
          <PlaceOutlined sx={{ color: "#7A9BAB", fontSize: 16 }} />
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
            }}
          >
            {item.location}
          </Typography>
        </Stack>

        {/* Price & Monthly conversion row */}
        <Stack direction="row" sx={{ alignItems: "flex-end", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "19px",
              color: COLORS.SECONDARY,
              lineHeight: 1,
            }}
          >
            {item.price}{" "}
            <Box
              component="span"
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
                ml: 0.25,
              }}
            >
              SAR
            </Box>
          </Typography>

          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "12.5px",
              color: "#7A9BAB",
              lineHeight: 1,
            }}
          >
            {item.monthlyPrice}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};
