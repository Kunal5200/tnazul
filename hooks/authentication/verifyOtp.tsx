import { Authcontrollers } from "@/app/api/authControllers";
import { VerifyOtpPayload } from "@/utils/types";
import { useState } from "react";

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);

  const verifyOtp = async (data: VerifyOtpPayload) => {
    setLoading(true);
    try {
      const res = await Authcontrollers.verifyOtp(data);
      console.log("verify otp res", res);
      return res;
    } catch (err) {
      console.log("error in verify otp", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyOtp,
    loading,
  };
};
