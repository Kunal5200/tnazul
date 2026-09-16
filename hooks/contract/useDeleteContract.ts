import { contractControllers } from "@/app/api/contractControllers";
import { useState } from "react";

export const useDeleteContract = () => {
  const [loading, setLoading] = useState(false);

  const deleteContract = async (contractId: string) => {
    setLoading(true);
    try {
      const res = await contractControllers.deleteContract(contractId);
      return res;
    } catch (err) {
      console.error("error in deleteContract", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteContract,
    loading,
  };
};
