import { messageControllers } from "@/app/api/messageController";
import { useState } from "react";

export const useGetMessagesList = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>();
  const getMessageList = ({ page, limit }: { page: number; limit: number }) => {
    setLoading(true);
    messageControllers
      .getMessageList({ page, limit })
      .then((res) => {
        console.log("res", res);
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error in get messages list", err);
      });
  };
  return {
    getMessageList,
    data,
    loading,
  };
};

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();

  const getMessages = (id: string) => {
    setLoading(true);
    messageControllers
      .getMessages(id)
      .then((res: any) => {
        console.log("res", res);
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  return {
    getMessages,
    loading,
    data,
  };
};
