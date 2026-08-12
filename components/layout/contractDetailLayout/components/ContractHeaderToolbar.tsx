"use client";

import React from "react";
import { Stack, IconButton, Typography, Button } from "@mui/material";
import { ArrowBackIosNew, Language, FavoriteBorder, Share, Flag } from "@mui/icons-material";
import Link from "next/link";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export interface ContractHeaderToolbarProps {
  contractTitle?: string;
}

export const ContractHeaderToolbar: React.FC<ContractHeaderToolbarProps> = ({ contractTitle }) => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        mb: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {/* Left Side: Back Arrow Button & Breadcrumbs */}
      <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
        <Link href="/dashboard" passHref style={{ textDecoration: "none" }}>
          <IconButton
            sx={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: "1px solid #0135470D",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
              color: COLORS.SECONDARY,
              "&:hover": { backgroundColor: "#F4F7F8" },
            }}
          >
            <ArrowBackIosNew sx={{ fontSize: 13, ml: 0.5 }} />
          </IconButton>
        </Link>

        {/* Breadcrumbs Navigation Links */}
        <Stack
          direction="row"
          spacing={1.25}
          sx={{
            alignItems: "center",
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13.5px",
            color: "#7A9BAB",
            flexWrap: "wrap",
          }}
        >
          <Link href="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
            Home
          </Link>
          <Typography sx={{ fontSize: "11px", color: "#A0B1B9" }}>❯</Typography>
          <Link href="/dashboard/marketplace" style={{ textDecoration: "none", color: "inherit" }}>
            Real Estate
          </Link>
          <Typography sx={{ fontSize: "11px", color: "#A0B1B9" }}>❯</Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              color: COLORS.SECONDARY,
            }}
          >
            {contractTitle || "Contract"}
          </Typography>
        </Stack>
      </Stack>

      {/* Right Side toolbar buttons */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        {/* Language Switcher */}
        <Button
          variant="contained"
          disableElevation
          startIcon={<Language sx={{ fontSize: 16 }} />}
          sx={{
            backgroundColor: "#FFFFFF",
            color: COLORS.SECONDARY,
            borderRadius: "100px",
            px: 2.5,
            py: 1,
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13px",
            textTransform: "none",
            border: "1px solid #0135470D",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
            "&:hover": { backgroundColor: "#F4F7F8" },
          }}
        >
          العربية
        </Button>

        {/* Heart button */}
        <IconButton
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #0135470D",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
            color: COLORS.SECONDARY,
            "&:hover": { backgroundColor: "#F4F7F8" },
          }}
        >
          <FavoriteBorder sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Share button */}
        <IconButton
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #0135470D",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
            color: COLORS.SECONDARY,
            "&:hover": { backgroundColor: "#F4F7F8" },
          }}
        >
          <Share sx={{ fontSize: 18 }} />
        </IconButton>

        {/* Flag button */}
        <IconButton
          sx={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "1px solid #0135470D",
            boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.03)",
            color: COLORS.SECONDARY,
            "&:hover": { backgroundColor: "#F4F7F8" },
          }}
        >
          <Flag sx={{ fontSize: 18 }} />
        </IconButton>
      </Stack>
    </Stack>
  );
};
