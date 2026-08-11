import { contractControllers } from "@/app/api/contractControllers";
import { ContractPayload } from "@/utils/types";
import { useState } from "react";
import { useSnackbarStore } from "@/store/snackbarStore";
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
        const message =
          res?.data?.message || res?.message || "Contract saved successfully!";

        router.push("/dashboard/profile/my-contracts");
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
