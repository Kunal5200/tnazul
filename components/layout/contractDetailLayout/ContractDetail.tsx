"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Grid,
} from "@mui/material";
import { CheckCircle, VisibilityOutlined, AccessTimeOutlined } from "@mui/icons-material";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { useParams, useRouter } from "next/navigation";
import { useContractDetails } from "@/hooks/contract/useContractList";
import { useUserStore } from "@/store/userStore";
import { ACCOUNT_TYPE, CONTRACT_STATUS } from "@/utils/enum";
import { useApproveDisapproveContract } from "@/hooks/admin/useApprovedOrdisApproveContract";
import ContractDetailsSkeleton from "@/components/common/contractDetails/ContractDetailsSkeleton";
import { useModal } from "@/store/useModal";

// Subcomponents
import { RejectContractModalContent } from "./components/RejectContractModal";
import { ContractHeaderToolbar } from "./components/ContractHeaderToolbar";
import { ContractGallery } from "./components/ContractGallery";
import { ContractFinancialSummary } from "./components/ContractFinancialSummary";
import { ContractInfoSection } from "./components/ContractInfoSection";
import { SellerOverviewCard } from "./components/SellerOverviewCard";
import { ApplyTransferModal } from "./components/ApplyTransferModal";

interface VerticalStep {
  label: string;
  description: string;
  status: "complete" | "current" | "upcoming";
}

