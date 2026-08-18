import { contractControllers } from "@/app/api/contractControllers";
import { APPLY_TRANSFER } from "@/utils/types";
import { useState } from "react";

export const useApplyTransfer = () => {
  const [loading, setLoading] = useState(false);

  const applyTransfer = async (data: APPLY_TRANSFER) => {
    setLoading(true);
    try {
      const res = await contractControllers.applyTransfer(data);
      console.log("res", res);
      return res;
    } catch (err) {
      console.log("error in apply Transfer", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    applyTransfer,
    loading,
  };
};
