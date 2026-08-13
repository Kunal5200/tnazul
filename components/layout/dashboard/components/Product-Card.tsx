"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { ProductCardImage } from "./ProductCardImage";
import { ProductCardContent } from "./ProductCardContent";
import { useSaveContract } from "@/hooks/contract/useSaveContract";

export interface ProductCardProps {
  id: string;
  category: string;
  categoryLabel: string;
  categoryIcon: React.ReactNode;
  title: string;
  location: string;
  totalValue: string;
  monthlyValue: string;
  currency?: string;
  imageUrl: string;
  timeLeft: string;
  views: number;
  isStarred?: boolean;
  isFavoriteInitial?: boolean;
  isSaved?: boolean;
  tags?: { label: string; type: "verified" | "docs-ready" | "urgent" }[];
  whatsappAvailable?: boolean;
  viewMode?: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  categoryLabel,
  categoryIcon,
  title,
  location,
  totalValue,
  monthlyValue,
  currency = "SAR",
  imageUrl,
  timeLeft,
  views,
  isStarred = false,
  isFavoriteInitial = false,
  isSaved,
  tags = [],
  whatsappAvailable = false,
  viewMode = "grid",
}) => {
  const initialFavorite = isSaved !== undefined ? isSaved : isFavoriteInitial;
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const { saveContract } = useSaveContract();

  const handleToggleFavorite = async (val?: boolean) => {
    const nextSavedState = typeof val === "boolean" ? val : !isFavorite;
    setIsFavorite(nextSavedState);
    try {
      await saveContract(id, nextSavedState);
    } catch (error) {
      console.error("Failed to save contract:", error);
      setIsFavorite(!nextSavedState);
    }
  };

  if (viewMode === "list") {
    return (
      <Box
        sx={{
          backgroundColor: "#ffffff",
          borderRadius: "28px",
          border: "1px solid #EDF1F2",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
          transform: "translateZ(0)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.06)",
            borderColor: "rgba(1, 53, 71, 0.08)",
          },
        }}
      >
        <ProductCardImage
          imageUrl={imageUrl}
          viewMode={viewMode}
          isStarred={isStarred}
          categoryIcon={categoryIcon}
          categoryLabel={categoryLabel}
          isFavorite={isFavorite}
          setIsFavorite={handleToggleFavorite}
          whatsappAvailable={whatsappAvailable}
          timeLeft={timeLeft}
          customWidth={{ xs: "100%", sm: "240px", md: "280px" }}
        />
        <Box
          sx={{ flexGrow: 1, p: 3, display: "flex", flexDirection: "column" }}
        >
          <ProductCardContent
            id={id}
            title={title}
            location={location}
            totalValue={totalValue}
            monthlyValue={monthlyValue}
            currency={currency}
            tags={tags}
            views={views}
          />
        </Box>
      </Box>
    );
  }

  // Default Grid layout
  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        borderRadius: "28px",
        border: "1px solid #EDF1F2",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        transform: "translateZ(0)",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 12px 30px rgba(1, 53, 71, 0.06)",
          borderColor: "rgba(1, 53, 71, 0.08)",
        },
      }}
    >
      <ProductCardImage
        imageUrl={imageUrl}
        viewMode={viewMode}
        isStarred={isStarred}
        categoryIcon={categoryIcon}
        categoryLabel={categoryLabel}
        isFavorite={isFavorite}
        setIsFavorite={handleToggleFavorite}
        whatsappAvailable={whatsappAvailable}
        timeLeft={timeLeft}
      />
      <Box sx={{ p: 3, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <ProductCardContent
          id={id}
          title={title}
          location={location}
          totalValue={totalValue}
          monthlyValue={monthlyValue}
          currency={currency}
          tags={tags}
          views={views}
        />
      </Box>
    </Box>
  );
};

export default ProductCard;
