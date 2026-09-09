import { ParamValue } from "next/dist/server/request/params";
import { contractSecuredAPI, dashboarSecuredAPI } from "./config";

export const adminControllers = {
  approveOrdisApproveContract: async (
    id: string | string[] | undefined,
    status: string,
    rejectReason?: string,
  ) => {
    try {
      let result = await contractSecuredAPI.post("/admin/approval", {
        id: id,
        status: status,
        rejectReason: rejectReason,
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getDashboardCounts: async () => {
    try {
      let result = await dashboarSecuredAPI.get("/getCounts");
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
};
