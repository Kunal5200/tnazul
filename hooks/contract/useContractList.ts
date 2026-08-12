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
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in get contract", err);
        setLoading(false);
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

export const useContractDetails = () => {
  const [loading, setLoading] = useState(true);
  const [contractDetails, setContractDetails] = useState<any>(null);
  const fetchContractDetails = (id: string | string[] | undefined) => {
    setLoading(true);
    contractControllers
      .getContractDetailsById(id)
      .then((res) => {
        // console.log("res", res);
        setContractDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in get contract details", err);
        setLoading(false);
      });
  };
  return {
    fetchContractDetails,
    contractDetails,
    loading,
    setLoading,
    setContractDetails,
  };
};
