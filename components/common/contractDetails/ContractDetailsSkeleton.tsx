import React from "react";
import { Box, Stack, Grid, Paper, Skeleton, Divider } from "@mui/material";

const ContractDetailsSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Header Skeleton */}
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}>
          <Box sx={{ width: "100%", maxWidth: "600px" }}>
            <Skeleton variant="text" width="80%" height={48} sx={{ mb: 1 }} />
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}>
              <Skeleton variant="rounded" width={80} height={24} sx={{ borderRadius: "6px" }} />
              <Skeleton variant="text" width={100} height={24} />
              <Skeleton variant="text" width={150} height={24} />
            </Stack>
          </Box>
          <Stack direction="row" spacing={2} sx={{ width: { xs: "100%", md: "auto" } }}>
            <Skeleton variant="rounded" width={120} height={44} sx={{ borderRadius: "100px" }} />
            <Skeleton variant="rounded" width={120} height={44} sx={{ borderRadius: "100px" }} />
          </Stack>
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Left Column */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Paper elevation={0} sx={{ borderRadius: "24px", overflow: "hidden", border: "1px solid #0135470F", mb: 4 }}>
            {/* Image Placeholder */}
            <Skeleton variant="rectangular" width="100%" sx={{ height: { xs: "300px", md: "450px" } }} />

            <Box sx={{ p: { xs: 3, md: 4 } }}>
              <Skeleton variant="text" width={150} height={32} sx={{ mb: 2 }} />
              <Skeleton variant="text" width="100%" height={24} />
              <Skeleton variant="text" width="90%" height={24} />
              <Skeleton variant="text" width="95%" height={24} sx={{ mb: 4 }} />

              <Divider sx={{ borderColor: "#0135470F", mb: 4 }} />

              <Skeleton variant="text" width={200} height={32} sx={{ mb: 3 }} />
              
              <Grid container spacing={3}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={item}>
                    <Skeleton variant="text" width={120} height={20} sx={{ mb: 0.5 }} />
                    <Skeleton variant="text" width={160} height={24} />
                  </Grid>
                ))}
              </Grid>

              <Divider sx={{ borderColor: "#0135470F", my: 4 }} />

              <Skeleton variant="text" width={180} height={32} sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                {[1, 2, 3].map((item) => (
                  <Grid size={{ xs: 12, sm: item === 3 ? 12 : 6 }} key={item}>
                    <Skeleton variant="text" width={120} height={20} sx={{ mb: 0.5 }} />
                    <Skeleton variant="text" width="80%" height={24} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>

        {/* Right Column */}
        <Grid size={{ xs: 12, lg: 4 }}>
          {/* Financials */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", border: "1px solid #0135470F", mb: 4 }}>
            <Skeleton variant="text" width={180} height={32} sx={{ mb: 3 }} />
            <Box sx={{ mb: 3 }}>
              <Skeleton variant="text" width={140} height={24} sx={{ mb: 0.5 }} />
              <Skeleton variant="text" width={180} height={40} />
            </Box>
            <Stack spacing={2.5}>
              {[1, 2, 3].map((item, i) => (
                <React.Fragment key={item}>
                  <Stack direction="row" sx={{ justifyContent: "space-between" }}>
                    <Skeleton variant="text" width={120} height={24} />
                    <Skeleton variant="text" width={80} height={24} />
                  </Stack>
                  {i < 2 && <Divider sx={{ borderColor: "#0135470F" }} />}
                </React.Fragment>
              ))}
            </Stack>
          </Paper>

          {/* Seller Info */}
          <Paper elevation={0} sx={{ p: 4, borderRadius: "24px", border: "1px solid #0135470F" }}>
            <Skeleton variant="text" width={180} height={32} sx={{ mb: 3 }} />
            <Stack direction="row" spacing={2} sx={{ alignItems: "center", mb: 3 }}>
              <Skeleton variant="circular" width={56} height={56} />
              <Box sx={{ flexGrow: 1 }}>
                <Skeleton variant="text" width={140} height={24} />
                <Skeleton variant="text" width={100} height={20} />
              </Box>
            </Stack>
            <Stack spacing={2.5}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" width={160} height={24} />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Skeleton variant="circular" width={20} height={20} />
                <Skeleton variant="text" width={200} height={24} />
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContractDetailsSkeleton;
