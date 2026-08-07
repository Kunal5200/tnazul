import { Authcontrollers } from "@/app/api/authControllers";
import { useModal } from "@/store/useModal";
import { VerifyOtpPayload } from "@/utils/types";
import { useState } from "react";

export const useVerifyOtp = () => {
  const [loading, setLoading] = useState(false);
  const { hideModal } = useModal();

  const verifyOtp = async (data: VerifyOtpPayload) => {
    setLoading(true);
    try {
      const res = await Authcontrollers.verifyOtp(data);
      hideModal();
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
