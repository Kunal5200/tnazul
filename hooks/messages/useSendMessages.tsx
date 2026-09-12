import { messageControllers } from "@/app/api/messageController";
import { SENDMESSAGE } from "@/utils/types";
import { useState } from "react";

export const useSendMessages = () => {
  const [loading, setLoading] = useState(false);

  const sendMessage = (data: SENDMESSAGE) => {
    messageControllers
      .sendMessage(data)
      .then((res) => {
        console.log("response?????>", res);
      })
      .catch((err) => {
        console.log("error in sending message ", err);
      });
  };

  return { loading, sendMessage };
};
