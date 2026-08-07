import { contractControllers } from "@/app/api/contractControllers";
import { ContractPayload } from "@/utils/types";
import { useState } from "react";
import { useSnackbarStore } from "@/store/snackbarStore";
import { contractSecuredAPI } from "@/app/api/config";
import { useRouter } from "next/navigation";

export const useCreateContract = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { showSuccess, showError } = useSnackbarStore();
  const router = useRouter();
  const createContract = async (data: ContractPayload) => {
    setLoading(true);
    setError(null);

    contractControllers
      .addOrCreateControllers(data)
      .then((res) => {
        const newData = {
          contractNumber: data.contractNumber || "",
          asset: (data.assetPhotos as File[]) || [],
        };
        contractControllers
          .uploadAssest(newData)
          .then((res) => {
            router.push("/dashboard/profile/my-contracts");
          })
          .catch((err) => {
            console.log("error in uploading file", err);
            setLoading(false);
          });
        const message =
          res?.data?.message || res?.message || "Contract saved successfully!";
        showSuccess(message);
        setLoading(false);
      })
      .catch((err) => {
        const errorMessage =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to save contract. Please try again.";
        setError(errorMessage);
        showError(errorMessage);
        setLoading(false);
      });
  };

  return {
    createContract,
    addOrCreateContract: createContract,
    loading,
    error,
  };
};

export default useCreateContract;
