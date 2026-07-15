"use client";

import React, { useState, useMemo } from "react";
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
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import ProductCard, { ProductCardProps } from "@/components/layout/dashboard/components/Product-Card";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import LogoBox from "@/components/widgets/Sidebar/components/LogoBox";

// Custom type representing the contract item
type ContractType = Omit<ProductCardProps, "viewMode">;

const MarketplaceLayout = () => {
  // Advanced filters state
  const [contractType, setContractType] = useState<"all" | "real-estate" | "vehicles" | "commercial">("all");
  const [priceRange, setPriceRange] = useState<number[]>([1000, 250000]);
  const [duration, setDuration] = useState<string>("all");
  const [verificationStatus, setVerificationStatus] = useState<"nafath" | "admin" | "any">("nafath");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [isCityExpanded, setIsCityExpanded] = useState<boolean>(true);

  // Search & view mode states
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "views">("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Mock contracts matching the marketplace mockup details
  const allContracts: ContractType[] = [
    {
      id: "m1",
      category: "real-estate",
      categoryLabel: "Real Estate",
      categoryIcon: <Apartment />,
      title: "3BR Villa - Al Nakheel District",
      location: "Al Nakheel, Riyadh",
      totalValue: "1,53,000",
      monthlyValue: "8,500",
      imageUrl: "/images/villa_preview.png",
      timeLeft: "18 month left",
      views: 342,
      isStarred: true,
      tags: [
        { label: "Verified", type: "verified" },
        { label: "Docs Ready", type: "docs-ready" },
      ],
    },
    {
      id: "m2",
      category: "vehicles",
      categoryLabel: "Vehicles",
      categoryIcon: <DirectionsCar />,
      title: "Toyota Camry - 2022 Lease Transfer",
      location: "Al Rawdah, Jeddah",
      totalValue: "52,800",
      monthlyValue: "2,200",
      imageUrl: "/images/shop_preview.png",
      timeLeft: "24 month left",
      views: 189,
      isStarred: false,
      tags: [
        { label: "Verified", type: "verified" },
      ],
    },
    {
      id: "m3",
      category: "commercial",
      categoryLabel: "Commercial",
      categoryIcon: <BusinessCenter />,
      title: "Commercial Shop - Al Olaya Tower",
      location: "Al Olaya, Riyadh",
      totalValue: "90,000",
      monthlyValue: "15,000",
      imageUrl: "/images/shop_preview.png",
      timeLeft: "6 month left",
      views: 521,
      isStarred: true,
      tags: [
        { label: "URGENT TRANSFER", type: "urgent" },
        { label: "Docs Ready", type: "docs-ready" },
      ],
    },
    {
      id: "m4",
      category: "real-estate",
      categoryLabel: "Real Estate",
      categoryIcon: <Apartment />,
      title: "Furnished Office - King Fahd Road",
      location: "Al Hamra, Riyadh",
      totalValue: "1,72,800",
      monthlyValue: "7,200",
      imageUrl: "/images/shop_preview.png",
      timeLeft: "4 month left",
      views: 276,
      isStarred: false,
      tags: [
        { label: "Verified", type: "verified" },
      ],
    },
    {
      id: "m5",
      category: "real-estate",
      categoryLabel: "Real Estate",
      categoryIcon: <Apartment />,
      title: "2BR Apartment - Corniche Sea View",
      location: "Al Corniche, Dammam",
      totalValue: "33,000",
      monthlyValue: "5,500",
      imageUrl: "/images/villa_preview.png",
      timeLeft: "6 month left",
      views: 189,
      isStarred: false,
      tags: [
        { label: "URGENT TRANSFER", type: "urgent" },
      ],
    },
    {
      id: "m6",
      category: "commercial",
      categoryLabel: "Subscriptions",
      categoryIcon: <FitnessCenter />,
      title: "Gym Platinum Membership - 2 Years Left",
      location: "Al Malqa, Riyadh",
      totalValue: "10,800",
      monthlyValue: "450",
      imageUrl: "/images/villa_preview.png",
      timeLeft: "12 month left",
      views: 189,
      isStarred: true,
      tags: [
        { label: "Verified", type: "verified" },
      ],
    },
  ];

  // Filtering Logic
  const filteredContracts = useMemo(() => {
    return allContracts.filter((contract) => {
      // 1. Contract Type
      if (contractType !== "all" && contract.category !== contractType) {
        return false;
      }

      // 2. Price Range (Total Value filter)
      const numericValue = parseFloat(contract.totalValue.replace(/,/g, ""));
      if (numericValue < priceRange[0] || numericValue > priceRange[1]) {
        return false;
      }

      // 3. Search query
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchesTitle = contract.title.toLowerCase().includes(query);
        const matchesLocation = contract.location.toLowerCase().includes(query);
        if (!matchesTitle && !matchesLocation) {
          return false;
        }
      }

      // 4. Contract Duration
      if (duration !== "all") {
        const matchLeft = contract.timeLeft.toLowerCase();
        if (duration === "< 6 Months" && !matchLeft.includes("4 month") && !matchLeft.includes("6 month")) {
          return false;
        }
        if (duration === "6-12 Months" && !matchLeft.includes("6 month") && !matchLeft.includes("12 month")) {
          return false;
        }
        if (duration === "1-2 Years" && !matchLeft.includes("12 month") && !matchLeft.includes("18 month") && !matchLeft.includes("24 month")) {
          return false;
        }
        if (duration === "2+ Years" && !matchLeft.includes("24 month")) {
          return false;
        }
      }

      // 5. Verification Status
      if (verificationStatus === "nafath") {
        const hasVerifiedTag = contract.tags?.some((t) => t.type === "verified");
        if (!hasVerifiedTag) {
          return false;
        }
      }

      // 6. City
      if (selectedCity !== "all") {
        if (!contract.location.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      // 7. Sort
      const valA = parseFloat(a.totalValue.replace(/,/g, ""));
      const valB = parseFloat(b.totalValue.replace(/,/g, ""));
      if (sortBy === "price-asc") return valA - valB;
      if (sortBy === "price-desc") return valB - valA;
      if (sortBy === "views") return b.views - a.views;
      return parseInt(b.id) - parseInt(a.id); // Newest / Default
    });
  }, [contractType, priceRange, searchTerm, duration, verificationStatus, selectedCity, sortBy]);

  // Reset Filters
  const handleResetFilters = () => {
    setContractType("all");
    setPriceRange([1000, 250000]);
    setDuration("all");
    setVerificationStatus("any");
    setSelectedCity("all");
    setSearchTerm("");
  };

  // Active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (contractType !== "all") count++;
    if (priceRange[0] > 1000 || priceRange[1] < 250000) count++;
    if (duration !== "all") count++;
    if (verificationStatus !== "any") count++;
    if (selectedCity !== "all") count++;
    return count;
  }, [contractType, priceRange, duration, verificationStatus, selectedCity]);

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
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 3.5 }}>
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
                    {activeFiltersCount} filter{activeFiltersCount !== 1 ? "s" : ""} active
                  </Typography>
                </Box>
              </Stack>

              <Stack spacing={4.5}>
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
                  <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
                    {[
                      { id: "all", label: "All" },
                      { id: "real-estate", label: "Real Estate" },
                      { id: "vehicles", label: "Vehicles" },
                      { id: "commercial", label: "Commercial" },
                    ].map((type) => (
                      <Button
                        key={type.id}
                        onClick={() => setContractType(type.id as any)}
                        sx={{
                          borderRadius: "100px",
                          fontSize: "12px",
                          fontWeight: 700,
                          textTransform: "none",
                          py: 0.6,
                          px: 2,
                          backgroundColor: contractType === type.id ? COLORS.SECONDARY : "transparent",
                          color: contractType === type.id ? COLORS.WHITE : "#7A9BAB",
                          border: contractType === type.id ? "1.38px solid transparent" : "1.38px solid #0135471F",
                          "&:hover": {
                            backgroundColor: contractType === type.id ? "#002432" : "#01354705",
                          },
                        }}
                      >
                        {type.label}
                      </Button>
                    ))}
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

                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
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
                    <Typography sx={{ color: "#7A9BAB", fontWeight: 700 }}>–</Typography>
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
                  {[
                    "< 6 Months",
                    "6–12 Months",
                    "1–2 Years",
                    "2+ Years",
                  ].map((dur) => {
                    const normalized = dur.replace("–", "-");
                    const isSelected = duration === normalized;
                    return (
                      <Grid key={dur} size={6}>
                        <Button
                          fullWidth
                          onClick={() => setDuration(isSelected ? "all" : normalized)}
                          sx={{
                            borderRadius: "100px",
                            fontSize: "12px",
                            fontWeight: 700,
                            textTransform: "none",
                            py: 0.9,
                            backgroundColor: isSelected ? COLORS.SECONDARY : "transparent",
                            color: isSelected ? COLORS.WHITE : "#7A9BAB",
                            border: isSelected ? "1.38px solid transparent" : "1.38px solid #0135471F",
                            "&:hover": {
                              backgroundColor: isSelected ? "#002432" : "#01354705",
                            },
                          }}
                        >
                          {dur}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              {/* Filter: Verification Status */}
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
                  Verification Status
                </Typography>
                <Stack spacing={1}>
                  {[
                    { id: "nafath", label: "Nafath Verified" },
                    { id: "admin", label: "Admin Approved" },
                    { id: "any", label: "Any Status" },
                  ].map((status) => {
                    const isSelected = verificationStatus === status.id;
                    return (
                      <Button
                        key={status.id}
                        onClick={() => setVerificationStatus(status.id as any)}
                        sx={{
                          justifyContent: "flex-start",
                          py: 1.5,
                          px: 2.5,
                          borderRadius: "12px",
                          textTransform: "none",
                          fontSize: "13.5px",
                          fontWeight: 700,
                          backgroundColor: isSelected ? COLORS.SECONDARY : "transparent",
                          color: isSelected ? COLORS.WHITE : "#7A9BAB",
                          border: isSelected ? "1.38px solid transparent" : "1.38px solid #0135471F",
                          "&:hover": {
                            backgroundColor: isSelected ? "#002432" : "#01354705",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                          <Box
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: "50%",
                              border: `2px solid ${isSelected ? COLORS.PRIMARY : "#A0B1B9"}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {isSelected && (
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  backgroundColor: COLORS.PRIMARY,
                                }}
                              />
                            )}
                          </Box>
                          <Typography
                            sx={{
                              fontFamily: poppins700.style.fontFamily,
                              fontWeight: 700,
                              fontSize: "13px",
                              lineHeight: 1,
                            }}
                          >
                            {status.label}
                          </Typography>
                        </Stack>
                      </Button>
                    );
                  })}
                </Stack>
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
                            onClick={() => setSelectedCity(isSelected ? "all" : city)}
                            sx={{
                              borderRadius: "100px",
                              fontSize: "12px",
                              fontWeight: 700,
                              textTransform: "none",
                              py: 0.9,
                              backgroundColor: isSelected ? COLORS.SECONDARY : "transparent",
                              color: isSelected ? COLORS.WHITE : "#7A9BAB",
                              border: isSelected ? "1.38px solid transparent" : "1.38px solid #0135471F",
                              "&:hover": {
                                backgroundColor: isSelected ? "#002432" : "#01354705",
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
        <Stack spacing={4}>
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
              placeholder="Search apartments, car leases, commercial contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: <Search sx={{ color: "#7A9BAB", mr: 1, fontSize: 20 }} />,
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
                  backgroundColor: viewMode === "grid" ? COLORS.SECONDARY : "transparent",
                  color: viewMode === "grid" ? "#ffffff" : "#7A9BAB",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: viewMode === "grid" ? COLORS.SECONDARY : "rgba(1, 53, 71, 0.04)",
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
                  backgroundColor: viewMode === "list" ? COLORS.SECONDARY : "transparent",
                  color: viewMode === "list" ? "#ffffff" : "#7A9BAB",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: viewMode === "list" ? COLORS.SECONDARY : "rgba(1, 53, 71, 0.04)",
                  },
                }}
              >
                <FormatListBulleted sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Stack>

          {/* Title / Counter Row */}
          <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
            <Typography
              sx={{
                fontFamily: poppins700.style.fontFamily,
                fontWeight: 800,
                fontSize: "22px",
                color: COLORS.SECONDARY,
              }}
            >
              {contractType === "all" ? "All" : contractType === "real-estate" ? "Real Estate" : contractType === "vehicles" ? "Vehicles" : "Commercial"} Listings
            </Typography>
            <Typography
              sx={{
                fontFamily: poppins.style.fontFamily,
                fontWeight: 500,
                fontSize: "13px",
                color: "#7A9BAB",
              }}
            >
              {filteredContracts.length} contract{filteredContracts.length !== 1 ? "s" : ""} found
            </Typography>
          </Stack>

          {/* Card Grid */}
          {filteredContracts.length > 0 ? (
            <Grid container spacing={3.5}>
              {filteredContracts.map((contract) => (
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
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 500,
                  fontSize: "14px",
                  color: "#7A9BAB",
                }}
              >
                Try resetting your price range, type categories, or verification statuses.
              </Typography>
            </Box>
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
