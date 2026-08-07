import { contractControllers } from "@/app/api/contractControllers";
import { GET_API_REQUEST_RESPONSE } from "@/utils/types";
import { useState } from "react";

export const useContractList = () => {
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState<any>(null);
  const fetchContractDetails = (data: GET_API_REQUEST_RESPONSE) => {
    contractControllers
      .getContractList(data)
      .then((res) => {
        // console.log("res", res);
        setContractData(res.data);
      })
      .catch((err) => {
        console.log("error in get contract", err);
      });
  };
  return {
    fetchContractDetails,
    contractData,
    loading,
    setLoading,
    setContractData,
  };
};
