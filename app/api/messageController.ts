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
  getMessageList: async ({ page, limit }: { page: number; limit: number }) => {
    try {
      let result = await messageSecuredAPI.get(
        `/getMessageList?page=${page}&limit=${limit}`,
      );
      return result.data;
    } catch (error) {
      throw error;
    }
  },

  getMessages: async (id: string) => {
    try {
      let result = await messageSecuredAPI.get(`/getMessages?receiverId=${id}`);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};
