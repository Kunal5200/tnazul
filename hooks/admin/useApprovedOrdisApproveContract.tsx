import { adminControllers } from "@/app/api/adminController";
import { useState } from "react";
import { useSnackbarStore } from "@/store/snackbarStore";

export const useApproveDisapproveContract = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { showSuccess, showError } = useSnackbarStore();

  const approveDisapproveContract = (
    id: string | string[] | undefined,
    status: string,
    rejectReason?: string,
  ) => {
    setLoading(true);
    return adminControllers
      .approveOrdisApproveContract(id, status, rejectReason)
      .then((res) => {
        setIsSuccess(true);
        setLoading(false);
        showSuccess(`Contract ${status.toLowerCase()} successfully`);
        return res;
      })
      .catch((err) => {
        setLoading(false);
        setIsSuccess(false);
        showError(err?.response?.data?.message || `Failed to ${status.toLowerCase()} contract`);
        throw err;
      });
  };
  return {
    approveDisapproveContract,
    loading,
    isSuccess,
    setLoading,
    setIsSuccess,
  };
};
