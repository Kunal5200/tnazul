"use client";

import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import {
  DescriptionOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
  AccessTimeOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { ContractCard } from "./components/ContractCard";
import { ContractItem } from "./types";

const MyContractsLayout = () => {
  const [activeTab, setActiveTab] = useState<"active" | "draft" | "expired">(
    "active",
  );

  // Mock contracts data using only local images
  const mockContracts: ContractItem[] = [
    {
      id: "c1",
      title: "3BR Villa - Al Nakheel District",
      image: "/images/villa_preview.png",
      status: "active",
      location: "Riyadh",
      price: "2,04,000 SAR",
      views: 342,
      timeLeft: "18 mo left",
      subtext: "Reply to buyer share documents next.",
      subtextColor: "#8A3FFC", // Purple
      steps: [
        {
          label: "Listed",
          icon: (isActive) => (
            <DescriptionOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: true,
          color: "#166CA9", // Blue
        },
        {
          label: "Interested",
          icon: (isActive) => (
            <ChatBubbleOutlineOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: true,
          color: "#8A3FFC", // Purple
        },
        {
          label: "Docs Sent",
          icon: (isActive) => (
            <ShareOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: false,
          color: "#ED6C02",
        },
        {
          label: "Approval",
          icon: (isActive) => (
            <AccessTimeOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: false,
          color: COLORS.SECONDARY,
        },
        {
          label: "Done",
          icon: (isActive) => (
            <CheckCircleOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: false,
          color: "#10753E",
        },
      ],
    },
    {
      id: "c2",
      title: "Commercial Shop - Al Olaya Tower",
      image: "/images/shop_preview.png",
      status: "active",
      location: "Riyadh",
      price: "90,000 SAR",
      views: 521,
      timeLeft: "6 mo left",
      subtext: "Buyer is reviewing the contract.",
      subtextColor: "#ED6C02", // Orange
      steps: [
        {
          label: "Listed",
          icon: (isActive) => (
            <DescriptionOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: true,
          color: "#166CA9", // Blue
        },
        {
          label: "Interested",
          icon: (isActive) => (
            <ChatBubbleOutlineOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: false,
          color: "#8A3FFC",
        },
        {
          label: "Docs Sent",
          icon: (isActive) => (
            <ShareOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: true,
          color: "#ED6C02", // Orange
        },
        {
          label: "Approval",
          icon: (isActive) => (
            <AccessTimeOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: false,
          color: COLORS.SECONDARY,
        },
        {
          label: "Done",
          icon: (isActive) => (
            <CheckCircleOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: false,
          color: "#10753E",
        },
      ],
    },
    {
      id: "c3",
      title: "Toyota Camry 2022 - Full Lease",
      image: "/images/shop_preview.png", // Local preview fallback instead of unsplash
      status: "draft",
      location: "Jeddah",
      price: "48,000 SAR",
      views: 94,
    },
    {
      id: "c4",
      title: "Office Suite - King Fahd Road",
      image: "/images/villa_preview.png", // Local preview fallback instead of unsplash
      status: "expired",
      location: "Riyadh",
      price: "72,000 SAR",
      views: 189,
    },
  ];

  // Filtering counts
  const activeCount = mockContracts.filter((c) => c.status === "active").length;
  const draftCount = mockContracts.filter((c) => c.status === "draft").length;
  const expiredCount = mockContracts.filter(
    (c) => c.status === "expired",
  ).length;

  // Filter list
  const filteredContracts = mockContracts.filter((c) => c.status === activeTab);

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
        My Contracts
      </Typography>

      {/* Tabs Row Wrapper */}
      <Box
        sx={{
          backgroundColor: "#EDF1F2",
          borderRadius: "14px",
          p: "6px",
          display: "inline-flex",
          gap: 0.5,
          mb: 5,
        }}
      >
        {/* Active Tab Button */}
        <Button
          onClick={() => setActiveTab("active")}
          disableElevation
          sx={{
            borderRadius: "10px",
            py: 1.25,
            px: 3.5,
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "none",
            backgroundColor:
              activeTab === "active" ? COLORS.SECONDARY : "transparent",
            color: activeTab === "active" ? COLORS.WHITE : "#5A7A8A",
            "&:hover": {
              backgroundColor:
                activeTab === "active" ? "#002432" : "rgba(1, 53, 71, 0.04)",
            },
          }}
        >
          {`Active (${activeCount})`}
        </Button>

        {/* Draft Tab Button */}
        <Button
          onClick={() => setActiveTab("draft")}
          disableElevation
          sx={{
            borderRadius: "10px",
            py: 1.25,
            px: 3.5,
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "none",
            backgroundColor:
              activeTab === "draft" ? COLORS.SECONDARY : "transparent",
            color: activeTab === "draft" ? COLORS.WHITE : "#5A7A8A",
            "&:hover": {
              backgroundColor:
                activeTab === "draft" ? "#002432" : "rgba(1, 53, 71, 0.04)",
            },
          }}
        >
          {`Draft (${draftCount})`}
        </Button>

        {/* Expired Tab Button */}
        <Button
          onClick={() => setActiveTab("expired")}
          disableElevation
          sx={{
            borderRadius: "10px",
            py: 1.25,
            px: 3.5,
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "14px",
            textTransform: "none",
            backgroundColor:
              activeTab === "expired" ? COLORS.SECONDARY : "transparent",
            color: activeTab === "expired" ? COLORS.WHITE : "#5A7A8A",
            "&:hover": {
              backgroundColor:
                activeTab === "expired" ? "#002432" : "rgba(1, 53, 71, 0.04)",
            },
          }}
        >
          {`Expired (${expiredCount})`}
        </Button>
      </Box>

      {/* Contracts List container */}
      <Stack spacing={4}>
        {filteredContracts.map((contract) => (
          <ContractCard key={contract.id} contract={contract} />
        ))}
      </Stack>

      {/* Floating Action WhatsApp trigger */}
      <WhatsAppButton />
    </Box>
  );
};

export default MyContractsLayout;
