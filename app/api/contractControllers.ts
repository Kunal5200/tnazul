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
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (value === undefined || value === null || value === "") return;

        if (key === "asset" && Array.isArray(value)) {
          value.forEach((item) => {
            if (item && item.file) {
              formData.append("asset", item.file);
            }
          });
        } else if (key === "contract") {
          if (value && value.file) {
            formData.append("contract", value.file);
          }
        } else {
          formData.append(key, value.toString());
        }
      });

      let result = await contractSecuredAPI.post("/createOrUpdate", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
      if (data.asset) {
        data.asset.forEach((file) => {
          formData.append("asset", file);
        });
      }
      if (data.contract) {
        data.contract.forEach((file) => {
          formData.append("contract", file);
        });
      }

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
  getContractDetailsById: async (id: string | string[] | undefined) => {
    try {
      let result = await contractSecuredAPI.get(`/details/${id}`);
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },
};
