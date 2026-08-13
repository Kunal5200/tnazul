import { contractControllers } from "@/app/api/contractControllers";
import { useState, useCallback } from "react";

export const useMySavedContracts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [savedData, setSavedData] = useState<any>(null);
  const [savedList, setSavedList] = useState<any[]>([]);

  const fetchMySavedContracts = useCallback(
    async (params?: { page?: number; pageSize?: number }) => {
      setLoading(true);
      try {
        const res = await contractControllers.getMySavedContracts(params);
        console.log("fetchMySavedContracts response", res);

        const rawList =
          res?.data?.docs ||
          res?.data?.contracts ||
          res?.data?.saved ||
          res?.data?.list ||
          (Array.isArray(res?.data) ? res.data : []) ||
          (Array.isArray(res) ? res : []) ||
          [];

        const list = Array.isArray(rawList) ? rawList : [];
        setSavedList(list);
        setSavedData(res?.data || res);
        return res;
      } catch (err) {
        console.error("Error fetching mySaved:", err);
        setSavedList([]);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return {
    fetchMySavedContracts,
    savedList,
    savedData,
    loading,
    setLoading,
    setSavedList,
  };
};
