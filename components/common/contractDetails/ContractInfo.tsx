import React from "react";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";
import { poppins, poppins700 } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import ImageCarousel from "@/components/widgets/dashboard/ImageCarousel";

interface ContractInfoProps {
  contractDetails: any;
}

// Helper component for details
const DetailItem = ({ label, value }: { label: string; value: string | number }) => (
  <Box>
    <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", color: "#7A9BAB", mb: 0.5, fontWeight: 500 }}>
      {label}
    </Typography>
    <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "15px", color: COLORS.SECONDARY }}>
      {value || "-"}
    </Typography>
  </Box>
);

const ContractInfo = ({ contractDetails }: ContractInfoProps) => {
  return (
    <Paper elevation={0} sx={{ borderRadius: "24px", overflow: "hidden", border: "1px solid #0135470F", mb: 4 }}>
      {contractDetails?.assetImages && contractDetails.assetImages.length > 0 ? (
        <Box sx={{ height: { xs: "300px", md: "450px" }, backgroundColor: "#EAEAEA" }}>
          <ImageCarousel data={contractDetails.assetImages} />
        </Box>
      ) : (
        <Box sx={{ height: "300px", backgroundColor: "#EAEAEA", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Typography sx={{ fontFamily: poppins.style.fontFamily, color: "#7A9BAB", fontWeight: 500 }}>
            No images available
          </Typography>
        </Box>
      )}

      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "20px", color: COLORS.SECONDARY, mb: 2 }}>
          Description
        </Typography>
        <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "15px", color: "#5A7A8A", lineHeight: 1.8, mb: 4, fontWeight: 500 }}>
          {contractDetails?.contractDescription || "No description provided."}
        </Typography>

        <Divider sx={{ borderColor: "#0135470F", mb: 4 }} />

        <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "20px", color: COLORS.SECONDARY, mb: 3 }}>
          Contract Information
        </Typography>
        
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Contract Type" value={contractDetails?.contractType} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Category" value={contractDetails?.category} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Start Date" value={contractDetails?.startDate} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="End Date" value={contractDetails?.endDate} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Remaining Duration" value={contractDetails?.remainingDuration} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Transfer Expiry" value={contractDetails?.transferExpiryDate} />
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "#0135470F", my: 4 }} />

        <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontSize: "20px", color: COLORS.SECONDARY, mb: 3 }}>
          Transfer Terms
        </Typography>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Transfer Reason" value={contractDetails?.transferReason} />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <DetailItem label="Price Negotiable" value={contractDetails?.priceNegotiable ? "Yes" : "No"} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <DetailItem label="Terms & Conditions" value={contractDetails?.TransferTermsConditions || "N/A"} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default ContractInfo;
