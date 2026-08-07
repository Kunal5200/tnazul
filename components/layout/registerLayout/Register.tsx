"use client";

import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import {
  VerifiedOutlined,
  CheckCircleOutlineOutlined,
  DescriptionOutlined,
  PersonOutlined,
} from "@mui/icons-material";
import RegisterForm from "./RegisterForm";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

const RegisterLayout = () => {
  const benefits = [
    {
      icon: VerifiedOutlined,
      iconColor: "#10753E",
      bgColor: "#10753E14",
      title: "Nafath Verified",
      desc: "Government-grade identity check",
    },
    {
      icon: CheckCircleOutlineOutlined,
      iconColor: "#166CA9",
      bgColor: "#166CA914",
      title: "100% Verified Listings",
      desc: "Every contract reviewed before publish",
    },
    {
      icon: DescriptionOutlined,
      iconColor: "#E7BA49",
      bgColor: "#E7BA4914",
      title: "Secure Legal Framework",
      desc: "Saudi Ministry compliant transfers",
    },
  ];

  const activities = [
    {
      name: "A. Al-Rashidi",
      action: "transferred a",
      item: "3BR Villa contract",
      time: "2m ago",
    },
    {
      name: "M. Khalid",
      action: "listed a",
      item: "Toyota Camry lease",
      time: "7m ago",
    },
    {
      name: "S. Al-Otaibi",
      action: "completed a",
      item: "commercial shop transfer",
      time: "14m ago",
    },
  ];

  const PulsingDot = () => (
    <Box
      sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "#10753E",
        display: "inline-block",
        mr: 1,
        boxShadow: "0 0 0 0 rgba(16, 117, 62, 0.7)",
        animation: "pulse 1.8s infinite",
        "@keyframes pulse": {
          "0%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(16, 117, 62, 0.7)",
          },
          "70%": {
            transform: "scale(1)",
            boxShadow: "0 0 0 6px rgba(16, 117, 62, 0)",
          },
          "100%": {
            transform: "scale(0.95)",
            boxShadow: "0 0 0 0 rgba(16, 117, 62, 0)",
          },
        },
      }}
    />
  );

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      {/* Left Column: Hero Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", md: "38%" },
          background:
            "linear-gradient(135deg, #013547 0%, #01273A 50%, #010F18 100%)",
          color: COLORS.WHITE,
          p: { xs: 4, sm: 6 },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
          position: { xs: "relative", md: "sticky" },
          top: 0,
          height: { xs: "auto", md: "100vh" },
          minHeight: { xs: "auto", md: "100vh" },
        }}
      >
        {/* Top Text Details */}
        <Box>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "11px",
              color: COLORS.PRIMARY,
              letterSpacing: "1.5px",
              mb: 2,
            }}
          >
            SAUDI ARABIA'S PREMIER PLATFORM
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: { xs: "36px", sm: "44px" },
              lineHeight: { xs: "44px", sm: "52px" },
              color: COLORS.WHITE,
              mb: 3,
            }}
          >
            Find.
            <br />
            Transfer.
            <br />
            Benefit.
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontSize: "14px",
              color: "#A0B7C5",
              lineHeight: "22px",
              mb: 6,
              maxWidth: "380px",
            }}
          >
            Join thousands of Saudis who safely transfer their contracts — from
            real estate and vehicles to subscriptions and commercial leases.
          </Typography>

          {/* Benefits List */}
          <Stack spacing={4}>
            {benefits.map((b, i) => (
              <Stack
                key={i}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: b.bgColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <b.icon sx={{ color: b.iconColor, fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "14px",
                      color: COLORS.WHITE,
                      mb: 0.2,
                    }}
                  >
                    {b.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "12px",
                      color: "#A0B7C5",
                    }}
                  >
                    {b.desc}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Live Activity Card */}
        <Box
          sx={{
            mt: 6,
            p: 2.5,
            borderRadius: "14px",
            backgroundColor: "#ffffff06",
            border: "1px solid #ffffff12",
            backdropFilter: "blur(10px)",
          }}
        >
          <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
            <PulsingDot />
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 700,
                fontSize: "10.5px",
                color: "#A0B7C5",
                letterSpacing: "0.5px",
              }}
            >
              LIVE ACTIVITY
            </Typography>
          </Stack>

          <Stack spacing={1.8}>
            {activities.map((act, idx) => (
              <Stack
                key={idx}
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center" }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: "#ffffff12",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <PersonOutlined sx={{ color: "#A0B7C5", fontSize: 14 }} />
                </Box>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "11px",
                    color: "#A0B7C5",
                    lineHeight: "16px",
                  }}
                >
                  <strong style={{ color: COLORS.WHITE }}>{act.name}</strong>{" "}
                  {act.action}{" "}
                  <span style={{ color: COLORS.WHITE }}>{act.item}</span>{" "}
                  {act.time}
                </Typography>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Box>

      {/* Right Column: Registration Form */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: "#FFFFFF",
          py: { xs: 6, md: 8 },
          px: { xs: 3, sm: 6, md: 10 },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
        }}
      >
        <RegisterForm />
      </Box>
    </Box>
  );
};

export default RegisterLayout;
