import { Authcontrollers } from "@/app/api/authControllers";
import { LoginPayload } from "@/utils/types";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);

  const login = async (data: LoginPayload) => {
    setLoading(true);
    try {
      const res = await Authcontrollers.login(data);
      console.log("login res", res);
      return res;
    } catch (err) {
      console.log("error in login", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    loading,
  };
};
