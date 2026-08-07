import { Authcontrollers } from "@/app/api/authControllers";
import { RegisterPayload } from "@/utils/types";
import { useState } from "react";
import { useSnackbarStore } from "@/store/snackbarStore";
import { useModal } from "@/store/useModal";
import VerifyOtpForm from "@/components/layout/registerLayout/VerifyOtpForm";

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useSnackbarStore();
  const { showModal } = useModal();

  const register = async (data: RegisterPayload) => {
    setLoading(true);
    try {
      const res = await Authcontrollers.register(data);

      showSuccess(res?.data?.OTP);
      showModal(
        <VerifyOtpForm
          referenceId={res?.data?.referenceId}
          mobileNumber={res?.data?.phoneNo}
        />,
      );
      return res;
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed. Please try again.";
      showError(errorMessage);
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
