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
import { useSearchParams } from "next/navigation";
import { COLORS, CONTRACT_STATUS, CONTRACT_TYPES } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import MarketplaceSidebar from "./components/MarketplaceSidebar";
import MarketplaceHeader from "./components/MarketplaceHeader";
import MarketplaceListings from "./components/MarketplaceListings";
import ProductCard, {
  ProductCardProps,
} from "@/components/layout/dashboard/components/Product-Card";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import LogoBox from "@/components/widgets/Sidebar/components/LogoBox";
import {
  useContractList,
  useContractPublicList,
} from "@/hooks/contract/useContractList";
import { useUserDetail } from "@/hooks/user/useUserDetail";
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
  const searchParams = useSearchParams();
  const queryType = searchParams.get("type");

  // Advanced filters state
  const [contractType, setContractType] = useState<string>(queryType || "all");
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

  const { userData } = useUserDetail();
  const { loading, fetchContractDetails, contractData } = useContractList();
  const {
    fetchContractPublicList,
    contractPublicData,
    loading: contractPublicLoading,
  } = useContractPublicList();

  const isFetching = userData ? loading : contractPublicLoading;

  const fetchData = useCallback(
    (payload: GET_API_REQUEST_RESPONSE) => {
      if (userData) {
        fetchContractDetails(payload);
      } else {
        fetchContractPublicList(payload);
      }
    },
    [userData, fetchContractDetails, fetchContractPublicList]
  );

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
          "real-estate": CONTRACT_TYPES.REAL_ESTATE,
          "vehicles": CONTRACT_TYPES.VEHICLES,
          "commercial": CONTRACT_TYPES.COMMERCIAL,
          "labour": CONTRACT_TYPES.LABOUR,
          "offices": CONTRACT_TYPES.OFFICES,
          "maintenance": CONTRACT_TYPES.MAINTENANCE,
          "subscriptions": CONTRACT_TYPES.SUBSCRIPTIONS,
          "equipment": CONTRACT_TYPES.EQUIPMENT,
          [CONTRACT_TYPES.REAL_ESTATE]: CONTRACT_TYPES.REAL_ESTATE,
          [CONTRACT_TYPES.VEHICLES]: CONTRACT_TYPES.VEHICLES,
          [CONTRACT_TYPES.COMMERCIAL]: CONTRACT_TYPES.COMMERCIAL,
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

  // Sync query params when they change
  useEffect(() => {
    if (queryType) {
      setContractType(queryType);
      setCurrentPage(1);
    }
  }, [queryType]);

  // Initial fetch on mount or when contractType changes via query params
  useEffect(() => {
    const initialPayload = buildFilterPayload(currentPage);
    fetchData(initialPayload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contractType, userData]);

  // Apply filters handler triggered by user clicking "Apply Filters"
  const handleApplyFilters = () => {
    setCurrentPage(1);
    const payload = buildFilterPayload(1);
    fetchData(payload);
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
    fetchData(resetPayload);
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
    fetchData(payload);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Map API response data to ContractType
  const apiContracts: ContractType[] = useMemo(() => {
    const dataToUse = contractData || contractPublicData;
    const docs = Array.isArray(dataToUse)
      ? dataToUse
      : dataToUse?.docs || dataToUse?.contracts || dataToUse?.data || [];

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
  }, [contractData, contractPublicData]);

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

  const dataToUse = contractData || contractPublicData;
  const totalPages = dataToUse?.totalPages || 1;
  const totalCount =
    dataToUse?.totalDocs ||
    dataToUse?.total ||
    filteredAndSortedContracts.length;

  // Category change handler
  const handleCategoryChange = (cat: string) => {
    let nextCat = cat;
    if (selectedCategory === cat && cat !== "all") {
      nextCat = "all";
    }
    setSelectedCategory(nextCat);
    setCurrentPage(1);
    const p = {
      ...buildFilterPayload(1),
      category: nextCat !== "all" ? nextCat : undefined,
      categories: nextCat !== "all" ? [nextCat] : CATEGORIES_LIST,
    };
    fetchData(p);
  };

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#F9F8F6EB" }}>
      <Grid container spacing={4}>
        {/* Left Column: Logo & Filter Sidebar */}
        <Grid size={{ xs: 12, md: 3 }}>
          <MarketplaceSidebar
            contractType={contractType}
            setContractType={setContractType}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            duration={duration}
            setDuration={setDuration}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            isCityExpanded={isCityExpanded}
            setIsCityExpanded={setIsCityExpanded}
            activeFiltersCount={activeFiltersCount}
            handleResetFilters={handleResetFilters}
            handleApplyFilters={handleApplyFilters}
          />
        </Grid>

        {/* Right Column: Content Grid */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Stack spacing={3.5}>
            <MarketplaceHeader
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              handleSearchKeyDown={handleSearchKeyDown}
              handleApplyFilters={handleApplyFilters}
              viewMode={viewMode}
              setViewMode={setViewMode}
              selectedCategory={selectedCategory}
              handleCategoryChange={handleCategoryChange}
              contractType={contractType}
              totalCount={totalCount}
              CATEGORIES_LIST={CATEGORIES_LIST}
            />

            <MarketplaceListings
              isFetching={isFetching}
              filteredAndSortedContracts={filteredAndSortedContracts}
              viewMode={viewMode}
              handleResetFilters={handleResetFilters}
              totalPages={totalPages}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
            />
          </Stack>
        </Grid>
      </Grid>

      {/* Floating CTA WhatsApp */}
      <WhatsAppButton />
    </Box>
  );
};

export default MarketplaceLayout;
