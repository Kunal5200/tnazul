"use client";

import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { SavedCard } from "./components/SavedCard";
import { SavedItem } from "./types";

const SavedLayout = () => {
  // Local state for interactive deletion
  const [savedItems, setSavedItems] = useState<SavedItem[]>([
    {
      id: "s1",
      title: "2BR Apartment - Corniche Sea View",
      image: "/images/villa_preview.png",
      location: "Dammam",
      price: "33,000",
      monthlyPrice: "5,500/mo",
      duration: "6 mo",
      isUrgent: true,
    },
    {
      id: "s2",
      title: "Hyundai Sonata 2022 - Low Mileage",
      image: "/images/shop_preview.png",
      location: "Riyadh",
      price: "29,400",
      monthlyPrice: "1,470/mo",
      duration: "20 mo",
      isUrgent: false,
    },
    {
      id: "s3",
      title: "Gym Membership - 2 Years Left",
      image: "/images/villa_preview.png",
      location: "Riyadh",
      price: "10,800",
      monthlyPrice: "450/mo",
      duration: "24 mo",
      isUrgent: false,
    },
  ]);

  const handleRemove = (id: string) => {
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <Box sx={{ pb: 10, maxWidth: "1200px", margin: "0 auto" }}>
      {/* Title */}
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "26px",
          color: COLORS.SECONDARY,
          mb: 4.5,
        }}
      >
        Saved Contracts{" "}
        <Box component="span" sx={{ fontWeight: 500, color: "#7A9BAB", ml: 0.5 }}>
          ({savedItems.length})
        </Box>
      </Typography>

      {/* Grid of Saved Cards */}
      {savedItems.length > 0 ? (
        <Grid container spacing={3.5}>
          {savedItems.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SavedCard item={item} onRemove={handleRemove} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            py: 12,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #0135470D",
            p: 4,
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "18px",
              color: COLORS.SECONDARY,
              mb: 1,
            }}
          >
            No Saved Contracts
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 500,
              fontSize: "14px",
              color: "#7A9BAB",
            }}
          >
            Your saved listings and contracts will appear here.
          </Typography>
        </Box>
      )}

      {/* WhatsApp Button floating */}
      <WhatsAppButton />
    </Box>
  );
};

export default SavedLayout;
