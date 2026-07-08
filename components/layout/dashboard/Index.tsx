"use client";

import React, { useState, useMemo } from "react";
import { 
  Box, 
  IconButton, 
  Stack, 
  Typography, 
  Grid, 
  Button, 
  Menu, 
  MenuItem, 
  Collapse,
  FormControlLabel,
  Checkbox,
  Fade
} from "@mui/material";
import { 
  ArrowBackIosNew, 
  ArrowForwardIos, 
  GridView, 
  FormatListBulleted, 
  Tune, 
  SwapVert, 
  ArrowDropDown,
  Apartment,
  DirectionsCar,
  BusinessCenter,
  FilterList
} from "@mui/icons-material";

import WelcomeBanner from "@/components/widgets/dashboard/WelcomeBanner";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import Category from "./components/Category";
import ProductCard, { ProductCardProps } from "./components/Product-Card";

// Mock contract listings matching the screenshots and categories
const mockContractsData: Omit<ProductCardProps, "viewMode">[] = [
  {
    id: "1",
    category: "real-estate",
    categoryLabel: "Real Estate",
    categoryIcon: <Apartment />,
    title: "3BR Villa - Al Nakheel District",
    location: "Al Nakheel, Riyadh",
    totalValue: "1,53,000",
    monthlyValue: "8,500",
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=600&auto=format&fit=crop",
    timeLeft: "18 month left",
    views: 342,
    isStarred: true,
    tags: [
      { label: "Verified", type: "verified" },
      { label: "Docs Ready", type: "docs-ready" }
    ]
  },
  {
    id: "2",
    category: "vehicles",
    categoryLabel: "Vehicles",
    categoryIcon: <DirectionsCar />,
    title: "Toyota Camry - 2022 Lease Transfer",
    location: "Al Rawdah, Jeddah",
    totalValue: "52,800",
    monthlyValue: "2,200",
    imageUrl: "https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=600&auto=format&fit=crop",
    timeLeft: "24 month left",
    views: 189,
    isStarred: false,
    tags: [
      { label: "Verified", type: "verified" }
    ]
  },
  {
    id: "3",
    category: "commercial",
    categoryLabel: "Commercial",
    categoryIcon: <BusinessCenter />,
    title: "Commercial Shop - Al Olaya Tower",
    location: "Al Olaya, Riyadh",
    totalValue: "90,000",
    monthlyValue: "15,000",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
    timeLeft: "6 month left",
    views: 521,
    isStarred: true,
    whatsappAvailable: true,
    tags: [
      { label: "URGENT TRANSFER", type: "urgent" },
      { label: "Docs Ready", type: "docs-ready" }
    ]
  },
  {
    id: "4",
    category: "real-estate",
    categoryLabel: "Real Estate",
    categoryIcon: <Apartment />,
    title: "Modern Duplex - KAFD Luxury Living",
    location: "KAFD, Riyadh",
    totalValue: "2,40,000",
    monthlyValue: "20,000",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    timeLeft: "12 month left",
    views: 412,
    isStarred: false,
    tags: [
      { label: "Verified", type: "verified" },
      { label: "Docs Ready", type: "docs-ready" }
    ]
  },
  {
    id: "5",
    category: "vehicles",
    categoryLabel: "Vehicles",
    categoryIcon: <DirectionsCar />,
    title: "Hyundai Elantra - 2021 Lease",
    location: "Al Muruj, Riyadh",
    totalValue: "45,600",
    monthlyValue: "1,900",
    imageUrl: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop",
    timeLeft: "10 month left",
    views: 94,
    isStarred: false,
    tags: [
      { label: "Verified", type: "verified" }
    ]
  },
  {
    id: "6",
    category: "commercial",
    categoryLabel: "Commercial",
    categoryIcon: <BusinessCenter />,
    title: "Warehouse Space - Industrial Area 2",
    location: "Al Khalidiya, Dammam",
    totalValue: "1,80,000",
    monthlyValue: "15,000",
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600&auto=format&fit=crop",
    timeLeft: "36 month left",
    views: 254,
    isStarred: false,
    tags: [
      { label: "Docs Ready", type: "docs-ready" }
    ]
  }
];

