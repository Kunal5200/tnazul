import { UpdateProfilePayload } from "@/utils/types";
import { userSecuredAPI } from "./config";

export const Usercontrollers = {
  getUserDetail: async () => {
    try {
      let result = await userSecuredAPI.get("/getUserDetail");
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async (data: UpdateProfilePayload) => {
    try {
      let result = await userSecuredAPI.put("/updateProfile", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  updatePhoto: async (formData: FormData) => {
    try {
      let result = await userSecuredAPI.post("/updatePhoto", formData, {
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
