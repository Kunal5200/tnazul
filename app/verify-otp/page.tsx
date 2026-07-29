"use client";

import React, { Suspense } from "react";
import { Box } from "@mui/material";
import { useSearchParams } from "next/navigation";
import VerifyOtpForm from "@/components/layout/registerLayout/VerifyOtpForm";

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const referenceId = searchParams.get("referenceId") || "";
  const mobileNumber = searchParams.get("mobileNumber") || "";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F4F7F9",
        p: 3,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "520px",
          backgroundColor: "#FFFFFF",
          p: { xs: 3, sm: 5 },
          borderRadius: "24px",
          boxShadow: "0px 10px 40px rgba(1, 53, 71, 0.08)",
        }}
      >
        <VerifyOtpForm
          referenceId={referenceId}
          mobileNumber={mobileNumber}
        />
      </Box>
    </Box>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}
