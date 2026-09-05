import React from "react";
import { Box, Button, Chip, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ArrowBackIosNew, FormatListBulleted, GridView, Search } from "@mui/icons-material";
import Link from "next/link";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export interface MarketplaceHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearchKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleApplyFilters: () => void;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
  contractType: string;
  totalCount: number;
  CATEGORIES_LIST: string[];
}

const MarketplaceHeader: React.FC<MarketplaceHeaderProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearchKeyDown,
  handleApplyFilters,
  viewMode,
  setViewMode,
  selectedCategory,
  handleCategoryChange,
  contractType,
  totalCount,
  CATEGORIES_LIST,
}) => {
  return (
    <>
      {/* Header Toolbar */}
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        {/* Back Button */}
        <Link href="/dashboard" passHref style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIosNew sx={{ fontSize: 12 }} />}
            sx={{
              borderRadius: "100px",
              height: 48,
              px: 3,
              borderColor: "#0135471F",
              color: COLORS.SECONDARY,
              textTransform: "none",
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "13.5px",
              "&:hover": {
                borderColor: COLORS.SECONDARY,
                backgroundColor: "rgba(1, 53, 71, 0.02)",
              },
            }}
          >
            Home
          </Button>
        </Link>

        {/* Search Field */}
        <TextField
          placeholder="Search apartments, penthouses, car leases, commercial contracts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          slotProps={{
            input: {
              startAdornment: (
                <Search
                  sx={{
                    color: "#7A9BAB",
                    mr: 1,
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={handleApplyFilters}
                />
              ),
            },
          }}
          sx={{
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              borderRadius: "100px",
              height: "48px",
              fontFamily: poppins.style.fontFamily,
              fontSize: "14px",
              color: COLORS.SECONDARY,
              backgroundColor: "#FFFFFF",
              "& fieldset": { borderColor: "#0135471F" },
              "&:hover fieldset": { borderColor: "#0135473D" },
              "&.Mui-focused fieldset": {
                borderColor: COLORS.SECONDARY,
                borderWidth: "1.5px",
              },
            },
          }}
        />

        {/* View Mode controls */}
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#ffffff",
            border: "1px solid #EDF1F2",
            borderRadius: "16px",
            p: 0.5,
            height: 48,
            boxSizing: "border-box",
            alignItems: "center",
          }}
        >
          <IconButton
            onClick={() => setViewMode("grid")}
            sx={{
              width: 38,
              height: 38,
              borderRadius: "12px",
              backgroundColor:
                viewMode === "grid" ? COLORS.SECONDARY : "transparent",
              color: viewMode === "grid" ? "#ffffff" : "#7A9BAB",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  viewMode === "grid"
                    ? COLORS.SECONDARY
                    : "rgba(1, 53, 71, 0.04)",
              },
            }}
          >
            <GridView sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            onClick={() => setViewMode("list")}
            sx={{
              width: 38,
              height: 38,
              borderRadius: "12px",
              backgroundColor:
                viewMode === "list" ? COLORS.SECONDARY : "transparent",
              color: viewMode === "list" ? "#ffffff" : "#7A9BAB",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor:
                  viewMode === "list"
                    ? COLORS.SECONDARY
                    : "rgba(1, 53, 71, 0.04)",
              },
            }}
          >
            <FormatListBulleted sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Stack>

      {/* Subcategories Horizontal Bar */}
      <Stack
        direction="row"
        spacing={1}
        sx={{
          overflowX: "auto",
          py: 0.5,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Chip
          label="All Categories"
          onClick={() => handleCategoryChange("all")}
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 600,
            fontSize: "13px",
            borderRadius: "100px",
            px: 1,
            py: 2.2,
            backgroundColor:
              selectedCategory === "all" ? COLORS.SECONDARY : "#FFFFFF",
            color: selectedCategory === "all" ? COLORS.WHITE : COLORS.SECONDARY,
            border:
              selectedCategory === "all" ? "none" : "1px solid #0135471A",
            cursor: "pointer",
            "&:hover": {
              backgroundColor:
                selectedCategory === "all" ? "#002432" : "rgba(1, 53, 71, 0.04)",
            },
          }}
        />
        {CATEGORIES_LIST.map((cat) => {
          const isCatSelected = selectedCategory === cat;
          return (
            <Chip
              key={cat}
              label={cat}
              onClick={() => handleCategoryChange(cat)}
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 600,
                fontSize: "13px",
                borderRadius: "100px",
                px: 1,
                py: 2.2,
                backgroundColor: isCatSelected ? COLORS.SECONDARY : "#FFFFFF",
                color: isCatSelected ? COLORS.WHITE : COLORS.SECONDARY,
                border: isCatSelected ? "none" : "1px solid #0135471A",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: isCatSelected
                    ? "#002432"
                    : "rgba(1, 53, 71, 0.04)",
                },
              }}
            />
          );
        })}
      </Stack>

      {/* Title / Counter Row */}
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "baseline" }}
      >
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 800,
            fontSize: "22px",
            color: COLORS.SECONDARY,
          }}
        >
          {contractType === "all"
            ? selectedCategory !== "all"
              ? `${selectedCategory} Contracts`
              : "All Listings"
            : `${contractType} Listings`}
        </Typography>
        <Typography
          sx={{
            fontFamily: poppins.style.fontFamily,
            fontWeight: 500,
            fontSize: "13px",
            color: "#7A9BAB",
          }}
        >
          {totalCount} contract{totalCount !== 1 ? "s" : ""} found
        </Typography>
      </Stack>
    </>
  );
};

export default MarketplaceHeader;
