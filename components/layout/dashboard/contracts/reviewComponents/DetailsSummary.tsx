import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface DetailsSummaryProps {
  formData: any;
  formatCurrency: (val: string) => string;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <Stack
    direction="row"
    sx={{
      justifyContent: "space-between",
      py: 1.5,
      borderBottom: "1px solid #F2F4F7",
      alignItems: "center",
    }}
  >
    <Typography
      sx={{
        fontFamily: poppins.style.fontFamily,
        fontSize: "13px",
        color: "#667085",
      }}
    >
      {label}
    </Typography>
    <Typography
      sx={{
        fontFamily: poppins700.style.fontFamily,
        fontSize: "13px",
        fontWeight: 700,
        color: COLORS.SECONDARY,
      }}
    >
      {value}
    </Typography>
  </Stack>
);

export const DetailsSummary: React.FC<DetailsSummaryProps> = ({
  formData,
  formatCurrency,
}) => {
  return (
    <Box sx={{ pl: { md: 2 } }}>
      <Typography
        sx={{
          fontFamily: poppins700.style.fontFamily,
          fontSize: "12px",
          fontWeight: 700,
          color: COLORS.SECONDARY,
          mb: 1.5,
          letterSpacing: "0.5px",
        }}
      >
        DETAILS SUMMARY
      </Typography>

      <Stack>
        <DetailRow
          label="Contract Type"
          value={formData.contractType || "Real Estate"}
        />
        <DetailRow
          label="Category"
          value={formData.category || "Penthouse"}
        />
        <DetailRow
          label="Location"
          value={
            formData.city
              ? `${formData.district ? formData.district + ", " : ""}${formData.city}`
              : "Riyadh"
          }
        />
        <DetailRow
          label="Total Value"
          value={`SAR ${formatCurrency(formData.totalValue)}`}
        />
        <DetailRow
          label="Monthly Amount"
          value={`SAR ${formatCurrency(formData.monthlyAmount)}mo`}
        />
        <DetailRow
          label="Transfer Fee"
          value={
            formData.transferFee
              ? `SAR ${formatCurrency(formData.transferFee)}`
              : "Not specified"
          }
        />
        <DetailRow
          label="Negotiable"
          value={formData.negotiable ? "Yes" : "No"}
        />
        <DetailRow
          label="End Date"
          value={formData.contractEndDate || "Not specified"}
        />
        <DetailRow
          label="Transfer Reason"
          value={formData.reasonForTransfer || "Financial Reasons"}
        />
        <DetailRow
          label="Documents"
          value={`${formData.contract ? 1 : 0} file(s)`}
        />
        <DetailRow
          label="Asset Photos"
          value={`${formData.asset?.length || 0} photo(s)`}
        />
      </Stack>
    </Box>
  );
};

export default DetailsSummary;
