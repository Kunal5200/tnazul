"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  DescriptionOutlined,
  ChatBubbleOutlineOutlined,
  ShareOutlined,
  AccessTimeOutlined,
  CheckCircleOutlined,
} from "@mui/icons-material";
import { COLORS, CONTRACT_STATUS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { ContractCard } from "./components/ContractCard";
import { ContractItem } from "./types";
import { useMyContracts } from "@/hooks/contract/useMyContracts";

const MyContractsLayout = () => {
  const [activeTab, setActiveTab] = useState<"active" | "draft" | "expired">(
    "active",
  );

  const { fetchMyContracts, myContractsList, loading } = useMyContracts();

  const fetchedStatusRef = React.useRef<string | null>(null);

  useEffect(() => {
    const statusQuery =
      activeTab === "active"
        ? CONTRACT_STATUS.PUBLISHED
        : activeTab === "draft"
          ? CONTRACT_STATUS.DRAFT
          : "Expired";

    if (fetchedStatusRef.current === statusQuery) return;
    fetchedStatusRef.current = statusQuery;

    fetchMyContracts({ page: 1, limit: 10, status: statusQuery });
  }, [activeTab, fetchMyContracts]);

  // Helper to map API contract object to UI ContractItem using exact API schema keys
  const mapApiContractToItem = (item: any): ContractItem => {
    const rawStatus = (
      item?.contractStatus ||
      item?.status ||
      "Approved"
    ).toLowerCase();

    const status: "active" | "draft" | "expired" =
      rawStatus === "approved" || rawStatus === "active"
        ? "active"
        : rawStatus === "draft" || rawStatus === "pending"
          ? "draft"
          : "expired";

    const title =
      item?.contractTitle ||
      item?.title ||
      item?.contractName ||
      item?.assetType ||
      (item?.category ? `${item.category} Contract` : "Contract");

    const locationParts = [item?.city, item?.districtOrNeighborhood].filter(
      Boolean,
    );
    const location =
      locationParts.length > 0 ? locationParts.join(", ") : "Riyadh";

    const val = item?.totalContractValue ?? item?.price;
    const currency = item?.currency || "SAR";
    const price =
      val !== undefined && val !== null
        ? `${Number(val).toLocaleString()} ${currency}`
        : "0 SAR";

    const monthlyAmount =
      item?.monthlyAmount !== undefined && item?.monthlyAmount !== null
        ? `${Number(item.monthlyAmount).toLocaleString()} ${currency}/mo`
        : undefined;

    const rawImg =
      item?.assetImages?.[0] || item?.contractDocuments?.[0] || item?.image;

    const image =
      typeof rawImg === "string" && rawImg.trim() !== ""
        ? rawImg
        : item?.category === "Villa"
          ? "/images/villa_preview.png"
          : "/images/shop_preview.png";

    const timeLeft = item?.remainingDuration
      ? `${item.remainingDuration} left`
      : item?.timeLeft || undefined;

    return {
      id: item?._id || item?.id || Math.random().toString(),
      title,
      image,
      status,
      contractStatus: item?.contractStatus || item?.status,
      location,
      price,
      views: item?.views || item?.viewCount || 0,
      timeLeft,
      contractNumber: item?.contractNumber,
      contractType: item?.contractType,
      category: item?.category,
      monthlyAmount,
      currency,
      subtext: item?.contractDescription || item?.subtext || undefined,
      steps: [
        {
          label: "Listed",
          icon: (isActive) => (
            <DescriptionOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: true,
          color: "#166CA9",
        },
        {
          label: "Interested",
          icon: (isActive) => (
            <ChatBubbleOutlineOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: true,
          color: "#8A3FFC",
        },
        {
          label: "Docs Sent",
          icon: (isActive) => (
            <ShareOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: rawStatus === "approved" || rawStatus === "active",
          color: "#ED6C02",
        },
        {
          label: "Approval",
          icon: (isActive) => (
            <AccessTimeOutlined
              sx={{ fontSize: 15, color: isActive ? "#FFFFFF" : "#7A9BAB" }}
            />
          ),
          isActive: rawStatus === "approved",
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
    };
  };

  // Map API list to UI items
  const apiMappedContracts = myContractsList.map(mapApiContractToItem);

  const activeCount = activeTab === "active" ? apiMappedContracts.length : 0;
  const draftCount = activeTab === "draft" ? apiMappedContracts.length : 0;
  const expiredCount = activeTab === "expired" ? apiMappedContracts.length : 0;

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
          {`Active (${activeTab === "active" ? apiMappedContracts.length : 0})`}
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
          {`Draft (${activeTab === "draft" ? apiMappedContracts.length : 0})`}
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
          {`Expired (${activeTab === "expired" ? apiMappedContracts.length : 0})`}
        </Button>
      </Box>

      {/* Contracts List container */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress sx={{ color: COLORS.SECONDARY }} />
        </Box>
      ) : apiMappedContracts.length > 0 ? (
        <Stack spacing={4}>
          {apiMappedContracts.map((contract) => (
            <ContractCard key={contract.id} contract={contract} />
          ))}
        </Stack>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            py: 8,
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            p: 5,
            border: "1px solid #0135470D",
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              color: "#7A9BAB",
              fontSize: "15px",
            }}
          >
            No contracts found.
          </Typography>
        </Box>
      )}

      {/* Floating Action WhatsApp trigger */}
      <WhatsAppButton />
    </Box>
  );
};

export default MyContractsLayout;
