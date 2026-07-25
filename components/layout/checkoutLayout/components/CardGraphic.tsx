"use client";

import React from "react";
import { Paper, Stack, Box, Typography } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface CardGraphicProps {
  activeMethod: "card" | "mada" | "apple" | "stc";
  cardNumber: string;
  cardholder: string;
  expiry: string;
}

const CardGraphic = ({
  activeMethod,
  cardNumber,
  cardholder,
  expiry,
}: CardGraphicProps) => {
  const isMada = activeMethod === "mada";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: "20px",
        background: isMada
          ? "linear-gradient(135deg, #008D9A 0%, #006D78 100%)" // Teal theme for mada
          : "linear-gradient(135deg, #013547 0%, #0a4f68 100%)", // Navy theme for credit card
        color: "#FFFFFF",
        minHeight: "190px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.15)",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
      }}
    >
      {/* Card brand & chip */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {/* Card Chip */}
        <Box
          sx={{
            width: 40,
            height: 30,
            borderRadius: "6px",
            background: "linear-gradient(135deg, #e5c07b 0%, #abb2bf 100%)",
            opacity: 0.85,
          }}
        />
        {/* Logo (Visa or Mada) */}
        {isMada ? (
          <Typography
            sx={{
              fontStyle: "italic",
              fontWeight: 800,
              fontSize: "20px",
              color: COLORS.WHITE,
            }}
          >
            mada
          </Typography>
        ) : (
          <Typography
            sx={{ fontStyle: "italic", fontWeight: 800, fontSize: "20px" }}
          >
            VISA
          </Typography>
        )}
      </Stack>

      {/* Card Number */}
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontWeight: 700,
          fontSize: "19px",
          letterSpacing: "2px",
          my: 2,
        }}
      >
        {cardNumber || "•••• •••• •••• ••••"}
      </Typography>

      {/* Holder and Expiry */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "flex-end" }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "9px", opacity: 0.6, letterSpacing: "0.5px" }}
          >
            CARD HOLDER
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
          >
            {cardholder || "YOUR NAME"}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "right" }}>
          <Typography
            sx={{ fontSize: "9px", opacity: 0.6, letterSpacing: "0.5px" }}
          >
            EXPIRY
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "13px",
              fontWeight: 600,
            }}
          >
            {expiry || "MM/YY"}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default CardGraphic;
