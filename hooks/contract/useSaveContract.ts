import { contractControllers } from "@/app/api/contractControllers";
import { useState } from "react";

export const useSaveContract = () => {
  const [loading, setLoading] = useState(false);

  const saveContract = async (contractId: string, isSaved: boolean) => {
    setLoading(true);
    try {
      const res = await contractControllers.saveContract(contractId, isSaved);
      console.log("saveContract response", res);
      return res;
    } catch (err) {
      console.error("error in saveContract", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveContract,
    loading,
  };
};
