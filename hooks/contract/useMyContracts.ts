import { contractControllers } from "@/app/api/contractControllers";
import { useState, useCallback } from "react";

export const useMyContracts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [contractsData, setContractsData] = useState<any>(null);
  const [myContractsList, setMyContractsList] = useState<any[]>([]);

  const fetchMyContracts = useCallback(
    async (params?: { page?: number; limit?: number; status?: string }) => {
      setLoading(true);
      try {
        const res = await contractControllers.getMyContracts(params);
        console.log("fetchMyContracts response", res);
        
        // Handle various response data structures safely (API returns res.data.docs)
        const rawList =
          res?.data?.docs ||
          res?.data?.contracts ||
          res?.data?.list ||
          res?.contracts ||
          (Array.isArray(res?.data) ? res.data : []) ||
          (Array.isArray(res) ? res : []) ||
          [];

        const list = Array.isArray(rawList) ? rawList : [];
        setMyContractsList(list);
        setContractsData(res?.data || res);
        return res;
      } catch (err) {
        console.error("Error fetching myContracts:", err);
        setMyContractsList([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    fetchMyContracts,
    myContractsList,
    contractsData,
    loading,
    setLoading,
  };
};
