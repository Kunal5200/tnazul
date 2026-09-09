"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Grid } from "@mui/material";
import {
  CheckCircle,
  VisibilityOutlined,
  AccessTimeOutlined,
} from "@mui/icons-material";
import Image from "next/image";
import { COLORS } from "@/utils/enum";
import { poppins, poppins700 } from "@/utils/fonts";
import WhatsAppButton from "@/components/layout/dashboard/contracts/WhatsAppButton";
import { useParams, useRouter } from "next/navigation";
import {
  useContractDetails,
  useContractPublicList,
} from "@/hooks/contract/useContractList";
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
import { ContractTitleSection } from "./components/ContractTitleSection";
import { ContractDescription } from "./components/ContractDescription";
import { TransferConditions } from "./components/TransferConditions";
import { TransferStatusTimeline } from "./components/TransferStatusTimeline";
import { SimilarListings } from "./components/SimilarListings";

interface VerticalStep {
  label: string;
  description: string;
  status: "complete" | "current" | "upcoming";
}

const ContractDetailLayout = () => {
  const { showModal, hideModal } = useModal();
  const { id } = useParams();
  const router = useRouter();
  const { fetchContractDetails, loading, contractDetails } =
    useContractDetails();
  const { fetchContractPublicList, contractPublicData } =
    useContractPublicList();
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

  useEffect(() => {
    if (contractDetails?.category) {
      fetchContractPublicList({
        page: 1,
        limit: 3,
        category: contractDetails.category,
      });
    } else if (contractDetails) {
      fetchContractPublicList({ page: 1, limit: 3 });
    }
  }, [contractDetails, fetchContractPublicList]);

  const isAdmin = userData?.roleName === ACCOUNT_TYPE.ADMINISTRATOR;

  const handleApprove = async () => {
    if (!id) return;
    await approveDisapproveContract(id as string, CONTRACT_STATUS.APPROVED);
    router.push("/admin/approvals");
  };

  const submitReject = async (reason: string) => {
    if (!id || !reason.trim()) return;
    await approveDisapproveContract(
      id as string,
      CONTRACT_STATUS.REJECTED,
      reason,
    );
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
    {
      label: "Interest Received",
      description: "3 interested buyers",
      status: "complete",
    },
    {
      label: "Documents Shared",
      description: "Pending review",
      status: "current",
    },
    {
      label: "Approval Pending",
      description: "Landlord & bank",
      status: "upcoming",
    },
    {
      label: "Transfer Completed",
      description: "Ownership changed",
      status: "upcoming",
    },
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

            <ContractTitleSection
              title={contractDetails?.contractTitle}
              createdAt={contractDetails?.createdAt}
            />

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

            <ContractDescription
              description={contractDetails?.contractDescription}
            />

            <TransferConditions />
          </Stack>
        </Grid>

        <Grid size={{ xs: 12, md: 3.8 }}>
          <Stack spacing={4}>
            <SellerOverviewCard
              sellerName={contractDetails?.createdBy?.name}
              isAdmin={isAdmin}
              contractStatus={contractDetails?.contractStatus}
              onApprove={handleApprove}
              onReject={() =>
                showModal(
                  <RejectContractModalContent onSubmit={submitReject} />,
                )
              }
              onApplyForTransfer={() => {
                const token =
                  typeof window !== "undefined"
                    ? localStorage.getItem("token") ||
                      localStorage.getItem("accessToken")
                    : null;
                if (!token) {
                  router.push("/login");
                } else {
                  setIsModalOpen(true);
                }
              }}
            />

            <TransferStatusTimeline steps={verticalSteps as any} />

            <SimilarListings contractPublicData={contractPublicData} />
          </Stack>
        </Grid>
      </Grid>

      <WhatsAppButton />

      <ApplyTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        contractId={id as string}
      />
    </Box>
  );
};

export default ContractDetailLayout;
