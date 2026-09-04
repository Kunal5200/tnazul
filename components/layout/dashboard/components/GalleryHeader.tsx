import React, { useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  Button,
  Menu,
  MenuItem,
  Collapse,
  FormControlLabel,
  Checkbox,
  IconButton,
} from "@mui/material";
import {
  Tune,
  SwapVert,
  ArrowDropDown,
  GridView,
  FormatListBulleted,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

export type SortOption = "newest" | "price-asc" | "price-desc" | "views";
export type ViewMode = "grid" | "list";

interface GalleryHeaderProps {
  categoryHeaderTitle: string;
  totalActiveListings: number;

  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;

  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;

  showFilters: boolean;
  setShowFilters: (show: boolean) => void;

  filterVerified: boolean;
  setFilterVerified: (val: boolean) => void;

  filterUrgent: boolean;
  setFilterUrgent: (val: boolean) => void;

  filterDocsReady: boolean;
  setFilterDocsReady: (val: boolean) => void;
}

const GalleryHeader: React.FC<GalleryHeaderProps> = ({
  categoryHeaderTitle,
  totalActiveListings,
  viewMode,
  setViewMode,
  sortBy,
  setSortBy,
  showFilters,
  setShowFilters,
  filterVerified,
  setFilterVerified,
  filterUrgent,
  setFilterUrgent,
  filterDocsReady,
  setFilterDocsReady,
}) => {
  const [sortAnchorEl, setSortAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const openSortMenu = Boolean(sortAnchorEl);

  const handleSortClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option?: SortOption) => {
    if (option) {
      setSortBy(option);
    }
    setSortAnchorEl(null);
  };

  const sortLabel = useMemo(() => {
    switch (sortBy) {
      case "price-asc":
        return "Price: Low to High";
      case "price-desc":
        return "Price: High to Low";
      case "views":
        return "Most Popular";
      case "newest":
      default:
        return "Newest First";
    }
  }, [sortBy]);

  return (
    <Box sx={{ mt: 6, mb: 4 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          alignItems: { xs: "flex-start", md: "center" },
          justifyContent: "space-between",
          pb: 2,
          borderBottom: "1px solid #EDF1F2",
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
            {totalActiveListings} active listings · Updated just now
          </Typography>
        </Box>

        {/* Right Side: Actions (Sort, Filter, View Toggles) */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: "center",
            width: { xs: "100%", md: "auto" },
            justifyContent: { xs: "space-between", md: "flex-end" },
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
                    },
                  },
                },
              },
            }}
          >
            <MenuItem
              onClick={() => handleSortClose("newest")}
              selected={sortBy === "newest"}
            >
              Newest First
            </MenuItem>
            <MenuItem
              onClick={() => handleSortClose("price-asc")}
              selected={sortBy === "price-asc"}
            >
              Price: Low to High
            </MenuItem>
            <MenuItem
              onClick={() => handleSortClose("price-desc")}
              selected={sortBy === "price-desc"}
            >
              Price: High to Low
            </MenuItem>
            <MenuItem
              onClick={() => handleSortClose("views")}
              selected={sortBy === "views"}
            >
              Most Popular
            </MenuItem>
          </Menu>

          {/* Filter Toggle Button */}
          <Button
            variant="outlined"
            onClick={() => setShowFilters(!showFilters)}
            startIcon={<Tune />}
            sx={{
              borderColor: showFilters ? COLORS.SECONDARY : "#EDF1F2",
              backgroundColor: showFilters
                ? "rgba(1, 53, 71, 0.04)"
                : "#ffffff",
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
              p: 0.5,
            }}
          >
            <IconButton
              onClick={() => setViewMode("grid")}
              sx={{
                borderRadius: "12px",
                backgroundColor:
                  viewMode === "grid" ? COLORS.SECONDARY : "transparent",
                color: viewMode === "grid" ? "#ffffff" : "#7A9BAB",
                p: 1.2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    viewMode === "grid"
                      ? COLORS.SECONDARY
                      : "rgba(1, 53, 71, 0.04)",
                },
              }}
            >
              <GridView sx={{ fontSize: 20 }} />
            </IconButton>
            <IconButton
              onClick={() => setViewMode("list")}
              sx={{
                borderRadius: "12px",
                backgroundColor:
                  viewMode === "list" ? COLORS.SECONDARY : "transparent",
                color: viewMode === "list" ? "#ffffff" : "#7A9BAB",
                p: 1.2,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor:
                    viewMode === "list"
                      ? COLORS.SECONDARY
                      : "rgba(1, 53, 71, 0.04)",
                },
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
            border: "1px solid #EDF1F2",
          }}
        >
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              color: COLORS.SECONDARY,
              fontFamily: poppins700.style.fontFamily,
              mb: 1.5,
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
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: COLORS.SECONDARY,
                  }}
                >
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
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: COLORS.SECONDARY,
                  }}
                >
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
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontSize: "14px",
                    fontWeight: 600,
                    color: COLORS.SECONDARY,
                  }}
                >
                  Docs Ready only
                </Typography>
              }
            />
          </Stack>
        </Box>
      </Collapse>
    </Box>
  );
};

export default GalleryHeader;
