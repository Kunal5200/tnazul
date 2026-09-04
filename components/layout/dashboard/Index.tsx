"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  Grid,
  Button,
  Fade,
  Divider,
} from "@mui/material";
import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Apartment,
  DirectionsCar,
  BusinessCenter,
} from "@mui/icons-material";

import WelcomeBanner from "@/components/widgets/dashboard/WelcomeBanner";
import { COLORS, CONTRACT_STATUS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Link from "next/link";
import Category from "./components/Category";
import ProductCard, { ProductCardProps } from "./components/Product-Card";
import {
  useContractList,
  useContractPublicList,
} from "@/hooks/contract/useContractList";
import { useUserDetail } from "@/hooks/user/useUserDetail";
import GalleryHeader, {
  SortOption,
  ViewMode,
} from "./components/GalleryHeader";
import HowItWorks from "./components/HowItWorks";
import TrustAndSecurity from "./components/TrustAndSecurity";

const Dashboard = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  const { userData } = useUserDetail();

  const [apiRequestData, setApiRequstData] = useState({
    page: 1,
    limit: 10,
    // status: CONTRACT_STATUS.APPROVED,
  });

  const {
    loading,
    fetchContractDetails,
    setLoading: setContractLoading,
    contractData,
    setContractData,
  } = useContractList();
  const {
    fetchContractPublicList,
    contractPublicData,
    loading: contractPublicLoading,
    setLoading: setContractPublicLoading,
    setContractPublicData,
  } = useContractPublicList();

  useEffect(() => {
    if (userData) {
      fetchContractDetails(apiRequestData);
    } else {
      fetchContractPublicList(apiRequestData);
    }
  }, [userData]);

  // Advanced filters state
  const [showFilters, setShowFilters] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [filterDocsReady, setFilterDocsReady] = useState(false);

  // Human-readable labels for categories
  const categoryHeaderTitle = useMemo(() => {
    switch (activeCategory) {
      case "real-estate":
        return "Real Estate Contracts";
      case "vehicles":
        return "Vehicle Lease Contracts";
      case "commercial":
        return "Commercial Contracts";
      case "labour":
        return "Labour Contracts";
      case "agriculture":
        return "Agriculture Contracts";
      case "services":
        return "Services Contracts";
      default:
        return "All Contracts";
    }
  }, [activeCategory]);

  // Pre-calculate apiList so we can compute categoryCounts independently of filtering
  const apiList = useMemo(() => {
    return (contractData?.docs || []).map((doc: any) => {
      let category = "real-estate";
      let categoryLabel = "Real Estate";
      let categoryIcon = <Apartment />;

      if (
        doc.contractType?.includes("Vehicle") ||
        doc.category?.includes("Vehicle")
      ) {
        category = "vehicles";
        categoryLabel = "Vehicles";
        categoryIcon = <DirectionsCar />;
      } else if (
        doc.contractType?.includes("Commercial") ||
        doc.category?.includes("Commercial")
      ) {
        category = "commercial";
        categoryLabel = "Commercial";
        categoryIcon = <BusinessCenter />;
      }

      return {
        id: doc._id,
        category: category,
        categoryLabel: categoryLabel,
        categoryIcon: categoryIcon,
        title: doc.contractTitle || "Untitled Contract",
        location: [doc.districtOrNeighborhood, doc.city]
          .filter(Boolean)
          .join(", "),
        totalValue: doc.totalContractValue?.toString() || "0",
        monthlyValue: doc.monthlyAmount?.toString() || "0",
        imageUrl:
          doc.assetImages?.[0] ||
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
        timeLeft: doc.remainingDuration || "0 month",
        views: 0, // Placeholder
        isStarred: false, // Placeholder
        isSaved: doc.isSaved || false,
        isFavoriteInitial: doc.isSaved || false,
        tags: [{ label: "Verified", type: "verified" }],
      };
    });
  }, [contractData?.docs]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: apiList.length };
    apiList.forEach((contract: any) => {
      counts[contract.category] = (counts[contract.category] || 0) + 1;
    });
    return counts;
  }, [apiList]);

  // Handle Filtering and Sorting
  const filteredAndSortedContracts = useMemo(() => {
    // 1. Filter by category
    let list = apiList.filter((contract: any) => {
      if (activeCategory === "all") return true;
      return contract.category === activeCategory;
    });

    // 2. Filter by advanced filters
    if (filterVerified) {
      list = list.filter((c: any) =>
        c.tags?.some((t: any) => t.type === "verified"),
      );
    }
    if (filterUrgent) {
      list = list.filter((c: any) =>
        c.tags?.some((t: any) => t.type === "urgent"),
      );
    }
    if (filterDocsReady) {
      list = list.filter((c: any) =>
        c.tags?.some((t: any) => t.type === "docs-ready"),
      );
    }

    // 3. Sort
    return [...list].sort((a, b) => {
      const valA = parseFloat(a.totalValue.replace(/,/g, ""));
      const valB = parseFloat(b.totalValue.replace(/,/g, ""));

      switch (sortBy) {
        case "price-asc":
          return valA - valB;
        case "price-desc":
          return valB - valA;
        case "views":
          return b.views - a.views;
        case "newest":
        default:
          return 0;
      }
    });
  }, [
    apiList,
    activeCategory,
    filterVerified,
    filterUrgent,
    filterDocsReady,
    sortBy,
  ]);

  return (
    <Box sx={{ pb: 8 }}>
      <WelcomeBanner />

      {/* Category Section */}
      <Box sx={{ mt: 5 }}>
        <Stack
          direction={"row"}
          sx={{ alignItems: "center", justifyContent: "space-between", mb: 2 }}
        >
          <Typography
            sx={{
              color: COLORS.SECONDARY,
              fontSize: "22px",
              fontWeight: 700,
              fontFamily: poppins700.style.fontFamily,
            }}
          >
            Browse by Category
          </Typography>

          {/* Swiper Custom Navigation */}
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={2}>
            <IconButton
              className="category-prev"
              sx={{
                width: 44,
                height: 44,
                backgroundColor: "#0135470F",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#0135471A",
                },
              }}
            >
              <ArrowBackIosNew
                sx={{ color: COLORS.SECONDARY, width: 10, height: 10 }}
              />
            </IconButton>
            <IconButton
              className="category-next"
              sx={{
                width: 44,
                height: 44,
                backgroundColor: "#0135470F",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "#0135471A",
                },
              }}
            >
              <ArrowForwardIos
                sx={{ color: COLORS.SECONDARY, width: 10, height: 10 }}
              />
            </IconButton>
          </Stack>
        </Stack>

        {/* Category Swiper Component */}
        <Category
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          categoryCounts={categoryCounts}
        />
      </Box>

      <GalleryHeader
        categoryHeaderTitle={categoryHeaderTitle}
        totalActiveListings={filteredAndSortedContracts.length}
        viewMode={viewMode}
        setViewMode={(mode) => setViewMode(mode)}
        sortBy={sortBy}
        setSortBy={(sort) => setSortBy(sort)}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filterVerified={filterVerified}
        setFilterVerified={setFilterVerified}
        filterUrgent={filterUrgent}
        setFilterUrgent={setFilterUrgent}
        filterDocsReady={filterDocsReady}
        setFilterDocsReady={setFilterDocsReady}
      />

      {/* Contracts Gallery List / Grid */}
      {filteredAndSortedContracts.length === 0 ? (
        <Box
          sx={{
            py: 8,
            textAlign: "center",
            backgroundColor: "#F4F7F8",
            borderRadius: "28px",
            border: "1px dashed #A0B1B9",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: COLORS.SECONDARY,
              fontFamily: poppins700.style.fontFamily,
              mb: 1,
            }}
          >
            No listings found
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#7A9BAB",
              fontFamily: poppins.style.fontFamily,
            }}
          >
            Try changing your selected category or removing active filter
            checkboxes.
          </Typography>
        </Box>
      ) : (
        <Fade in={true} timeout={400}>
          <Grid container spacing={3}>
            {filteredAndSortedContracts.map((contract) => (
              <Grid
                key={contract.id}
                size={{
                  xs: 12,
                  sm: viewMode === "list" ? 12 : 6,
                  md: viewMode === "list" ? 12 : 4,
                }}
              >
                <ProductCard {...contract} viewMode={viewMode} />
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}

      {/* Center Load More Contracts Divider */}
      <Stack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          mt: 7,
          mb: 9,
          position: "relative",
        }}
      >
        <Divider
          sx={{
            width: "100%",
            borderColor: "#0135470D",
            position: "absolute",
            zIndex: 1,
          }}
        />
        <Link
          href="/dashboard/marketplace"
          passHref
          style={{ textDecoration: "none", zIndex: 2 }}
        >
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "#FFFFFF",
              borderColor: "#0135471F",
              color: COLORS.SECONDARY,
              borderRadius: "100px",
              px: 4,
              py: 1.5,
              fontFamily: poppins700.style.fontFamily,
              fontWeight: 700,
              fontSize: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#F4F7F8",
                borderColor: COLORS.SECONDARY,
              },
            }}
          >
            Load More Contracts
          </Button>
        </Link>
      </Stack>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Foundation of Trust Section */}
      <TrustAndSecurity />
    </Box>
  );
};

export default Dashboard;
