import { ChangePasswordPayload, LoginPayload, RegisterPayload, RenewTokenPayload, VerifyOtpPayload } from "@/utils/types";
import { authPublicAPI, authSecuredAPI } from "./config";

export const Authcontrollers = {
  register: async (data: RegisterPayload) => {
    try {
      let result = await authPublicAPI.post("/register", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  login: async (data: LoginPayload) => {
    try {
      let result = await authPublicAPI.post("/login", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  verifyOtp: async (data: VerifyOtpPayload) => {
    try {
      let result = await authPublicAPI.post("/verify", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  renewToken: async (data: RenewTokenPayload) => {
    try {
      let result = await authPublicAPI.post("/renewToken", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
  changePassword: async (data: ChangePasswordPayload) => {
    try {
      let result = await authSecuredAPI.post("/changePassword", data);
      return result.data;
    } catch (error) {
      throw error;
    }
  },
};