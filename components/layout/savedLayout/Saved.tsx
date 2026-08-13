"use client";

import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { SavedCard } from "./components/SavedCard";
import { SavedItem } from "./types";
import { useMySavedContracts } from "@/hooks/contract/useMySavedContracts";
import { useSaveContract } from "@/hooks/contract/useSaveContract";

const SavedLayout = () => {
  const { fetchMySavedContracts, savedList, loading } = useMySavedContracts();
  const { saveContract } = useSaveContract();

  const [savedItems, setSavedItems] = useState<SavedItem[]>([]);

  const isFetchedRef = React.useRef(false);

  useEffect(() => {
    if (isFetchedRef.current) return;
    isFetchedRef.current = true;
    fetchMySavedContracts({ page: 1, pageSize: 10 });
  }, [fetchMySavedContracts]);

  // Map API saved items to UI format
  useEffect(() => {
    if (savedList && savedList.length > 0) {
      const mapped = savedList.map((item: any): SavedItem => {
        const contractObj = item?.contractId || item;

        const rawImg =
          contractObj?.assetImages?.[0] ||
          contractObj?.contractDocuments?.[0] ||
          contractObj?.image ||
          item?.image;

        const image =
          typeof rawImg === "string" && rawImg.trim() !== ""
            ? rawImg
            : "/images/villa_preview.png";

        const totalVal =
          contractObj?.totalContractValue ?? contractObj?.price ?? 0;
        const monthlyVal =
          contractObj?.monthlyAmount ?? contractObj?.monthlyPrice ?? 0;

        const locationParts = [
          contractObj?.city,
          contractObj?.districtOrNeighborhood,
        ].filter(Boolean);

        return {
          id:
            contractObj?._id ||
            contractObj?.id ||
            item?._id ||
            Math.random().toString(),
          title:
            contractObj?.contractTitle ||
            contractObj?.title ||
            contractObj?.contractName ||
            "Saved Contract",
          image,
          location:
            locationParts.length > 0 ? locationParts.join(", ") : "Riyadh",
          price:
            typeof totalVal === "number" ? totalVal.toLocaleString() : totalVal,
          monthlyPrice:
            typeof monthlyVal === "number"
              ? `${monthlyVal.toLocaleString()}/mo`
              : monthlyVal,
          duration:
            contractObj?.remainingDuration || contractObj?.duration || "0 mo",
          isUrgent: Boolean(contractObj?.isUrgent),
        };
      });
      setSavedItems(mapped);
    } else {
      setSavedItems([]);
    }
  }, [savedList]);

  const handleRemove = async (id: string) => {
    // Optimistic removal from UI list
    setSavedItems((prevItems) => prevItems.filter((item) => item.id !== id));
    try {
      await saveContract(id, false);
    } catch (err) {
      console.error("Failed to unsave contract:", err);
      // Refetch list if unsave API call failed
      fetchMySavedContracts({ page: 1, pageSize: 10 });
    }
  };

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
        Saved Contracts{" "}
        <Box component="span" sx={{ fontWeight: 500, color: "#7A9BAB", ml: 0.5 }}>
          ({savedItems.length})
        </Box>
      </Typography>

      {/* Grid of Saved Cards */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress sx={{ color: COLORS.SECONDARY }} />
        </Box>
      ) : savedItems.length > 0 ? (
        <Grid container spacing={3.5}>
          {savedItems.map((item) => (
            <Grid key={item.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <SavedCard item={item} onRemove={handleRemove} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            py: 12,
            textAlign: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: "1px solid #0135470D",
            p: 4,
          }}
        >
          <Typography
            sx={{
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "18px",
              color: COLORS.SECONDARY,
              mb: 1,
            }}
          >
            No Saved Contracts
          </Typography>
          <Typography
            sx={{
              fontFamily: poppins.style.fontFamily,
              fontWeight: 500,
              fontSize: "14px",
              color: "#7A9BAB",
            }}
          >
            Your saved listings and contracts will appear here.
          </Typography>
        </Box>
      )}

      {/* WhatsApp Button floating */}
      <WhatsAppButton />
    </Box>
  );
};

export default SavedLayout;
