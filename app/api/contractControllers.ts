import { TrySharp } from "@mui/icons-material";
import { contractPublicAPI, contractSecuredAPI } from "./config";
import { services } from "./serverconstant";
import {
  APPLY_TRANSFER,
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
  getMyContracts: async (params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    try {
      const result = await contractSecuredAPI.get("/myContracts", {
        params: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          ...(params?.status ? { status: params.status } : {}),
        },
      });
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },
  saveContract: async (contractId: string, isSaved: boolean) => {
    try {
      const result = await contractSecuredAPI.post("/save", {
        contractId,
        isSaved,
      });
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },
  getMySavedContracts: async (params?: {
    page?: number;
    pageSize?: number;
  }) => {
    try {
      const result = await contractSecuredAPI.get("/mySaved", {
        params: {
          page: params?.page || 1,
          pageSize: params?.pageSize || 10,
        },
      });
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },

  applyTransfer: async (data: APPLY_TRANSFER) => {
    try {
      const formData = new FormData();
      formData.append("contractId", data.contractId);
      if (data.transferId) {
        formData.append("transferId", data.transferId);
      }
      formData.append("status", data.status);
      if (data.signtaure) {
        formData.append("signature", data.signtaure);
      }
      if (data.documents && data.documents.length > 0) {
        data.documents.forEach((doc) => {
          formData.append("documents", doc);
        });
      }

      let result = await contractSecuredAPI.post("/transfer/apply", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return result?.data;
    } catch (error) {
      throw error;
    }
  },
  getPublicContractList: async (data: GET_API_REQUEST_RESPONSE) => {
    try {
      const result = await contractPublicAPI.post(
        "/public/getContractList",
        data,
      );
      return result?.data || result;
    } catch (error) {
      throw error;
    }
  },
};
