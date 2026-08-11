import * as Yup from "yup";
import { ACCOUNT_TYPE } from "./enum";

export const registerValidationSchema = Yup.object().shape({
  accountType: Yup.mixed<ACCOUNT_TYPE>()
    .oneOf(Object.values(ACCOUNT_TYPE), "Invalid account type")
    .required("Account type is required"),
  name: Yup.string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .required("Full name is required"),
  phoneNo: Yup.string()
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

export const loginValidationSchema = Yup.object().shape({
  identity: Yup.string().trim().required("Mobile number or email is required"),
  password: Yup.string().required("Password is required"),
});

export const contractCreationValidationSchema = Yup.object().shape({
  contractType: Yup.string().trim().required("Please select contract type"),
  contractTitle: Yup.string().trim().required("Please enter contract title"),
  contractNumber: Yup.string().trim().required("Please enter contract number"),
  category: Yup.string().trim().required("Please select category"),
  city: Yup.string().trim().required("Please enter city"),
  district: Yup.string().trim().required("Please enter district"),
  description: Yup.string()
    .trim()
    .required("Please enter description")
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be at most 1000 characters"),
  totalValue: Yup.string().trim().required("Please enter total value"),
  monthlyAmount: Yup.string().trim().required("Please enter monthly amount"),
  contractStartDate: Yup.date()
    .required("Please select contract start date")
    .test("is-valid-date", "Invalid start date", (value) => {
      if (!value) return true;
      return !isNaN(value.getTime());
    }),
  contractEndDate: Yup.date()
    .required("Please select contract end date")
    .test("is-valid-date", "Invalid end date", (value) => {
      if (!value) return true;
      return !isNaN(value.getTime());
    })
    .test(
      "is-after-start-date",
      "End date must be after start date",
      function (value) {
        const startDate = this.parent.contractStartDate;
        if (!value || !startDate) return true;
        return value > startDate;
      },
    ),
});
