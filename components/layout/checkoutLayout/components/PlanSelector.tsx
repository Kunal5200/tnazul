"use client";

import React from "react";
import { Container, Stack, Button } from "@mui/material";
import { poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";

interface PlanSelectorProps {
  plan: "standard" | "featured";
  onChange: (plan: "standard" | "featured") => void;
}

const PlanSelector = ({ plan, onChange }: PlanSelectorProps) => {
  return (
    <Container
      maxWidth="lg"
      sx={{ mt: 4, mb: -2, display: "flex", justifyContent: "center" }}
    >
      <Stack
        direction="row"
        sx={{
          backgroundColor: "rgba(1, 53, 71, 0.05)",
          borderRadius: "100px",
          p: 0.6,
          alignItems: "center",
          width: "100%",
          maxWidth: "340px",
        }}
      >
        <Button
          onClick={() => onChange("standard")}
          disableElevation
          sx={{
            flex: 1,
            borderRadius: "100px",
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13px",
            py: 1,
            backgroundColor: plan === "standard" ? COLORS.WHITE : "transparent",
            color: plan === "standard" ? COLORS.SECONDARY : "#7A9BAB",
            boxShadow:
              plan === "standard"
                ? "0px 4px 10px rgba(1, 53, 71, 0.06)"
                : "none",
            "&:hover": {
              backgroundColor:
                plan === "standard"
                  ? COLORS.WHITE
                  : "rgba(1, 53, 71, 0.02)",
            },
          }}
        >
          Standard Activation
        </Button>
        <Button
          onClick={() => onChange("featured")}
          disableElevation
          sx={{
            flex: 1,
            borderRadius: "100px",
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "13px",
            py: 1,
            backgroundColor: plan === "featured" ? COLORS.WHITE : "transparent",
            color: plan === "featured" ? COLORS.SECONDARY : "#7A9BAB",
            boxShadow:
              plan === "featured"
                ? "0px 4px 10px rgba(1, 53, 71, 0.06)"
                : "none",
            "&:hover": {
              backgroundColor:
                plan === "featured"
                  ? COLORS.WHITE
                  : "rgba(1, 53, 71, 0.02)",
            },
          }}
        >
          Featured Boost
        </Button>
      </Stack>
    </Container>
  );
};

export default PlanSelector;
