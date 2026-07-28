import * as Yup from "yup";
import { ACCOUNT_TYPE } from "./enum";

export const registerValidationSchema = Yup.object().shape({
  accountType: Yup.mixed<ACCOUNT_TYPE>()
    .oneOf(Object.values(ACCOUNT_TYPE), "Invalid account type")
    .required("Account type is required"),
  fullName: Yup.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  mobileNumber: Yup.string()
    .trim()
    .min(8, "Please enter a valid mobile number")
    .required("Mobile number is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  agreeTerms: Yup.boolean()
    .oneOf([true], "You must agree to the Terms & Conditions")
    .required("You must agree to the Terms & Conditions"),
});
