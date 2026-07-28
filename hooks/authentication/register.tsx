import { Authcontrollers } from "@/app/api/authControllers";
import { RegisterPayload } from "@/utils/types";
import { useState } from "react";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const register = async (data: RegisterPayload) => {
    setLoading(true);
    try {
      const res = await Authcontrollers.register(data);
      console.log("res", res);
      return res;
    } catch (err) {
      console.log("error in register ", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    loading,
  };
};
