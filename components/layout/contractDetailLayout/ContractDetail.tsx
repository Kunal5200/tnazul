"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Grid,
  Dialog,
  Checkbox,
} from "@mui/material";
import {
  ArrowBackIosNew,
  Language,
  FavoriteBorder,
  Share,
  Flag,
  Star,
  Apartment,
  Fullscreen,
  VisibilityOutlined,
  AccessTimeOutlined,
  CheckCircle,
  CalendarMonthOutlined,
  TimerOutlined,
  PaymentsOutlined,
  SecurityOutlined,
  InsertDriveFileOutlined,
  PlaceOutlined,
  ChatBubbleOutlineOutlined,
  LocalPhoneOutlined,
  Bolt,
  Close,
  ErrorOutlined,
  CloudUploadOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";

// Custom type for step data
interface VerticalStep {
  label: string;
  description: string;
  status: "complete" | "current" | "upcoming";
}

const ContractDetailLayout = () => {
  // Gallery images list
  const galleryImages = [
    "/images/villa_preview.png",
    "/images/shop_preview.png",
    "/images/villa_preview.png",
    "/images/shop_preview.png",
    "/images/villa_preview.png",
  ];
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Modal Wizard State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [confirmObligations, setConfirmObligations] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Canvas Ref for Signature Drawing Pad
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stepper Header Config
  const stepsConfig = [
    { label: "Financials", id: 1 },
    { label: "Documents", id: 2 },
    { label: "Signature", id: 3 },
    { label: "Success", id: 4 },
  ];

  // Signature Pad Drawing Logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.moveTo(clientX - rect.left, clientY - rect.top);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();

    let clientX, clientY;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    ctx.lineTo(clientX - rect.left, clientY - rect.top);
    ctx.strokeStyle = COLORS.SECONDARY;
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Reset modal parameters on Close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setConfirmObligations(false);
    setAgreeTerms(false);
  };

  // Vertical stepper states
  const verticalSteps: VerticalStep[] = [
    { label: "Listed", description: "Contract published", status: "complete" },
    { label: "Interest Received", description: "3 interested buyers", status: "complete" },
    { label: "Documents Shared", description: "Pending review", status: "current" },
    { label: "Approval Pending", description: "Landlord & bank", status: "upcoming" },
    { label: "Transfer Completed", description: "Ownership changed", status: "upcoming" },
  ];

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#F9F8F6EB" }}>
      {/* Top Header / Breadcrumb Toolbar */}
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
              Luxury 4BR Villa — Al Malaz Comp
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

      {/* Main Two-Column Content Grid */}
      <Grid container spacing={4.5}>
        {/* Left Column: Details Area */}
        <Grid size={{ xs: 12, md: 8.2 }}>
          <Stack spacing={4.5}>
            {/* Image Slider Module */}
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
                  src={galleryImages[activeImageIndex]}
                  alt="Villa Preview Large"
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
                  {`${activeImageIndex + 1} / ${galleryImages.length}`}
                </Box>

                {/* Fullscreen Button */}
                <IconButton
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
                {galleryImages.map((img, idx) => (
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
            </Box>

            {/* Title & Metadata */}
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 800,
                  fontSize: "26px",
                  color: COLORS.SECONDARY,
                  mb: 1.5,
                }}
              >
                Luxury 4BR Villa — Al Malaz Compound
              </Typography>

              {/* Specs Icons List */}
              <Stack direction="row" spacing={2.5} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "#7A9BAB" }}>
                  <VisibilityOutlined sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", fontWeight: 600 }}>
                    412 views
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "#7A9BAB" }}>
                  <AccessTimeOutlined sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", fontWeight: 600 }}>
                    10 Mar 2025
                  </Typography>
                </Stack>

                {/* Nafath status badge */}
                <Box
                  sx={{
                    borderRadius: "100px",
                    py: 0.5,
                    px: 1.5,
                    backgroundColor: "#E8F5E9",
                    color: "#10753E",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <CheckCircle sx={{ fontSize: 13, color: "#10753E" }} />
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
                    Nafath Verified
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Financial Summary card container */}
            <Box
              sx={{
                backgroundColor: "#F4F7F8",
                borderRadius: "24px",
                p: 3.5,
                border: "1px solid #0135470D",
              }}
            >
              {/* Header Title inside card */}
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                  <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: COLORS.SECONDARY,
                    }}
                  >
                    Financial Summary
                  </Typography>
                </Stack>
                {/* Negotiable status badge */}
                <Box
                  sx={{
                    borderRadius: "6px",
                    py: 0.5,
                    px: 1.25,
                    backgroundColor: "#E8F5E9",
                    color: "#10753E",
                  }}
                >
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
                    Negotiable
                  </Typography>
                </Box>
              </Stack>

              {/* Total remaining value display */}
              <Box sx={{ mb: 3.5 }}>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: "#7A9BAB",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Total Remaining Value
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 800,
                    fontSize: "36px",
                    color: COLORS.SECONDARY,
                    lineHeight: 1,
                  }}
                >
                  204,000{" "}
                  <Box component="span" sx={{ fontSize: "20px", fontWeight: 700, color: "#7A9BAB", ml: 0.5 }}>
                    SAR
                  </Box>
                </Typography>
              </Box>

              {/* 2x2 Grid of Financial parameters */}
              <Grid container spacing={2.5}>
                {/* Card 1: Monthly amount */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(231, 186, 73, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <CalendarMonthOutlined sx={{ color: COLORS.PRIMARY, fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                        Monthly Amount
                      </Typography>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                        8,500 SAR
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Card 2: Remaining payments */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(22, 108, 169, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <TimerOutlined sx={{ color: "#166CA9", fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                        Remaining Payments
                      </Typography>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                        24 months
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Card 3: Transfer fee */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(16, 117, 62, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <PaymentsOutlined sx={{ color: "#10753E", fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                        Transfer Fee
                      </Typography>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                        2,500 SAR
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Card 4: Security deposit */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", p: 2.5, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: "50%", backgroundColor: "rgba(1, 53, 71, 0.08)", display: "flex", alignItems: "center", flexShrink: 0, justifyContent: "center" }}>
                      <SecurityOutlined sx={{ color: COLORS.SECONDARY, fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 500 }}>
                        Security Deposit
                      </Typography>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                        17,000 SAR
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>

            {/* Contract Information */}
            <Box>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3 }}>
                <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "16px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Contract Information
                </Typography>
              </Stack>

              <Grid container spacing={3} sx={{ mb: 4 }}>
                {/* Parameter 1: contract type */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2.5 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#EEF6FA", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <InsertDriveFileOutlined sx={{ color: "#166CA9", fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        Contract Type
                      </Typography>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                        Residential Lease
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                {/* Parameter 2: location */}
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3, border: "1px solid #0135470D", display: "flex", alignItems: "center", gap: 2.5 }}>
                    <Box sx={{ width: 48, height: 48, borderRadius: "50%", backgroundColor: "#FCF8EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <PlaceOutlined sx={{ color: COLORS.PRIMARY, fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase" }}>
                        Location
                      </Typography>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                        Al-Malaz, Riyadh
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              {/* Lease Timeline Wrapper */}
              <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3.5, border: "1px solid #0135470D" }}>
                {/* Labels Header */}
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 2 }}>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "12px",
                      color: COLORS.SECONDARY,
                      letterSpacing: "0.5px",
                    }}
                  >
                    LEASE TIMELINE
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "11px",
                      color: COLORS.SECONDARY,
                      backgroundColor: "rgba(1, 53, 71, 0.05)",
                      borderRadius: "6px",
                      px: 1,
                      py: 0.4,
                    }}
                  >
                    24 months left (25%)
                  </Typography>
                </Stack>

                {/* Progress bar line */}
                <Box sx={{ height: 7, width: "100%", backgroundColor: "#EDF1F2", borderRadius: "4px", overflow: "hidden", mb: 2.5 }}>
                  <Box sx={{ width: "25%", height: "100%", backgroundColor: COLORS.SECONDARY, borderRadius: "4px" }} />
                </Box>

                {/* Start, duration, end markers */}
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Box>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase", mb: 0.25 }}>
                      Start Date
                    </Typography>
                    <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
                      15 Jan 2024
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase", mb: 0.25 }}>
                      Total Duration
                    </Typography>
                    <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
                      24 months
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase", mb: 0.25 }}>
                      End Date
                    </Typography>
                    <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "12.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
                      15 Jan 2026
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </Box>

            {/* Description Paragraph */}
            <Box>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
                <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "16px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Description
                </Typography>
              </Stack>
              <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3.5, border: "1px solid #0135470D" }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#5A7A8A",
                    lineHeight: 1.7,
                  }}
                >
                  Spacious four-bedroom villa situated inside the prestigious Al Malaz Compound in central Riyadh. The property features an open-plan living area, a modern fully-equipped kitchen, marble-floored reception, private garden with mature landscaping, and a dedicated parking bay for two vehicles. The compound offers 24/7 security, a shared swimming pool, children's play area, and a residents-only gym. Ideal for families seeking privacy and convenience with easy access to Riyadh's commercial district and King Fahd Road.
                </Typography>
              </Box>
            </Box>

            {/* Transfer Conditions */}
            <Box>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
                <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "16px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Transfer Conditions
                </Typography>
              </Stack>
              <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3.5, border: "1px solid #0135470D" }}>
                <Stack spacing={2.5}>
                  {[
                    "Buyer must pass identity verification (Nafath or manual ID review)",
                    "Remaining lease balance to be settled within 30 days of agreement",
                    "Transfer fee (SAR 2,500) is non-refundable once documents are submitted",
                    "Compound management approval required — typically 5-7 business days",
                    "Security deposit transfers to new tenant upon landlord confirmation",
                  ].map((condition, idx) => (
                    <Stack key={idx} direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          backgroundColor: "#F4F7F8",
                          color: COLORS.SECONDARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: poppins700.style.fontFamily,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontWeight: 500,
                          fontSize: "13.5px",
                          color: "#5A7A8A",
                        }}
                      >
                        {condition}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Grid>

        {/* Right Column: Seller details, status vertical stepper, and similar listings */}
        <Grid size={{ xs: 12, md: 3.8 }}>
          <Stack spacing={4}>
            {/* Listed By Card */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 3.5,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "10.5px",
                  color: "#7A9BAB",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  mb: 2.5,
                }}
              >
                Listed By
              </Typography>

              {/* User Overview Row */}
              <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    backgroundColor: "rgba(231, 186, 73, 0.18)",
                    color: COLORS.SECONDARY,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "18px",
                    fontWeight: 700,
                    fontFamily: poppins700.style.fontFamily,
                  }}
                >
                  AR
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: COLORS.SECONDARY,
                      mb: 0.25,
                    }}
                  >
                    Ahmed Al-Rashidi
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: "11.5px",
                      color: "#7A9BAB",
                    }}
                  >
                    Member since Jan 2024
                  </Typography>
                </Box>
              </Stack>

              {/* Nafath status pill */}
              <Box
                sx={{
                  borderRadius: "100px",
                  py: 0.6,
                  px: 1.5,
                  backgroundColor: "#E8F5E9",
                  color: "#10753E",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 0.5,
                  mb: 3.5,
                }}
              >
                <CheckCircle sx={{ fontSize: 13, color: "#10753E" }} />
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
                  Nafath Verified
                </Typography>
              </Box>

              {/* Profile stats row */}
              <Stack
                direction="row"
                sx={{
                  justifyContent: "space-between",
                  textAlign: "center",
                  mb: 4,
                }}
              >
                <Box>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "16px", color: COLORS.SECONDARY }}>
                    95%
                  </Typography>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "11px", color: "#7A9BAB", mt: 0.2 }}>
                    Response
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: "#0135470D" }} />
                <Box>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "16px", color: COLORS.SECONDARY }}>
                    ~ 2 hours
                  </Typography>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "11px", color: "#7A9BAB", mt: 0.2 }}>
                    Reply in
                  </Typography>
                </Box>
                <Divider orientation="vertical" flexItem sx={{ borderColor: "#0135470D" }} />
                <Box>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "16px", color: COLORS.SECONDARY }}>
                    3
                  </Typography>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "11px", color: "#7A9BAB", mt: 0.2 }}>
                    Listings
                  </Typography>
                </Box>
              </Stack>

              {/* Call to Actions stack */}
              <Stack spacing={1.5}>
                <Button
                  fullWidth
                  variant="contained"
                  disableElevation
                  onClick={() => setIsModalOpen(true)}
                  startIcon={<Bolt sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: "100px",
                    backgroundColor: COLORS.SECONDARY,
                    color: COLORS.WHITE,
                    py: 1.5,
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "14px",
                    textTransform: "none",
                    boxShadow: "0px 6px 15px rgba(1, 53, 71, 0.15)",
                    "&:hover": { backgroundColor: "#002432" },
                  }}
                >
                  Apply for Transfer
                </Button>

                <Stack direction="row" spacing={1.5}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<ChatBubbleOutlineOutlined sx={{ fontSize: 15 }} />}
                    sx={{
                      borderRadius: "100px",
                      borderColor: "#0135471F",
                      color: COLORS.SECONDARY,
                      py: 1.25,
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13px",
                      textTransform: "none",
                      "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
                    }}
                  >
                    Message
                  </Button>

                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LocalPhoneOutlined sx={{ fontSize: 15 }} />}
                    sx={{
                      borderRadius: "100px",
                      borderColor: "#0135471F",
                      color: COLORS.SECONDARY,
                      py: 1.25,
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13px",
                      textTransform: "none",
                      "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
                    }}
                  >
                    Request Call
                  </Button>
                </Stack>
              </Stack>
            </Box>

            {/* Transfer Status Vertical Stepper */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 3.5,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "15.5px",
                  color: COLORS.SECONDARY,
                  mb: 3,
                }}
              >
                Transfer Status
              </Typography>

              {/* Vertical steps stack */}
              <Stack spacing={0.5}>
                {verticalSteps.map((step, idx) => {
                  const isLast = idx === verticalSteps.length - 1;
                  const isComplete = step.status === "complete";
                  const isCurrent = step.status === "current";

                  return (
                    <Box key={idx} sx={{ display: "flex", gap: 2.5 }}>
                      {/* Left: Circle Indicator and Vertical line */}
                      <Stack sx={{ alignItems: "center" }}>
                        <Box
                          sx={{
                            width: 22,
                            height: 22,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: isComplete
                              ? "1.5px solid #10753E"
                              : isCurrent
                              ? `1.5px solid ${COLORS.SECONDARY}`
                              : "1.5px solid #A0B1B9",
                            backgroundColor: isComplete
                              ? "#10753E"
                              : isCurrent
                              ? COLORS.SECONDARY
                              : "#FFFFFF",
                            color: "#FFFFFF",
                            boxSizing: "border-box",
                            zIndex: 2,
                          }}
                        >
                          {isComplete && <Typography sx={{ fontSize: "11px", fontWeight: 700 }}>✓</Typography>}
                          {isCurrent && <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#FFFFFF" }} />}
                        </Box>
                        {!isLast && (
                          <Box
                            sx={{
                              width: "1.5px",
                              height: 38,
                              backgroundColor: isComplete ? "#10753E" : "#EDF1F2",
                              my: 0.5,
                              zIndex: 1,
                            }}
                          />
                        )}
                      </Stack>

                      {/* Right: Content details */}
                      <Box sx={{ pt: 0.15, pb: isLast ? 0 : 2 }}>
                        <Typography
                          sx={{
                            fontFamily: poppins700.style.fontFamily,
                            fontWeight: 700,
                            fontSize: "13.5px",
                            color: isComplete || isCurrent ? COLORS.SECONDARY : "#7A9BAB",
                            lineHeight: 1,
                          }}
                        >
                          {step.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: poppins.style.fontFamily,
                            fontWeight: 500,
                            fontSize: "11px",
                            color: "#7A9BAB",
                            mt: 0.5,
                          }}
                        >
                          {step.description}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>

            {/* Similar Contracts List Widget */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 3.5,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 2.5 }}>
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "15px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Similar Contracts
                </Typography>
                <Link href="/dashboard/marketplace" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "11px",
                      color: COLORS.PRIMARY,
                      "&:hover": { color: "#d6ab38" },
                    }}
                  >
                    View all ❯
                  </Typography>
                </Link>
              </Stack>

              {/* Similar items list */}
              <Stack spacing={2.5}>
                {[
                  { title: "3BR Apartment — Al Olaya District", price: "126,000 SAR", duration: "18 mo", img: "/images/shop_preview.png" },
                  { title: "Modern Villa — Al Narjis Compound", price: "252,000 SAR", duration: "24 mo", img: "/images/villa_preview.png" },
                  { title: "Furnished Studio — DQ District", price: "54,000 SAR", duration: "12 mo", img: "/images/shop_preview.png" },
                ].map((item, idx) => (
                  <Stack key={idx} direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    {/* Thumbnail */}
                    <Box sx={{ width: 72, height: 50, borderRadius: "10px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <Image src={item.img} alt={item.title} fill sizes="72px" style={{ objectFit: "cover" }} />
                    </Box>
                    {/* Info */}
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        noWrap
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "13px",
                          color: COLORS.SECONDARY,
                          mb: 0.25,
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontWeight: 600,
                          fontSize: "11px",
                          color: "#7A9BAB",
                        }}
                      >
                        {item.price}{" "}
                        <Box component="span" sx={{ fontWeight: 500, color: "#A0B1B9", ml: 0.5 }}>
                          · {item.duration}
                        </Box>
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      {/* Floating CTA WhatsApp */}
      <WhatsAppButton />

      {/* APPLY FOR CONTRACT TRANSFER WIZARD DIALOG MODAL */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        scroll="body"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "24px",
            p: 4,
            overflow: "visible",
            boxShadow: "0px 10px 40px rgba(0, 0, 0, 0.08)",
          },
        }}
      >
        {/* Modal Header */}
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Box>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "19px",
                color: COLORS.SECONDARY,
              }}
            >
              {`Apply for Contract Transfer (Step ${currentStep})`}
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "12px",
                color: "#7A9BAB",
                mt: 0.25,
              }}
            >
              Complete the steps below to secure your interest
            </Typography>
          </Box>
          <IconButton
            onClick={handleCloseModal}
            sx={{
              width: 32,
              height: 32,
              backgroundColor: "rgba(1, 53, 71, 0.03)",
              color: COLORS.SECONDARY,
              "&:hover": { backgroundColor: "rgba(1, 53, 71, 0.08)" },
            }}
          >
            <Close sx={{ fontSize: 16 }} />
          </IconButton>
        </Stack>

        {/* Stepper Progress bar */}
        <Stack direction="row" sx={{ alignItems: "center", justifyContent: "center", mb: 4.5, mt: 1 }}>
          {stepsConfig.map((s, idx) => {
            const isCompleted = currentStep > s.id;
            const isActive = currentStep === s.id;
            const isLast = idx === stepsConfig.length - 1;

            return (
              <React.Fragment key={s.id}>
                {/* Step Circle & Label */}
                <Stack sx={{ alignItems: "center", position: "relative" }}>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: isCompleted
                        ? "2px solid #10753E"
                        : isActive
                        ? `2px solid ${COLORS.SECONDARY}`
                        : "2px solid #E0E0E0",
                      backgroundColor: isCompleted
                        ? "#10753E"
                        : isActive
                        ? COLORS.SECONDARY
                        : "#FFFFFF",
                      color: isCompleted || isActive ? "#FFFFFF" : "#7A9BAB",
                      fontSize: "11px",
                      fontWeight: 700,
                      fontFamily: poppins700.style.fontFamily,
                    }}
                  >
                    {isCompleted ? "✓" : s.id}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "10.5px",
                      fontWeight: isActive || isCompleted ? 700 : 500,
                      color: isActive || isCompleted ? COLORS.SECONDARY : "#7A9BAB",
                      mt: 0.75,
                    }}
                  >
                    {s.label}
                  </Typography>
                </Stack>
                {/* Connecting Line */}
                {!isLast && (
                  <Box
                    sx={{
                      height: "2.5px",
                      width: { xs: "32px", sm: "64px", md: "84px" },
                      backgroundColor: isCompleted ? "#10753E" : "#EDF1F2",
                      mt: -2,
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </Stack>

        <Divider sx={{ borderColor: "#0135470D", mb: 4 }} />

        {/* STEP 1 CONTENT: FINANCIALS */}
        {currentStep === 1 && (
          <Box>
            {/* Financial Summary values display */}
            <Box
              sx={{
                backgroundColor: "#F4F7F8",
                borderRadius: "20px",
                p: 3,
                border: "1px solid #0135470D",
                mb: 3,
              }}
            >
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "11px",
                  color: COLORS.SECONDARY,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  mb: 2.5,
                }}
              >
                Financial Summary
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3.5 }}>
                <Grid size={6}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase" }}>
                    Monthly Amount
                  </Typography>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                    8,500 SAR
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase" }}>
                    Months Left
                  </Typography>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                    24 months
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase" }}>
                    Transfer Fee
                  </Typography>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                    2,500 SAR
                  </Typography>
                </Grid>
                <Grid size={6}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "10px", color: "#7A9BAB", fontWeight: 700, textTransform: "uppercase" }}>
                    Security Deposit
                  </Typography>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "16px", color: COLORS.SECONDARY, fontWeight: 700, mt: 0.2 }}>
                    17,000 SAR
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ borderColor: "#0135470D", mb: 2 }} />

              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "11px", color: "#7A9BAB", fontWeight: 700 }}>
                  Total Value (incl. remaining)
                </Typography>
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "18px", color: COLORS.SECONDARY, fontWeight: 700 }}>
                  204,000 SAR
                </Typography>
              </Stack>
            </Box>

            {/* Warning Alert banner */}
            <Stack
              direction="row"
              spacing={1.75}
              sx={{
                backgroundColor: "#FFF9E6",
                borderRadius: "14px",
                p: 2,
                border: "1px solid rgba(231, 186, 73, 0.25)",
                mb: 3,
              }}
            >
              <ErrorOutlined sx={{ color: "#E7BA49", fontSize: 20, flexShrink: 0, mt: 0.15 }} />
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#9A7A25",
                  lineHeight: 1.5,
                }}
              >
                Administrative fees apply for platform logging. The lessor compound or bank management may check credit standing before finalizing contract transfer.
              </Typography>
            </Stack>

            {/* Checkbox item */}
            <Box
              onClick={() => setConfirmObligations(!confirmObligations)}
              sx={{
                borderRadius: "14px",
                border: "1.38px solid #0135471F",
                py: 1.5,
                px: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                backgroundColor: confirmObligations ? "rgba(1, 53, 71, 0.02)" : "#FFFFFF",
                transition: "all 0.2s ease",
                mb: 4.5,
              }}
            >
              <Checkbox
                checked={confirmObligations}
                onChange={(e) => setConfirmObligations(e.target.checked)}
                sx={{
                  p: 0,
                  color: "#A0B1B9",
                  "&.Mui-checked": {
                    color: COLORS.SECONDARY,
                  },
                }}
              />
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: "13.5px", color: COLORS.SECONDARY }}>
                I understand and confirm the financial obligations
              </Typography>
            </Box>

            {/* Footer actions */}
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                disabled
                sx={{
                  borderRadius: "100px",
                  borderColor: "#0135471F",
                  color: "#A0B1B9",
                  px: 4,
                  py: 1.2,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textTransform: "none",
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                disableElevation
                disabled={!confirmObligations}
                onClick={() => setCurrentStep(2)}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: COLORS.SECONDARY,
                  color: COLORS.WHITE,
                  px: 4,
                  py: 1.2,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#002432" },
                }}
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}

        {/* STEP 2 CONTENT: DOCUMENTS */}
        {currentStep === 2 && (
          <Box>
            <Stack spacing={3.5} sx={{ mb: 4.5 }}>
              {/* National ID Upload success check card */}
              <Box>
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "13px", color: COLORS.SECONDARY, mb: 1.5 }}>
                  Upload National ID / Iqama
                </Typography>
                <Box
                  sx={{
                    border: "1.38px solid #E8F5E9",
                    backgroundColor: "#F1FAF5",
                    borderRadius: "14px",
                    p: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                  }}
                >
                  <CheckCircle sx={{ color: "#10753E", fontSize: 18 }} />
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: "13.5px", color: "#10753E" }}>
                    national_id.pdf
                  </Typography>
                </Box>
              </Box>

              {/* Income proof upload box */}
              <Box>
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "13px", color: COLORS.SECONDARY, mb: 1.5 }}>
                  Upload Income Proof / Salary Certificate
                </Typography>
                <Box
                  sx={{
                    border: "2px dashed #0135471F",
                    borderRadius: "16px",
                    p: 4.5,
                    textAlign: "center",
                    cursor: "pointer",
                    backgroundColor: "#FFFFFF",
                    "&:hover": {
                      borderColor: COLORS.SECONDARY,
                      backgroundColor: "rgba(1, 53, 71, 0.02)",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  <CloudUploadOutlined sx={{ color: "#7A9BAB", fontSize: 32, mb: 1.5 }} />
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "14.5px", color: COLORS.SECONDARY, mb: 0.5 }}>
                    Click or drag file to upload
                  </Typography>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "12px", color: "#7A9BAB", fontWeight: 500 }}>
                    PDF, PNG, JPG (Max 10MB)
                  </Typography>
                </Box>
              </Box>
            </Stack>

            {/* Footer actions */}
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={() => setCurrentStep(1)}
                sx={{
                  borderRadius: "100px",
                  borderColor: "#0135471F",
                  color: COLORS.SECONDARY,
                  px: 4,
                  py: 1.2,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textTransform: "none",
                  "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                disableElevation
                onClick={() => setCurrentStep(3)}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: COLORS.SECONDARY,
                  color: COLORS.WHITE,
                  px: 4,
                  py: 1.2,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#002432" },
                }}
              >
                Next
              </Button>
            </Stack>
          </Box>
        )}

        {/* STEP 3 CONTENT: DIGITAL SIGNATURE */}
        {currentStep === 3 && (
          <Box>
            {/* Scrollable Terms agreement card */}
            <Box sx={{ mb: 3 }}>
              <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "13px", color: COLORS.SECONDARY, mb: 1.5 }}>
                LEGAL TERMS & DIGITAL SIGNATURE
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#F4F7F8",
                  borderRadius: "16px",
                  p: 2.5,
                  border: "1px solid #0135470D",
                  height: 180,
                  overflowY: "auto",
                }}
              >
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "12px", color: COLORS.SECONDARY, mb: 1.5 }}>
                  Lease Transfer Responsibility Agreement:
                </Typography>
                <Stack spacing={1.5}>
                  {[
                    "1. The applicant acknowledges full responsibility for the completeness and accuracy of all submitted information.",
                    "2. The contract transfer is strictly contingent on lessor credit approvals and landlord background review.",
                    "3. The digital signature drawn below represents binding legal authorization for Tnazul platform to process identity verification.",
                    "4. Platform administrative filing fees (SAR 2,500) are assessed upon document dispatch and are non-refundable.",
                  ].map((text, idx) => (
                    <Typography key={idx} sx={{ fontFamily: poppins.style.fontFamily, fontSize: "12px", color: "#5A7A8A", lineHeight: 1.5 }}>
                      {text}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Box>

            {/* Checkbox agreement */}
            <Box
              onClick={() => setAgreeTerms(!agreeTerms)}
              sx={{
                borderRadius: "14px",
                border: "1.38px solid #0135471F",
                py: 1.5,
                px: 2.5,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                cursor: "pointer",
                backgroundColor: agreeTerms ? "rgba(1, 53, 71, 0.02)" : "#FFFFFF",
                transition: "all 0.2s ease",
                mb: 3,
              }}
            >
              <Checkbox
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                sx={{
                  p: 0,
                  color: "#A0B1B9",
                  "&.Mui-checked": {
                    color: COLORS.SECONDARY,
                  },
                }}
              />
              <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: "13px", color: COLORS.SECONDARY }}>
                I agree to the terms and authorize verification
              </Typography>
            </Box>

            {/* Signature Draw Area */}
            <Box sx={{ mb: 4.5 }}>
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1 }}>
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "13px", color: COLORS.SECONDARY }}>
                  Sign Here
                </Typography>
                <Button
                  onClick={clearCanvas}
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "11px",
                    color: COLORS.PRIMARY,
                    textTransform: "none",
                    minWidth: 0,
                    p: 0,
                    "&:hover": { backgroundColor: "transparent", color: "#d6ab38" },
                  }}
                >
                  Clear Signature
                </Button>
              </Stack>

              {/* Canvas Box */}
              <Box
                sx={{
                  border: "1.38px solid #0135471F",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  height: 110,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <canvas
                  ref={canvasRef}
                  width={560}
                  height={110}
                  onMouseDown={startDrawing}
                  onMouseMove={draw}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchMove={draw}
                  onTouchEnd={stopDrawing}
                  style={{ display: "block", cursor: "crosshair", width: "100%", height: "100%" }}
                />
              </Box>
            </Box>

            {/* Footer actions */}
            <Stack direction="row" sx={{ justifyContent: "space-between" }}>
              <Button
                variant="outlined"
                onClick={() => setCurrentStep(2)}
                sx={{
                  borderRadius: "100px",
                  borderColor: "#0135471F",
                  color: COLORS.SECONDARY,
                  px: 4,
                  py: 1.2,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textTransform: "none",
                  "&:hover": { borderColor: COLORS.SECONDARY, backgroundColor: "rgba(1, 53, 71, 0.02)" },
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                disableElevation
                disabled={!agreeTerms}
                onClick={() => setCurrentStep(4)}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: COLORS.SECONDARY,
                  color: COLORS.WHITE,
                  px: 4,
                  py: 1.2,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "13.5px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#002432" },
                }}
              >
                Submit Request
              </Button>
            </Stack>
          </Box>
        )}

        {/* STEP 4 CONTENT: SUCCESS */}
        {currentStep === 4 && (
          <Box>
            {/* Green Check Circle Banner */}
            <Stack sx={{ alignItems: "center", justifyContent: "center", mt: 2, mb: 4 }}>
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  backgroundColor: "#E8F5E9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2.5,
                }}
              >
                <CheckCircle sx={{ color: "#10753E", fontSize: 32 }} />
              </Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 800,
                  fontSize: "20px",
                  color: COLORS.SECONDARY,
                  mb: 1,
                  textAlign: "center",
                }}
              >
                Request Submitted
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#7A9BAB",
                  lineHeight: 1.5,
                  textAlign: "center",
                  maxWidth: "380px",
                }}
              >
                Your transfer application has been sent securely. The seller and management will review it shortly.
              </Typography>
            </Stack>

            {/* Details Table reference card */}
            <Box
              sx={{
                backgroundColor: "#F4F7F8",
                borderRadius: "16px",
                p: 2.5,
                border: "1px solid #0135470D",
                mb: 3.5,
              }}
            >
              <Stack spacing={1.5}>
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", fontWeight: 500 }}>
                    Reference #
                  </Typography>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "13.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
                    TZ-2026-849102
                  </Typography>
                </Stack>
                <Divider sx={{ borderColor: "#0135470D" }} />
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", fontWeight: 500 }}>
                    Submission Date
                  </Typography>
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "13.5px", color: COLORS.SECONDARY, fontWeight: 700 }}>
                    20 Jun 2026
                  </Typography>
                </Stack>
              </Stack>
            </Box>

            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontSize: "11px",
                color: "#A0B1B9",
                textAlign: "center",
                mb: 4,
              }}
            >
              A confirmation email and SMS notification has been sent.
            </Typography>

            {/* Footer actions */}
            <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
              <Button
                variant="contained"
                disableElevation
                onClick={handleCloseModal}
                sx={{
                  borderRadius: "100px",
                  backgroundColor: COLORS.SECONDARY,
                  color: COLORS.WHITE,
                  px: 4,
                  py: 1.25,
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 700,
                  fontSize: "14px",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#002432" },
                }}
              >
                Close
              </Button>
            </Stack>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default ContractDetailLayout;
