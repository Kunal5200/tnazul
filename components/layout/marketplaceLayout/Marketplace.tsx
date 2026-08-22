"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Grid,
  TextField,
  Slider,
  Collapse,
  Skeleton,
  Pagination,
  Chip,
} from "@mui/material";
import {
  ArrowBackIosNew,
  Search,
  GridView,
  FormatListBulleted,
  ExpandLess,
  ExpandMore,
  Apartment,
  DirectionsCar,
  BusinessCenter,
  FitnessCenter,
  Tune,
} from "@mui/icons-material";
import Link from "next/link";
import { COLORS, CONTRACT_STATUS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import ProductCard, {
  ProductCardProps,
} from "@/components/layout/dashboard/components/Product-Card";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import LogoBox from "@/components/widgets/Sidebar/components/LogoBox";
import { useContractList } from "@/hooks/contract/useContractList";
import { GET_API_REQUEST_RESPONSE } from "@/utils/types";

// Custom type representing the contract item
type ContractType = Omit<ProductCardProps, "viewMode">;

const CATEGORIES_LIST = [
  "Penthouse",
  "Apartment",
  "Villa",
  "Land",
  "Building",
  "Office",
];

const MarketplaceLayout = () => {
  // Advanced filters state
  const [contractType, setContractType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([1000, 250000]);
  const [duration, setDuration] = useState<string>("all");

  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [isCityExpanded, setIsCityExpanded] = useState<boolean>(true);

  // Search & view mode states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<
    "newest" | "price-asc" | "price-desc" | "views"
  >("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  const { loading, fetchContractDetails, contractData } = useContractList();

  // Helper to build the API payload according to specifications
  const buildFilterPayload = useCallback(
    (pageNumber: number = 1): GET_API_REQUEST_RESPONSE => {
      const payload: GET_API_REQUEST_RESPONSE = {
        page: pageNumber,
        limit: pageSize,
      };

      // 1. Contract Type
      if (contractType !== "all") {
        const typeMap: Record<string, string> = {
          "real-estate": "Real Estate",
          "vehicles": "Vehicles",
          "commercial": "Commercial",
          "Real Estate": "Real Estate",
          "Vehicles": "Vehicles",
          "Commercial": "Commercial",
        };
        payload.contractType = typeMap[contractType] || contractType;
      }

      // 2. Category
      if (selectedCategory !== "all") {
        payload.category = selectedCategory;
      }

      // 3. Price Range
      if (priceRange[0] > 1000) {
        payload.minPrice = priceRange[0];
      }
      if (priceRange[1] < 250000) {
        payload.maxPrice = priceRange[1];
      }

      // 4. Contract Duration
      if (duration !== "all") {
        if (duration === "< 6 Months") {
          payload.minDuration = 0;
          payload.maxDuration = 6;
        } else if (duration === "6-12 Months" || duration === "6–12 Months") {
          payload.minDuration = 6;
          payload.maxDuration = 12;
        } else if (duration === "1-2 Years" || duration === "1–2 Years") {
          payload.minDuration = 12;
          payload.maxDuration = 24;
        } else if (duration === "2+ Years") {
          payload.minDuration = 24;
        }
      }



      // 6. City
      if (selectedCity !== "all") {
        payload.city = selectedCity;
      }

      // 7. Search
      if (searchTerm.trim()) {
        payload.search = searchTerm.trim();
      }

      // 8. Categories list to get category count in api
      if (selectedCategory !== "all") {
        payload.categories = [selectedCategory];
      } else {
        payload.categories = CATEGORIES_LIST;
      }

      return payload;
    },
    [
      contractType,
      selectedCategory,
      priceRange,
      duration,
      selectedCity,
      searchTerm,
      pageSize,
    ]
  );

  // Initial fetch on mount
  useEffect(() => {
    const initialPayload = buildFilterPayload(1);
    fetchContractDetails(initialPayload);
  }, []);

  // Apply filters handler triggered by user clicking "Apply Filters"
  const handleApplyFilters = () => {
    setCurrentPage(1);
    const payload = buildFilterPayload(1);
    fetchContractDetails(payload);
  };

  // Reset all filters back to defaults
  const handleResetFilters = () => {
    setContractType("all");
    setSelectedCategory("all");
    setPriceRange([1000, 250000]);
    setDuration("all");
    setSelectedCity("all");
    setSearchTerm("");
    setCurrentPage(1);

    const resetPayload: GET_API_REQUEST_RESPONSE = {
      page: 1,
      limit: pageSize,
      categories: CATEGORIES_LIST,
    };
    fetchContractDetails(resetPayload);
  };

  // Search submit handler (on Enter or submit)
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleApplyFilters();
    }
  };

  // Pagination handler
  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    const payload = buildFilterPayload(value);
    fetchContractDetails(payload);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map API response data to ContractType
  const apiContracts: ContractType[] = useMemo(() => {
    const docs = Array.isArray(contractData)
      ? contractData
      : contractData?.docs || contractData?.contracts || contractData?.data || [];

    if (!docs || docs.length === 0) return [];

    return docs.map((item: any) => {
      let catIcon = <Apartment />;
      const catLower = (item.category || item.contractType || "").toLowerCase();
      let categoryId = "real-estate";

      if (catLower.includes("vehicle") || catLower.includes("car")) {
        catIcon = <DirectionsCar />;
        categoryId = "vehicles";
      } else if (catLower.includes("commercial")) {
        catIcon = <BusinessCenter />;
        categoryId = "commercial";
      } else if (catLower.includes("subscription")) {
        catIcon = <FitnessCenter />;
        categoryId = "commercial";
      }

      return {
        id: item._id,
        category: categoryId,
        categoryLabel: item.category || item.contractType || "Real Estate",
        categoryIcon: catIcon,
        title: item.contractTitle,
        location:
          `${item.city || ""}, ${item.districtOrNeighborhood || ""}`.replace(
            /^, | , $/g,
            ""
          ),
        totalValue: item.totalContractValue?.toString() || "0",
        monthlyValue: item.monthlyAmount?.toString() || "0",
        imageUrl: item.assetImages?.[0] || "/images/villa_preview.png",
        timeLeft: item.remainingDuration || "N/A",
        views: 0,
        isStarred: false,
        tags:
          item.contractStatus === CONTRACT_STATUS.APPROVED ||
          item.status === CONTRACT_STATUS.APPROVED
            ? [{ label: "Verified", type: "verified" }]
            : [],
      };
    });
  }, [contractData]);

  // Client-side Sorting
  const filteredAndSortedContracts = useMemo(() => {
    return [...apiContracts].sort((a, b) => {
      const valA = parseFloat(a.totalValue.replace(/,/g, ""));
      const valB = parseFloat(b.totalValue.replace(/,/g, ""));
      if (sortBy === "price-asc") return valA - valB;
      if (sortBy === "price-desc") return valB - valA;
      if (sortBy === "views") return b.views - a.views;
      return parseInt(b.id || "0") - parseInt(a.id || "0");
    });
  }, [apiContracts, sortBy]);

  // Active filters count computation
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (contractType !== "all") count++;
    if (selectedCategory !== "all") count++;
    if (priceRange[0] > 1000 || priceRange[1] < 250000) count++;
    if (duration !== "all") count++;
    if (selectedCity !== "all") count++;
    if (searchTerm.trim().length > 0) count++;
    return count;
  }, [
    contractType,
    selectedCategory,
    priceRange,
    duration,
    selectedCity,
    searchTerm,
  ]);

  const totalPages = contractData?.totalPages || 1;
  const totalCount =
    contractData?.totalDocs ||
    contractData?.total ||
    filteredAndSortedContracts.length;

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#F9F8F6EB" }}>
      <Grid container spacing={4}>
        {/* Left Column: Logo & Filter Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <Stack spacing={3}>
            {/* Tnazul Logo & Back Chevron Arrow */}
            <LogoBox />

            {/* Filter Contracts Container */}
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 3,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              {/* Sidebar Header */}
              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: "center", mb: 3.5 }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    backgroundColor: "rgba(1, 53, 71, 0.04)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Tune sx={{ color: COLORS.SECONDARY, fontSize: 18 }} />
                </Box>
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "16px",
                      color: COLORS.SECONDARY,
                      lineHeight: 1.1,
                    }}
                  >
                    Filter Contracts
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#7A9BAB",
                      mt: 0.2,
                    }}
                  >
                    {activeFiltersCount} filter
                    {activeFiltersCount !== 1 ? "s" : ""} active
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={4}>
                {/* Filter: Contract Type */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13.5px",
                      color: COLORS.SECONDARY,
                      mb: 2,
                    }}
                  >
                    Contract Type
                  </Typography>
                  <Stack
                    direction="row"
                    useFlexGap
                    sx={{ flexWrap: "wrap", gap: 1 }}
                  >
                    {[
                      { id: "all", label: "All" },
                      { id: "real-estate", label: "Real Estate" },
                      { id: "vehicles", label: "Vehicles" },
                      { id: "commercial", label: "Commercial" },
                    ].map((type) => {
                      const isSelected =
                        contractType === type.id ||
                        contractType === type.label;
                      return (
                        <Button
                          key={type.id}
                          onClick={() =>
                            setContractType(isSelected ? "all" : type.label)
                          }
                          sx={{
                            borderRadius: "100px",
                            fontSize: "12px",
                            fontWeight: 700,
                            textTransform: "none",
                            py: 0.6,
                            px: 2,
                            backgroundColor: isSelected
                              ? COLORS.SECONDARY
                              : "transparent",
                            color: isSelected ? COLORS.WHITE : "#7A9BAB",
                            border: isSelected
                              ? "1.38px solid transparent"
                              : "1.38px solid #0135471F",
                            "&:hover": {
                              backgroundColor: isSelected
                                ? "#002432"
                                : "#01354705",
                            },
                          }}
                        >
                          {type.label}
                        </Button>
                      );
                    })}
                  </Stack>
                </Box>

                {/* Filter: Price Range (SAR) */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13.5px",
                      color: COLORS.SECONDARY,
                      mb: 2,
                    }}
                  >
                    Price Range (SAR)
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1.5}
                    sx={{ alignItems: "center", mb: 2.5 }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#F4F7F8",
                        borderRadius: "12px",
                        px: 2,
                        py: 1.2,
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "14px",
                          color: COLORS.SECONDARY,
                        }}
                      >
                        {priceRange[0].toLocaleString()}
                      </Typography>
                    </Box>
                    <Typography sx={{ color: "#7A9BAB", fontWeight: 700 }}>
                      –
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: "#F4F7F8",
                        borderRadius: "12px",
                        px: 2,
                        py: 1.2,
                        flexGrow: 1,
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: poppins700.style.fontFamily,
                          fontWeight: 700,
                          fontSize: "14px",
                          color: COLORS.SECONDARY,
                        }}
                      >
                        {priceRange[1].toLocaleString()}
                      </Typography>
                    </Box>
                  </Stack>

                  <Slider
                    value={priceRange}
                    onChange={(_, val) => setPriceRange(val as number[])}
                    min={1000}
                    max={250000}
                    step={5000}
                    valueLabelDisplay="auto"
                    sx={{
                      color: COLORS.SECONDARY,
                      "& .MuiSlider-thumb": {
                        width: 20,
                        height: 20,
                        backgroundColor: "#FFFFFF",
                        border: `3px solid ${COLORS.SECONDARY}`,
                        "&:hover, &.Mui-focusVisible": {
                          boxShadow: "0px 0px 0px 8px rgba(1, 53, 71, 0.08)",
                        },
                      },
                      "& .MuiSlider-track": {
                        height: 5,
                        backgroundColor: COLORS.SECONDARY,
                      },
                      "& .MuiSlider-rail": {
                        height: 5,
                        backgroundColor: "#EDF1F2",
                      },
                    }}
                  />
                </Box>

                {/* Filter: Duration */}
                <Box>
                  <Typography
                    sx={{
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13.5px",
                      color: COLORS.SECONDARY,
                      mb: 2,
                    }}
                  >
                    Contract Duration
                  </Typography>
                  <Grid container spacing={1}>
                    {["< 6 Months", "6–12 Months", "1–2 Years", "2+ Years"].map(
                      (dur) => {
                        const normalized = dur.replace("–", "-");
                        const isSelected =
                          duration === dur || duration === normalized;
                        return (
                          <Grid key={dur} size={6}>
                            <Button
                              fullWidth
                              onClick={() =>
                                setDuration(isSelected ? "all" : normalized)
                              }
                              sx={{
                                borderRadius: "100px",
                                fontSize: "12px",
                                fontWeight: 700,
                                textTransform: "none",
                                py: 0.9,
                                backgroundColor: isSelected
                                  ? COLORS.SECONDARY
                                  : "transparent",
                                color: isSelected ? COLORS.WHITE : "#7A9BAB",
                                border: isSelected
                                  ? "1.38px solid transparent"
                                  : "1.38px solid #0135471F",
                                "&:hover": {
                                  backgroundColor: isSelected
                                    ? "#002432"
                                    : "#01354705",
                                },
                              }}
                            >
                              {dur}
                            </Button>
                          </Grid>
                        );
                      }
                    )}
                  </Grid>
                </Box>



                {/* Filter: Saudi Cities */}
                <Box>
                  <Button
                    fullWidth
                    onClick={() => setIsCityExpanded(!isCityExpanded)}
                    endIcon={isCityExpanded ? <ExpandLess /> : <ExpandMore />}
                    sx={{
                      justifyContent: "space-between",
                      px: 0,
                      textTransform: "none",
                      fontFamily: poppins700.style.fontFamily,
                      fontWeight: 700,
                      fontSize: "13.5px",
                      color: COLORS.SECONDARY,
                      "&:hover": { backgroundColor: "transparent" },
                    }}
                  >
                    Saudi Cities / Districts
                  </Button>
                  <Collapse in={isCityExpanded}>
                    <Grid container spacing={1} sx={{ mt: 1.5 }}>
                      {[
                        "Riyadh",
                        "Jeddah",
                        "Dammam",
                        "Mecca",
                        "Medina",
                        "Khobar",
                      ].map((city) => {
                        const isSelected = selectedCity === city;
                        return (
                          <Grid key={city} size={6}>
                            <Button
                              fullWidth
                              onClick={() =>
                                setSelectedCity(isSelected ? "all" : city)
                              }
                              sx={{
                                borderRadius: "100px",
                                fontSize: "12px",
                                fontWeight: 700,
                                textTransform: "none",
                                py: 0.9,
                                backgroundColor: isSelected
                                  ? COLORS.SECONDARY
                                  : "transparent",
                                color: isSelected ? COLORS.WHITE : "#7A9BAB",
                                border: isSelected
                                  ? "1.38px solid transparent"
                                  : "1.38px solid #0135471F",
                                "&:hover": {
                                  backgroundColor: isSelected
                                    ? "#002432"
                                    : "#01354705",
                                },
                              }}
                            >
                              {city}
                            </Button>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Collapse>
                </Box>

                {/* Sidebar Action Buttons */}
                <Stack direction="row" spacing={2} sx={{ mt: 2.5 }}>
                  <Button
                    fullWidth
                    onClick={handleResetFilters}
                    sx={{
                      borderRadius: "12px",
                      border: "1.38px solid #0135471F",
                      color: COLORS.SECONDARY,
                      fontSize: "13px",
                      fontWeight: 700,
                      fontFamily: poppins700.style.fontFamily,
                      textTransform: "none",
                      py: 1.25,
                      "&:hover": {
                        backgroundColor: "rgba(1, 53, 71, 0.03)",
                      },
                    }}
                  >
                    Reset All
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    disableElevation
                    onClick={handleApplyFilters}
                    sx={{
                      borderRadius: "12px",
                      backgroundColor: COLORS.SECONDARY,
                      color: COLORS.WHITE,
                      fontSize: "13px",
                      fontWeight: 700,
                      fontFamily: poppins700.style.fontFamily,
                      textTransform: "none",
                      py: 1.25,
                      "&:hover": {
                        backgroundColor: "#002432",
                      },
                    }}
                  >
                    Apply Filters ({activeFiltersCount})
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Grid>

        {/* Right Column: Content Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack spacing={3.5}>
            {/* Header Toolbar */}
            <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
              {/* Back Button */}
              <Link
                href="/dashboard"
                passHref
                style={{ textDecoration: "none" }}
              >
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
                onClick={() => {
                  setSelectedCategory("all");
                  setCurrentPage(1);
                  const p = {
                    ...buildFilterPayload(1),
                    category: undefined,
                    categories: CATEGORIES_LIST,
                  };
                  fetchContractDetails(p);
                }}
                sx={{
                  fontFamily: poppins.style.fontFamily,
                  fontWeight: 600,
                  fontSize: "13px",
                  borderRadius: "100px",
                  px: 1,
                  py: 2.2,
                  backgroundColor:
                    selectedCategory === "all"
                      ? COLORS.SECONDARY
                      : "#FFFFFF",
                  color:
                    selectedCategory === "all"
                      ? COLORS.WHITE
                      : COLORS.SECONDARY,
                  border:
                    selectedCategory === "all"
                      ? "none"
                      : "1px solid #0135471A",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === "all"
                        ? "#002432"
                        : "rgba(1, 53, 71, 0.04)",
                  },
                }}
              />
              {CATEGORIES_LIST.map((cat) => {
                const isCatSelected = selectedCategory === cat;
                return (
                  <Chip
                    key={cat}
                    label={cat}
                    onClick={() => {
                      const nextCat = isCatSelected ? "all" : cat;
                      setSelectedCategory(nextCat);
                      setCurrentPage(1);
                      const p = {
                        ...buildFilterPayload(1),
                        category: nextCat !== "all" ? nextCat : undefined,
                        categories:
                          nextCat !== "all" ? [nextCat] : CATEGORIES_LIST,
                      };
                      fetchContractDetails(p);
                    }}
                    sx={{
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      fontSize: "13px",
                      borderRadius: "100px",
                      px: 1,
                      py: 2.2,
                      backgroundColor: isCatSelected
                        ? COLORS.SECONDARY
                        : "#FFFFFF",
                      color: isCatSelected ? COLORS.WHITE : COLORS.SECONDARY,
                      border: isCatSelected
                        ? "none"
                        : "1px solid #0135471A",
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

            {/* Card Grid or Loading State */}
            {loading ? (
              <Grid container spacing={3.5}>
                {[1, 2, 3, 4, 5, 6].map((skel) => (
                  <Grid
                    key={skel}
                    size={{
                      xs: 12,
                      sm: viewMode === "list" ? 12 : 6,
                      md: viewMode === "list" ? 12 : 4,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "20px",
                        p: 2,
                        border: "1px solid #0135470D",
                      }}
                    >
                      <Skeleton
                        variant="rounded"
                        height={180}
                        sx={{ borderRadius: "14px", mb: 2 }}
                      />
                      <Skeleton variant="text" width="60%" height={24} />
                      <Skeleton variant="text" width="85%" height={20} />
                      <Skeleton
                        variant="text"
                        width="40%"
                        height={28}
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            ) : filteredAndSortedContracts.length > 0 ? (
              <Grid container spacing={3.5}>
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
                  No Contracts Match Your Filters
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#7A9BAB",
                    mb: 3,
                  }}
                >
                  Try resetting your price range, duration, or categories to
                  explore more contracts.
                </Typography>
                <Button
                  onClick={handleResetFilters}
                  variant="outlined"
                  sx={{
                    borderRadius: "100px",
                    textTransform: "none",
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    borderColor: COLORS.SECONDARY,
                    color: COLORS.SECONDARY,
                    px: 3,
                    py: 1,
                  }}
                >
                  Reset All Filters
                </Button>
              </Box>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Stack
                direction="row"
                sx={{ justifyContent: "center", mt: 4, mb: 2 }}
              >
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  sx={{
                    "& .MuiPaginationItem-root": {
                      fontFamily: poppins.style.fontFamily,
                      fontWeight: 600,
                      color: COLORS.SECONDARY,
                    },
                    "& .Mui-selected": {
                      backgroundColor: `${COLORS.SECONDARY} !important`,
                      color: "#FFFFFF",
                    },
                  }}
                />
              </Stack>
            )}
          </Stack>
        </Grid>
      </Grid>

      {/* Floating CTA WhatsApp */}
      <WhatsAppButton />
    </Box>
  );
};

export default MarketplaceLayout;
