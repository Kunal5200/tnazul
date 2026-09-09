import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";

interface SimilarListingsProps {
  contractPublicData?: any;
}

export const SimilarListings: React.FC<SimilarListingsProps> = ({ contractPublicData }) => {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "24px",
        p: 3.5,
        border: "1px solid #0135470D",
        boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "baseline",
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "10.5px",
            color: "#7A9BAB",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
          }}
        >
          Similar Listings
        </Typography>
        <Typography
          onClick={() => router.push("/dashboard/marketplace")}
          sx={{
            fontFamily: poppins700.style.fontFamily,
            fontWeight: 700,
            fontSize: "11px",
            color: COLORS.PRIMARY,
            cursor: "pointer",
            "&:hover": { opacity: 0.8 },
          }}
        >
          View All
        </Typography>
      </Stack>
      <Stack spacing={2.5}>
        {contractPublicData?.docs?.map((item: any, idx: number) => {
          const title =
            item?.contractTitle ||
            item?.title ||
            item?.contractName ||
            item?.assetType ||
            (item?.category ? `${item.category} Contract` : "Contract");
          const val = item?.totalContractValue ?? item?.price;
          const currency = item?.currency || "SAR";
          const price =
            val !== undefined && val !== null
              ? `${Number(val).toLocaleString()} ${currency}`
              : "0 SAR";
          const duration = item?.remainingDuration
            ? `${item.remainingDuration} left`
            : "N/A";
          const img =
            item?.assetImages?.[0] ||
            item?.contractDocuments?.[0] ||
            item?.image ||
            (item?.category === "Villa"
              ? "/images/villa_preview.png"
              : "/images/shop_preview.png");

          return (
            <Stack
              key={idx}
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
              onClick={() => router.push(`/marketplace/${item?._id || item?.id}`)}
            >
              <Box
                sx={{
                  width: 72,
                  height: 50,
                  borderRadius: "10px",
                  overflow: "hidden",
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <Image
                  src={img}
                  alt={title}
                  fill
                  sizes="72px"
                  style={{ objectFit: "cover" }}
                />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  noWrap
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "13px",
                    color: COLORS.SECONDARY,
                    mb: 0.25,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 600,
                    fontSize: "11px",
                    color: "#7A9BAB",
                  }}
                >
                  {price}{" "}
                  <Box
                    component="span"
                    sx={{ fontWeight: 500, color: "#A0B1B9", ml: 0.5 }}
                  >
                    · {duration}
                  </Box>
                </Typography>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </Box>
  );
};
