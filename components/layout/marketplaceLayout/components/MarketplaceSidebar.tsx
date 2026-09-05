import React from "react";
import {
  Box,
  Button,
  Collapse,
  Grid,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore, Tune } from "@mui/icons-material";
import { COLORS, CONTRACT_TYPES } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import LogoBox from "@/components/widgets/Sidebar/components/LogoBox";

export interface MarketplaceSidebarProps {
  contractType: string;
  setContractType: (val: string) => void;
  priceRange: number[];
  setPriceRange: (val: number[]) => void;
  duration: string;
  setDuration: (val: string) => void;
  selectedCity: string;
  setSelectedCity: (val: string) => void;
  isCityExpanded: boolean;
  setIsCityExpanded: (val: boolean) => void;
  activeFiltersCount: number;
  handleResetFilters: () => void;
  handleApplyFilters: () => void;
}

const MarketplaceSidebar: React.FC<MarketplaceSidebarProps> = ({
  contractType,
  setContractType,
  priceRange,
  setPriceRange,
  duration,
  setDuration,
  selectedCity,
  setSelectedCity,
  isCityExpanded,
  setIsCityExpanded,
  activeFiltersCount,
  handleResetFilters,
  handleApplyFilters,
}) => {
  return (
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
            <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 1 }}>
              {[
                { id: "all", label: "All" },
                { id: "real-estate", label: CONTRACT_TYPES.REAL_ESTATE },
                { id: "vehicles", label: CONTRACT_TYPES.VEHICLES },
                { id: "commercial", label: CONTRACT_TYPES.COMMERCIAL },
              ].map((type) => {
                const isSelected =
                  contractType === type.id || contractType === type.label;
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
                        backgroundColor: isSelected ? "#002432" : "#01354705",
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
  );
};

export default MarketplaceSidebar;
