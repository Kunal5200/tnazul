"use client";

import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ArrowBack, Lock } from "@mui/icons-material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface HeaderProps {
  onBack: () => void;
}

const Header = ({ onBack }: HeaderProps) => {
  return (
    <Box
      sx={{
        backgroundColor: COLORS.WHITE,
        borderBottom: "1px solid #0135470F",
        py: 2,
        px: { xs: 3, md: 5 },
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Left Side: Back Button */}
        <Button
          variant="outlined"
          startIcon={<ArrowBack sx={{ fontSize: 18 }} />}
          onClick={onBack}
          sx={{
            borderRadius: "100px",
            borderColor: "#0135471A",
            color: COLORS.SECONDARY,
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            px: 3,
            py: 0.8,
            backgroundColor: COLORS.WHITE,
            "&:hover": {
              borderColor: "#0135473D",
              backgroundColor: "#F4F7F8",
            },
          }}
        >
          Back
        </Button>

        {/* Middle Side: Tnazul Logo */}
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          {/* Circular T Icon */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: COLORS.SECONDARY,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: COLORS.WHITE,
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 800,
              fontSize: "16px",
            }}
          >
            T
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "16px",
                color: COLORS.SECONDARY,
                lineHeight: "18px",
                letterSpacing: "0.5px",
              }}
            >
              TNAZUL
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 600,
                fontSize: "9px",
                color: "#166CA9",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
              }}
            >
              Contract Marketplace
            </Typography>
          </Box>
        </Stack>

        {/* Right Side: Secure Gateway Badge */}
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: "center",
            backgroundColor: "rgba(46, 125, 50, 0.06)",
            border: "1px solid rgba(46, 125, 50, 0.2)",
            borderRadius: "100px",
            py: 0.8,
            px: 2.5,
            color: "#2E7D32",
          }}
        >
          <Lock sx={{ fontSize: 16 }} />
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "12px",
            }}
          >
            100% Secure Gateway
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Header;