const ContractDetailLayout = () => {
  const { showModal, hideModal } = useModal();
  const { id } = useParams();
  const router = useRouter();
  const { fetchContractDetails, loading, contractDetails } = useContractDetails();
  const { userData, fetchUserDetail } = useUserStore();
  const { approveDisapproveContract } = useApproveDisapproveContract();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!userData) {
      fetchUserDetail();
    }
  }, [userData, fetchUserDetail]);

  useEffect(() => {
    if (id) {
      fetchContractDetails(id as string);
    }
  }, [id, fetchContractDetails]);

  const isAdmin = userData?.roleName === ACCOUNT_TYPE.ADMINISTRATOR;

  const handleApprove = async () => {
    if (!id) return;
    await approveDisapproveContract(id as string, CONTRACT_STATUS.APPROVED);
    router.push("/admin/approvals");
  };

  const submitReject = async (reason: string) => {
    if (!id || !reason.trim()) return;
    await approveDisapproveContract(id as string, CONTRACT_STATUS.REJECTED, reason);
    hideModal();
    router.push("/admin/approvals");
  };

  const galleryImages = contractDetails?.assetImages?.length 
    ? contractDetails.assetImages 
    : [
        "/images/villa_preview.png",
        "/images/shop_preview.png",
        "/images/villa_preview.png",
      ];

  const verticalSteps: VerticalStep[] = [
    { label: "Listed", description: "Contract published", status: "complete" },
    { label: "Interest Received", description: "3 interested buyers", status: "complete" },
    { label: "Documents Shared", description: "Pending review", status: "current" },
    { label: "Approval Pending", description: "Landlord & bank", status: "upcoming" },
    { label: "Transfer Completed", description: "Ownership changed", status: "upcoming" },
  ];

  if (loading || !contractDetails) {
    return <ContractDetailsSkeleton />;
  }

  return (
    <Box sx={{ p: 4, minHeight: "100vh", backgroundColor: "#F9F8F6EB" }}>
      <ContractHeaderToolbar contractTitle={contractDetails?.contractTitle} />

      <Grid container spacing={4.5}>
        <Grid size={{ xs: 12, md: 8.2 }}>
          <Stack spacing={4.5}>
            <ContractGallery images={galleryImages} />

            <Box>
              <Typography
                sx={{
                  fontFamily: poppins700.style.fontFamily,
                  fontWeight: 800,
                  fontSize: "26px",
                  color: COLORS.SECONDARY,
                  mb: 1.5,
                }}
              >
                {contractDetails?.contractTitle || "Contract Title"}
              </Typography>

              <Stack direction="row" spacing={2.5} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1.5 }}>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "#7A9BAB" }}>
                  <VisibilityOutlined sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", fontWeight: 600 }}>
                    412 views
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "#7A9BAB" }}>
                  <AccessTimeOutlined sx={{ fontSize: 16 }} />
                  <Typography sx={{ fontFamily: poppins.style.fontFamily, fontSize: "13px", fontWeight: 600 }}>
                    {contractDetails?.createdAt ? new Date(contractDetails.createdAt).toLocaleDateString() : "N/A"}
                  </Typography>
                </Stack>
                <Box
                  sx={{
                    borderRadius: "100px",
                    py: 0.5,
                    px: 1.5,
                    backgroundColor: "#E8F5E9",
                    color: "#10753E",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <CheckCircle sx={{ fontSize: 13, color: "#10753E" }} />
                  <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", lineHeight: 1 }}>
                    Nafath Verified
                  </Typography>
                </Box>
              </Stack>
            </Box>

            <ContractFinancialSummary
              totalContractValue={contractDetails?.totalContractValue}
              monthlyAmount={contractDetails?.monthlyAmount}
              remainingDuration={contractDetails?.remainingDuration}
              transferFee={2500}
              securityDeposit={17000}
            />

            <ContractInfoSection
              contractType={contractDetails?.contractType}
              districtOrNeighborhood={contractDetails?.districtOrNeighborhood}
              city={contractDetails?.city}
              remainingDuration={contractDetails?.remainingDuration}
              startDate={contractDetails?.startDate}
              totalDuration={contractDetails?.totalDuration}
              endDate={contractDetails?.endDate}
            />

            <Box>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
                <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "16px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Description
                </Typography>
              </Stack>
              <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3.5, border: "1px solid #0135470D" }}>
                <Typography
                  sx={{
                    fontFamily: poppins.style.fontFamily,
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#5A7A8A",
                    lineHeight: 1.7,
                  }}
                >
                  {contractDetails?.contractDescription || "No description provided."}
                </Typography>
              </Box>
            </Box>

            <Box>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
                <Box sx={{ width: 4, height: 18, backgroundColor: COLORS.PRIMARY, borderRadius: "2px" }} />
                <Typography
                  sx={{
                    fontFamily: poppins700.style.fontFamily,
                    fontWeight: 700,
                    fontSize: "16px",
                    color: COLORS.SECONDARY,
                  }}
                >
                  Transfer Conditions
                </Typography>
              </Stack>
              <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "20px", p: 3.5, border: "1px solid #0135470D" }}>
                <Stack spacing={2.5}>
                  {[
                    "Buyer must pass identity verification (Nafath or manual ID review)",
                    "Remaining lease balance to be settled within 30 days of agreement",
                    "Transfer fee (SAR 2,500) is non-refundable once documents are submitted",
                    "Compound management approval required — typically 5-7 business days",
                    "Security deposit transfers to new tenant upon landlord confirmation",
                  ].map((condition, idx) => (
                    <Stack key={idx} direction="row" spacing={2} sx={{ alignItems: "center" }}>
                      <Box
                        sx={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          backgroundColor: "#F4F7F8",
                          color: COLORS.SECONDARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 700,
                          fontFamily: poppins700.style.fontFamily,
                          flexShrink: 0,
                        }}
                      >
                        {idx + 1}
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: poppins.style.fontFamily,
                          fontWeight: 500,
                          fontSize: "13.5px",
                          color: "#5A7A8A",
                        }}
                      >
                        {condition}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </Box>
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 3.8 }}>
          <Stack spacing={4}>
            <SellerOverviewCard
              sellerName={contractDetails?.createdBy?.name}
              isAdmin={isAdmin}
              contractStatus={contractDetails?.contractStatus}
              onApprove={handleApprove}
              onReject={() => showModal(<RejectContractModalContent onSubmit={submitReject} />)}
              onApplyForTransfer={() => setIsModalOpen(true)}
            />

            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 3.5,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
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
                  mb: 3,
                }}
              >
                Transfer Status
              </Typography>
              <Stack spacing={2.5}>
                {verticalSteps.map((step, idx) => (
                  <Stack key={idx} direction="row" spacing={2}>
                    <Box sx={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", width: 24, flexShrink: 0 }}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: step.status === "complete" ? "#10753E" : step.status === "current" ? "rgba(16, 117, 62, 0.15)" : "transparent",
                          border: step.status === "upcoming" ? "2px solid #EDF1F2" : "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: step.status === "complete" ? "#FFFFFF" : step.status === "current" ? "#10753E" : "transparent",
                          zIndex: 2,
                        }}
                      >
                        {step.status === "complete" && <CheckCircle sx={{ fontSize: 14 }} />}
                        {step.status === "current" && <Box sx={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10753E" }} />}
                      </Box>
                      {idx !== verticalSteps.length - 1 && (
                        <Box sx={{ position: "absolute", top: 24, bottom: -20, left: "50%", transform: "translateX(-50%)", width: 2, backgroundColor: step.status === "complete" ? "#10753E" : "#EDF1F2", zIndex: 1 }} />
                      )}
                    </Box>
                    <Box sx={{ pb: idx !== verticalSteps.length - 1 ? 2 : 0 }}>
                      <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "14px", color: step.status === "upcoming" ? "#A0B1B9" : COLORS.SECONDARY }}>
                        {step.label}
                      </Typography>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 500, fontSize: "12px", color: step.status === "upcoming" ? "#C5D1D7" : "#7A9BAB" }}>
                        {step.description}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>

            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "24px",
                p: 3.5,
                border: "1px solid #0135470D",
                boxShadow: "0px 4px 20px rgba(1, 53, 71, 0.02)",
              }}
            >
              <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 3 }}>
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
                <Typography sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "11px", color: COLORS.PRIMARY, cursor: "pointer", "&:hover": { opacity: 0.8 } }}>
                  View All
                </Typography>
              </Stack>
              <Stack spacing={2.5}>
                {[
                  { title: "3BR Apartment — Al Olaya District", price: "126,000 SAR", duration: "18 mo", img: "/images/shop_preview.png" },
                  { title: "Modern Villa — Al Narjis Compound", price: "252,000 SAR", duration: "24 mo", img: "/images/villa_preview.png" },
                  { title: "Furnished Studio — DQ District", price: "54,000 SAR", duration: "12 mo", img: "/images/shop_preview.png" },
                ].map((item, idx) => (
                  <Stack key={idx} direction="row" spacing={2} sx={{ alignItems: "center" }}>
                    <Box sx={{ width: 72, height: 50, borderRadius: "10px", overflow: "hidden", position: "relative", flexShrink: 0 }}>
                      <Image src={item.img} alt={item.title} fill sizes="72px" style={{ objectFit: "cover" }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography noWrap sx={{ fontFamily: poppins700.style.fontFamily, fontWeight: 700, fontSize: "13px", color: COLORS.SECONDARY, mb: 0.25 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ fontFamily: poppins.style.fontFamily, fontWeight: 600, fontSize: "11px", color: "#7A9BAB" }}>
                        {item.price} <Box component="span" sx={{ fontWeight: 500, color: "#A0B1B9", ml: 0.5 }}>· {item.duration}</Box>
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <WhatsAppButton />

      <ApplyTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};

export default ContractDetailLayout;