const Dashboard = () => {
  // Filtering and view states
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"newest" | "price-asc" | "price-desc" | "views">("newest");
  
  // Advanced filters state
  const [showFilters, setShowFilters] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterUrgent, setFilterUrgent] = useState(false);
  const [filterDocsReady, setFilterDocsReady] = useState(false);

  // Anchor element for Sort Menu
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const openSortMenu = Boolean(sortAnchorEl);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option?: typeof sortBy) => {
    if (option) {
      setSortBy(option);
    }
    setSortAnchorEl(null);
  };

  // Human-readable labels for categories
  const categoryHeaderTitle = useMemo(() => {
    switch (activeCategory) {
      case "real-estate": return "Real Estate Contracts";
      case "vehicles": return "Vehicle Lease Contracts";
      case "commercial": return "Commercial Contracts";
      case "labour": return "Labour Contracts";
      case "agriculture": return "Agriculture Contracts";
      case "services": return "Services Contracts";
      default: return "All Contracts";
    }
  }, [activeCategory]);

  // Handle Filtering and Sorting
  const filteredAndSortedContracts = useMemo(() => {
    // 1. Filter by category
    let list = mockContractsData.filter(contract => {
      if (activeCategory === "all") return true;
      return contract.category === activeCategory;
    });

    // 2. Filter by advanced filters
    if (filterVerified) {
      list = list.filter(c => c.tags?.some(t => t.type === "verified"));
    }
    if (filterUrgent) {
      list = list.filter(c => c.tags?.some(t => t.type === "urgent"));
    }
    if (filterDocsReady) {
      list = list.filter(c => c.tags?.some(t => t.type === "docs-ready"));
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
          return parseInt(b.id) - parseInt(a.id); // Newest by ID descending
      }
    });
  }, [activeCategory, sortBy, filterVerified, filterUrgent, filterDocsReady]);

  const sortLabel = useMemo(() => {
    switch (sortBy) {
      case "price-asc": return "Price: Low to High";
      case "price-desc": return "Price: High to Low";
      case "views": return "Most Popular";
      case "newest":
      default: return "Newest First";
    }
  }, [sortBy]);

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
        />
      </Box>

      {/* Gallery Header Row (Matches design mockup exactly) */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ 
            alignItems: { xs: "flex-start", md: "center" }, 
            justifyContent: "space-between",
            pb: 2,
            borderBottom: "1px solid #EDF1F2"
          }}
        >
          {/* Left Side: Title & Count */}
          <Box>
            <Typography
              sx={{
                color: COLORS.SECONDARY,
                fontSize: "24px",
                fontWeight: 800,
                fontFamily: poppins700.style.fontFamily,
                mb: 0.5,
              }}
            >
              {categoryHeaderTitle}
            </Typography>
            <Typography
              sx={{
                color: "#7A9BAB",
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: poppins.style.fontFamily,
              }}
            >
              {filteredAndSortedContracts.length} active listings · Updated just now
            </Typography>
          </Box>

          {/* Right Side: Actions (Sort, Filter, View Toggles) */}
          <Stack 
            direction="row" 
            spacing={2} 
            sx={{ 
              alignItems: "center", 
              width: { xs: "100%", md: "auto" }, 
              justifyContent: { xs: "space-between", md: "flex-end" } 
            }}
          >
            {/* Sort Dropdown */}
            <Button
              id="sort-button"
              aria-controls={openSortMenu ? "sort-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openSortMenu ? "true" : undefined}
              variant="text"
              onClick={handleSortClick}
              startIcon={<SwapVert />}
              endIcon={<ArrowDropDown />}
              sx={{
                backgroundColor: "#F4F7F8",
                color: COLORS.SECONDARY,
                borderRadius: "15px",
                px: 2.5,
                py: 1.2,
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: poppins700.style.fontFamily,
                "&:hover": {
                  backgroundColor: "#EDF1F2",
                },
              }}
            >
              {sortLabel}
            </Button>
            <Menu
              id="sort-menu"
              anchorEl={sortAnchorEl}
              open={openSortMenu}
              onClose={() => handleSortClose()}
              slotProps={{
                paper: {
                  sx: {
                    borderRadius: "16px",
                    boxShadow: "0px 8px 24px rgba(1, 53, 71, 0.12)",
                    mt: 1,
                    "& .MuiMenuItem-root": {
                      fontFamily: poppins.style.fontFamily,
                      fontSize: "14px",
                      fontWeight: 600,
                      py: 1.2,
                      px: 2.5,
                      color: COLORS.SECONDARY,
                      "&.Mui-selected": {
                        backgroundColor: "rgba(231, 186, 73, 0.15)",
                        color: COLORS.SECONDARY,
                        fontWeight: 700,
                      },
                      "&:hover": {
                        backgroundColor: "rgba(1, 53, 71, 0.04)",
                      }
                    }
                  }
                }
              }}
            >
              <MenuItem onClick={() => handleSortClose("newest")} selected={sortBy === "newest"}>Newest First</MenuItem>
              <MenuItem onClick={() => handleSortClose("price-asc")} selected={sortBy === "price-asc"}>Price: Low to High</MenuItem>
              <MenuItem onClick={() => handleSortClose("price-desc")} selected={sortBy === "price-desc"}>Price: High to Low</MenuItem>
              <MenuItem onClick={() => handleSortClose("views")} selected={sortBy === "views"}>Most Popular</MenuItem>
            </Menu>

            {/* Filter Toggle Button */}
            <Button
              variant="outlined"
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<Tune />}
              sx={{
                borderColor: showFilters ? COLORS.SECONDARY : "#EDF1F2",
                backgroundColor: showFilters ? "rgba(1, 53, 71, 0.04)" : "#ffffff",
                color: COLORS.SECONDARY,
                borderRadius: "15px",
                borderWidth: "1.5px",
                px: 2.5,
                py: 1.2,
                textTransform: "none",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: poppins700.style.fontFamily,
                "&:hover": {
                  borderColor: COLORS.SECONDARY,
                  borderWidth: "1.5px",
                  backgroundColor: "rgba(1, 53, 71, 0.02)",
                },
                transition: "all 0.2s ease",
              }}
            >
              Filters
            </Button>

            {/* View Mode Switcher Pill */}
            <Box 
              sx={{ 
                display: "flex", 
                backgroundColor: "#ffffff", 
                border: "1px solid #EDF1F2", 
                borderRadius: "16px", 
                overflow: "hidden", 
                p: 0.5 
              }}
            >
              <IconButton 
                onClick={() => setViewMode("grid")}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: viewMode === "grid" ? COLORS.SECONDARY : "transparent",
                  color: viewMode === "grid" ? "#ffffff" : "#7A9BAB",
                  p: 1.2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: viewMode === "grid" ? COLORS.SECONDARY : "rgba(1, 53, 71, 0.04)",
                  }
                }}
              >
                <GridView sx={{ fontSize: 20 }} />
              </IconButton>
              <IconButton 
                onClick={() => setViewMode("list")}
                sx={{
                  borderRadius: "12px",
                  backgroundColor: viewMode === "list" ? COLORS.SECONDARY : "transparent",
                  color: viewMode === "list" ? "#ffffff" : "#7A9BAB",
                  p: 1.2,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: viewMode === "list" ? COLORS.SECONDARY : "rgba(1, 53, 71, 0.04)",
                  }
                }}
              >
                <FormatListBulleted sx={{ fontSize: 20 }} />
              </IconButton>
            </Box>
          </Stack>
        </Stack>

        {/* Collapsible Filter Panel */}
        <Collapse in={showFilters}>
          <Box 
            sx={{ 
              mt: 2, 
              p: 2.5, 
              backgroundColor: "#F4F7F8", 
              borderRadius: "20px",
              border: "1px solid #EDF1F2"
            }}
          >
            <Typography 
              sx={{ 
                fontSize: "14px", 
                fontWeight: 700, 
                color: COLORS.SECONDARY, 
                fontFamily: poppins700.style.fontFamily,
                mb: 1.5
              }}
            >
              Filter Options
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={filterVerified} 
                    onChange={(e) => setFilterVerified(e.target.checked)}
                    sx={{
                      color: "#A0B1B9",
                      "&.Mui-checked": {
                        color: COLORS.SECONDARY,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 600, color: COLORS.SECONDARY }}>
                    Verified listings only
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={filterUrgent} 
                    onChange={(e) => setFilterUrgent(e.target.checked)}
                    sx={{
                      color: "#A0B1B9",
                      "&.Mui-checked": {
                        color: COLORS.SECONDARY,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 600, color: COLORS.SECONDARY }}>
                    Urgent transfers only
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={filterDocsReady} 
                    onChange={(e) => setFilterDocsReady(e.target.checked)}
                    sx={{
                      color: "#A0B1B9",
                      "&.Mui-checked": {
                        color: COLORS.SECONDARY,
                      },
                    }}
                  />
                }
                label={
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "14px", fontWeight: 600, color: COLORS.SECONDARY }}>
                    Docs Ready only
                  </Typography>
                }
              />
            </Stack>
          </Box>
        </Collapse>
      </Box>

      {/* Contracts Gallery List / Grid */}
      {filteredAndSortedContracts.length === 0 ? (
        <Box 
          sx={{ 
            py: 8, 
            textAlign: "center", 
            backgroundColor: "#F4F7F8", 
            borderRadius: "28px",
            border: "1px dashed #A0B1B9"
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: COLORS.SECONDARY,
              fontFamily: poppins700.style.fontFamily,
              mb: 1
            }}
          >
            No listings found
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "#7A9BAB",
              fontFamily: poppins.style.fontFamily
            }}
          >
            Try changing your selected category or removing active filter checkboxes.
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
                  md: viewMode === "list" ? 12 : 4
                }}
              >
                <ProductCard 
                  {...contract} 
                  viewMode={viewMode}
                />
              </Grid>
            ))}
          </Grid>
        </Fade>
      )}
    </Box>
  );
};

export default Dashboard;
