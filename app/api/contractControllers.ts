import { contractSecuredAPI } from "./config";
import { services } from "./serverconstant";
import {
  ASSEST_INFO,
  ContractPayload,
  GET_API_REQUEST_RESPONSE,
} from "@/utils/types";

export const contractControllers = {
  addOrCreateControllers: async (body: ContractPayload) => {
    try {
      let result = await contractSecuredAPI.post("/createOrUpdate", body);
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },
  getContractList: async (data: GET_API_REQUEST_RESPONSE) => {
    try {
      const result = await contractSecuredAPI.get("/getList", {
        params: {
          page: data.page,
          limit: data.limit,
          status: data.status,
        },
      });
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },
  uploadAssest: async (data: ASSEST_INFO) => {
    try {
      const formData = new FormData();
      formData.append("contractNumber", data.contractNumber);
      data.asset.forEach((file) => {
        formData.append("asset", file);
      });

      const result = await contractSecuredAPI.post("/uploadFiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
