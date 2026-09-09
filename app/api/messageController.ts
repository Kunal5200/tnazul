import { messageSecuredAPI } from "./config";
import { SENDMESSAGE } from "@/utils/types";

export const messageControllers = {
  sendMessage: async (data: SENDMESSAGE) => {
    try {
      let result = await messageSecuredAPI.post("/sendMessage", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
