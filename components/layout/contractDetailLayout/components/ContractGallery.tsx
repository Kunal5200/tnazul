"use client";

import React, { useState } from "react";
import { Box, Typography, IconButton, Stack, Dialog } from "@mui/material";
import { Star, Apartment, Fullscreen, Close, ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { poppins700 } from "@/utils/fonts";

export interface ContractGalleryProps {
  images: string[];
}

export const ContractGallery: React.FC<ContractGalleryProps> = ({ images }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!images || images.length === 0) return null;

  return (
    <Box>
      {/* Main Image Showcase */}
      <Box
        sx={{
          height: 440,
          width: "100%",
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.04)",
        }}
      >
        <Image
          src={images[activeImageIndex]}
          alt="Preview Large"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
        />

        {/* Overlays */}
        <Box
          sx={{
            position: "absolute",
            top: 18,
            left: 18,
            borderRadius: "100px",
            py: 0.6,
            px: 1.75,
            backgroundColor: COLORS.PRIMARY,
            color: COLORS.SECONDARY,
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          <Star sx={{ fontSize: 13, color: COLORS.SECONDARY }} />
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
            Premium
          </Typography>
        </Box>

        <Box
          sx={{
            position: "absolute",
            top: 18,
            right: 18,
            borderRadius: "100px",
            py: 0.6,
            px: 1.75,
            backgroundColor: "rgba(1, 53, 71, 0.65)",
            color: "#FFFFFF",
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            backdropFilter: "blur(4px)",
          }}
        >
          <Apartment sx={{ fontSize: 13, color: "#FFFFFF" }} />
          <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
            Real Estate
          </Typography>
        </Box>

        {/* Counter Overlay */}
        <Box
          sx={{
            position: "absolute",
            bottom: 18,
            left: 18,
            borderRadius: "100px",
            py: 0.6,
            px: 1.75,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "#FFFFFF",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "11px",
            backdropFilter: "blur(4px)",
          }}
        >
          {`${activeImageIndex + 1} / ${images.length}`}
        </Box>

        {/* Fullscreen Button */}
        <IconButton
          onClick={() => setIsFullscreen(true)}
          sx={{
            position: "absolute",
            bottom: 18,
            right: 18,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: COLORS.SECONDARY,
            backdropFilter: "blur(4px)",
            "&:hover": { backgroundColor: "#FFFFFF" },
          }}
        >
          <Fullscreen sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Thumbnails Swiper Row */}
      <Stack direction="row" spacing={1.5} sx={{ mt: 2, overflowX: "auto", pb: 1 }}>
        {images.map((img: string, idx: number) => (
          <Box
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            sx={{
              width: 94,
              height: 64,
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
              cursor: "pointer",
              border: activeImageIndex === idx ? "2.5px solid #E7BA49" : "2.5px solid transparent",
              boxSizing: "border-box",
              flexShrink: 0,
            }}
          >
            <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="94px" style={{ objectFit: "cover" }} />
          </Box>
        ))}
      </Stack>

      {/* Fullscreen Image Dialog */}
      <Dialog
        open={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        maxWidth="xl"
        fullWidth
        slotProps={{
          paper: {
            sx: {
              backgroundColor: "transparent",
              boxShadow: "none",
              height: "90vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }
          }
        }}
      >
        <IconButton
          onClick={() => setIsFullscreen(false)}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            color: "#FFF",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            zIndex: 10,
          }}
        >
          <Close />
        </IconButton>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
          }}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#FFF",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            zIndex: 10,
          }}
        >
          <ArrowBackIosNew />
        </IconButton>

        <Box sx={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Image
            src={images[activeImageIndex]}
            alt="Fullscreen View"
            fill
            style={{ objectFit: "contain" }}
          />
        </Box>

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setActiveImageIndex((prev) => (prev + 1) % images.length);
          }}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#FFF",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
            zIndex: 10,
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Dialog>
    </Box>
  );
};
