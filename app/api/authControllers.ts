import { RegisterPayload } from "@/utils/types";
import { authPublicAPI } from "./config";

export const Authcontrollers = {
  register: async (data: RegisterPayload) => {
    try {
      let result = await authPublicAPI.post("/register", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
