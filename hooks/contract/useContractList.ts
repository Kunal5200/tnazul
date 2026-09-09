import { contractControllers } from "@/app/api/contractControllers";
import { GET_API_REQUEST_RESPONSE } from "@/utils/types";
import { useState } from "react";
import { useUserStore } from "@/store/userStore";

export const useContractList = () => {
  const [loading, setLoading] = useState(true);
  const [contractData, setContractData] = useState<any>(null);
  const fetchContractDetails = (data: GET_API_REQUEST_RESPONSE) => {
    setLoading(true);
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
  const { userData } = useUserStore();

  const fetchContractDetails = (id: string | string[] | undefined) => {
    setLoading(true);
    const token = typeof window !== "undefined" ? localStorage.getItem("token") || localStorage.getItem("accessToken") : null;

    if (token) {
      contractControllers
        .getContractDetailsById(id)
        .then((res) => {
          setContractDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error in get contract details", err);
          setLoading(false);
        });
    } else {
      contractControllers
        .getPublicContractDetails(id)
        .then((res) => {
          setContractDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error in get contract details", err);
          setLoading(false);
        });
    }
  };
  return {
    fetchContractDetails,
    contractDetails,
    loading,
    setLoading,
    setContractDetails,
  };
};

export const useContractPublicList = () => {
  const [loading, setLoading] = useState(false);
  const [contractPublicData, setContractPublicData] = useState<any>(null);
  const fetchContractPublicList = (data: GET_API_REQUEST_RESPONSE) => {
    setLoading(true);
    contractControllers
      .getPublicContractList(data)
      .then((res) => {
        setContractPublicData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in get contract details", err);
        setLoading(false);
      });
  };
  return {
    fetchContractPublicList,
    contractPublicData,
    loading,
    setLoading,
    setContractPublicData,
  };
};
