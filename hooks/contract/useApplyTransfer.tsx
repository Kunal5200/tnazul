import { contractControllers } from "@/app/api/contractControllers";
import { APPLY_TRANSFER, GET_API_REQUEST_RESPONSE } from "@/utils/types";
import { useState } from "react";

export const useApplyTransfer = () => {
  const [loading, setLoading] = useState(false);

  const applyTransfer = async (data: APPLY_TRANSFER) => {
    setLoading(true);
    try {
      const res = await contractControllers.applyTransfer(data);
      return res;
    } catch (err) {
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

export const useGetContractTransferRequests = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();

  const getTransferRequests = async (params: any) => {
    setLoading(true);
    try {
      const res = await contractControllers.getTransferRequest(params);
      setData(res?.data || res);
    } catch (err) {
      console.log("error in get transfer requests", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    getTransferRequests,
    loading,
    data,
  };
};
