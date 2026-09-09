import { adminControllers } from "@/app/api/adminController";
import { useState } from "react";

export interface DashboardData {
  activeContract: number;
  pendingContract: number;
  userCount: number;
}

export const useDashboardCounts = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);

  const fetchDashboard = () => {
    setLoading(true);
    adminControllers
      .getDashboardCounts()
      .then((res) => {
        if (res?.data) {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error in dashboard count", err);
        setLoading(false);
      });
  };
  return {
    loading,
    data,
    fetchDashboard,
  };
};
