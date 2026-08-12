import { ParamValue } from "next/dist/server/request/params";
import { contractSecuredAPI } from "./config";

export const adminControllers = {
  approveOrdisApproveContract: async (id: string | string[] | undefined, status: string, rejectReason?: string) => {
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
};
