"use client";

import {
  Add,
  DescriptionOutlined,
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  VisibilityOutlined,
  AccessTime,
  Check,
  WhatsApp,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

import { useUserDetail } from "@/hooks/user/useUserDetail";

const MyProfileLayout = () => {
  const { userData, loading: userLoading } = useUserDetail();

  // Stepper steps configuration
  const steps = ["Listed", "Interested", "Docs Sent", "Approval", "Done"];

  // Mock data for contracts
  const contracts = [
    {
      title: "3BR Villa - Al Nakheel District",
      image: "/images/villa_preview.png",
      location: "Riyadh",
      price: "2,04,000 SAR",
      views: 342,
      timeLeft: "18 month left",
      activeStepIndex: 1, // Interested
      activeColor: "#8A3FFC", // Purple
      subtext: "Reply to buyer share documents next.",
    },
    {
      title: "Commercial Shop - Al Olaya Tower",
      image: "/images/shop_preview.png",
      location: "Riyadh",
      price: "90,000 SAR",
      views: 521,
      timeLeft: "6 month left",
      activeStepIndex: 2, // Docs Sent
      activeColor: "#ED6C02", // Orange
      subtext: "Buyer is reviewing the contract.",
    },
  ];

  // Mock data for recent activity
  const activities = [
    {
      icon: ChatBubbleOutlineOutlined,
      iconColor: "#166CA9",
      bgColor: "#166CA914",
      text: (
        <>
          <strong>Khalid M.</strong> sent you a message about '3BR Villa - Al Nakheel'
        </>
      ),
      time: "10 min ago",
    },
    {
      icon: FavoriteBorderOutlined,
      iconColor: "#FF5C5C",
      bgColor: "#FF5C5C1A",
      text: (
        <>
          <strong>Sara Al-Otaibi</strong> saved your 'Commercial Shop - Al Olaya' listing
        </>
      ),
      time: "1 hr ago",
    },
    {
      icon: Check,
      iconColor: "#10753E",
      bgColor: "#10753E14",
      text: (
        <>
          Your listing <strong>'Commercial Shop - Al Olaya Tower'</strong> has been approved and is now live.
        </>
      ),
      time: "3 hrs ago",
    },
  ];

  return (
    <Box sx={{ pb: 10, maxWidth: "1200px", margin: "0 auto" }}>
      {/* 1. Header Section */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
          mb: 4,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "13px",
              color: "#7A9BAB",
              textTransform: "capitalize",
              mb: 0.5,
            }}
          >
            {userLoading ? "Loading profile..." : `Welcome back (${userData?.email || userData?.roleName || "User"})`}
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "26px",
              color: COLORS.SECONDARY,
            }}
          >
            {userData?.name || "-"}

          </Typography>
        </Box>


        <Link href="/dashboard/contracts/create" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            disableElevation
            startIcon={<Add sx={{ color: COLORS.WHITE }} />}
            sx={{
              backgroundColor: COLORS.SECONDARY,
              color: COLORS.WHITE,
              borderRadius: "100px",
              px: 3,
              height: "46px",
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              "&:hover": {
                backgroundColor: "#002432",
              },
            }}
          >
            List Contract
          </Button>
        </Link>
      </Stack>

      {/* 2. Metrics Row */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* Metric 1: Active Listings */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              border: "1px solid #0135470D",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#EEF6FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2.5,
              }}
            >
              <DescriptionOutlined sx={{ color: "#166CA9", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#7A9BAB",
                  mb: 0.5,
                }}
              >
                Active Listings
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  lineHeight: 1,
                }}
              >
                2
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Metric 2: Unread Messages */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              border: "1px solid #0135470D",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#EEF6FA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2.5,
              }}
            >
              <ChatBubbleOutlineOutlined sx={{ color: "#166CA9", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#7A9BAB",
                  mb: 0.5,
                }}
              >
                Unread Messages
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  lineHeight: 1,
                }}
              >
                1
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Metric 3: Saved Contracts */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              border: "1px solid #0135470D",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#FDF0F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2.5,
              }}
            >
              <FavoriteBorderOutlined sx={{ color: "#FF5C5C", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#7A9BAB",
                  mb: 0.5,
                }}
              >
                Saved Contracts
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  lineHeight: 1,
                }}
              >
                3
              </Typography>
            </Box>
          </Box>
        </Grid>

        {/* Metric 4: Total Views */}
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              border: "1px solid #0135470D",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#FEF8EC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2.5,
              }}
            >
              <VisibilityOutlined sx={{ color: "#E7BA49", fontSize: 24 }} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#7A9BAB",
                  mb: 0.5,
                }}
              >
                Total Views
              </Typography>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontSize: "28px",
                  fontWeight: 700,
                  color: COLORS.SECONDARY,
                  lineHeight: 1,
                }}
              >
                863
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* 3. My Active Contracts Section */}
      <Box sx={{ mb: 5 }}>
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2.5,
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "18px",
              color: COLORS.SECONDARY,
            }}
          >
            My Active Contracts
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "13px",
              color: "#166CA9",
              cursor: "pointer",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            View all
          </Typography>
        </Stack>

        {/* Contract list cards */}
        {contracts.map((c, idx) => (
          <Box
            key={idx}
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 2.5,
              mb: 3,
              border: "1px solid #0135470D",
              boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
            }}
          >
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              {/* Product Image */}
              <Box
                sx={{
                  width: { xs: "100%", md: 120 },
                  height: 90,
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </Box>

              {/* Product Info & Stepper */}
              <Box sx={{ flexGrow: 1 }}>
                {/* Title & Badge */}
                <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1 }}>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: COLORS.SECONDARY,
                    }}
                  >
                    {c.title}
                  </Typography>
                  <Box
                    sx={{
                      backgroundColor: "#10753E14",
                      color: "#10753E",
                      borderRadius: "6px",
                      px: 1,
                      py: 0.2,
                      fontSize: "11px",
                      fontWeight: 700,
                      fontFamily: poppins.style.fontFamily,
                    }}
                  >
                    Active
                  </Box>
                </Stack>

                {/* Subtitle details */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={{ xs: 1, sm: 3 }}
                  sx={{
                    alignItems: { xs: "flex-start", sm: "center" },
                    mb: 2.5,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "12.5px",
                      color: "#7A9BAB",
                    }}
                  >
                    {c.location}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "12.5px",
                      color: "#7A9BAB",
                    }}
                  >
                    {c.price}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                    <VisibilityOutlined sx={{ color: "#7A9BAB", fontSize: 16 }} />
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "12.5px",
                        color: "#7A9BAB",
                      }}
                    >
                      {c.views}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                    <AccessTime sx={{ color: "#7A9BAB", fontSize: 16 }} />
                    <Typography
                      sx={{
                        fontFamily: poppins.style.fontFamily,
                        fontSize: "12.5px",
                        color: "#7A9BAB",
                      }}
                    >
                      {c.timeLeft}
                    </Typography>
                  </Stack>
                </Stack>

                {/* Stepper Status Tracking Bar */}
                <Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{
                      alignItems: "center",
                      flexWrap: "wrap",
                      rowGap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    {steps.map((step, sIdx) => {
                      const isCurrentActive = sIdx === c.activeStepIndex;
                      const isPassed = sIdx < c.activeStepIndex;

                      return (
                        <React.Fragment key={sIdx}>
                          {/* Step Chip */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              height: "28px",
                              borderRadius: "100px",
                              px: 1.8,
                              py: 0.5,
                              backgroundColor: isCurrentActive ? c.activeColor : "#F4F7F8",
                              border: "1px solid",
                              borderColor: isCurrentActive ? c.activeColor : "#0135470D",
                            }}
                          >
                            <Check
                              sx={{
                                color: isCurrentActive ? COLORS.WHITE : "#7A9BAB",
                                fontSize: 14,
                                mr: 0.5,
                              }}
                            />
                            <Typography
                              sx={{
                                fontFamily: poppins.style.fontFamily,
                                fontWeight: 600,
                                fontSize: "11px",
                                color: isCurrentActive ? COLORS.WHITE : "#7A9BAB",
                              }}
                            >
                              {step}
                            </Typography>
                          </Box>

                          {/* Line Connector (except for last step) */}
                          {sIdx < steps.length - 1 && (
                            <Box
                              sx={{
                                width: 24,
                                height: "1px",
                                backgroundColor: "#01354714",
                              }}
                            />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </Stack>

                  {/* Subtext */}
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "12px",
                      fontWeight: 600,
                      color: c.activeColor,
                    }}
                  >
                    {c.subtext}
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>

      {/* 4. Recent Activity Section */}
      <Box>
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "18px",
            color: COLORS.SECONDARY,
            mb: 2.5,
          }}
        >
          Recent Activity
        </Typography>

        <Stack spacing={1.5}>
          {activities.map((act, idx) => (
            <Box
              key={idx}
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                p: 2,
                border: "1px solid #0135470D",
                display: "flex",
                alignItems: "center",
                boxShadow: "0px 4px 10px rgba(1, 53, 71, 0.01)",
              }}
            >
              {/* Icon Container */}
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  backgroundColor: act.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <act.icon sx={{ color: act.iconColor, fontSize: 18 }} />
              </Box>

              {/* Text & Time */}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "13px",
                    color: COLORS.SECONDARY,
                    lineHeight: "18px",
                  }}
                >
                  {act.text}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "11px",
                    color: "#7A9BAB",
                    mt: 0.5,
                  }}
                >
                  {act.time}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* 5. Floating WhatsApp Widget */}
      <Box
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1200,
        }}
      >
        <Button
          variant="contained"
          startIcon={<WhatsApp sx={{ color: COLORS.WHITE }} />}
          sx={{
            backgroundColor: "#25D366",
            color: COLORS.WHITE,
            borderRadius: "100px",
            px: 3,
            py: 1.5,
            textTransform: "none",
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            boxShadow: "0px 8px 24px rgba(37, 211, 102, 0.3)",
            "&:hover": {
              backgroundColor: "#128C7E",
            },
          }}
        >
          Chat with Us
        </Button>
      </Box>
    </Box>
  );
};

export default MyProfileLayout;
