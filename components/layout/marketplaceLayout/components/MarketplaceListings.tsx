import React from "react";
import { Box, Button, Grid, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import ProductCard from "@/components/layout/dashboard/components/Product-Card";

export interface MarketplaceListingsProps {
  isFetching: boolean;
  filteredAndSortedContracts: any[];
  viewMode: "grid" | "list";
  handleResetFilters: () => void;
  totalPages: number;
  currentPage: number;
  handlePageChange: (e: React.ChangeEvent<unknown>, value: number) => void;
}

const MarketplaceListings: React.FC<MarketplaceListingsProps> = ({
  isFetching,
  filteredAndSortedContracts,
  viewMode,
  handleResetFilters,
  totalPages,
  currentPage,
  handlePageChange,
}) => {
  return (
    <>
      {/* Card Grid or Loading State */}
      {isFetching ? (
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
            Try resetting your price range, duration, or categories to explore
            more contracts.
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
        <Stack direction="row" sx={{ justifyContent: "center", mt: 4, mb: 2 }}>
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
    </>
  );
};

export default MarketplaceListings;
