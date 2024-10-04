import * as Yup from "yup";

export const step1Schema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^0\d{9}$/, "Phone number must start with 0 and have 10 digits")
    .required("Phone number is required"),
  createAccount: Yup.boolean(),
  password: Yup.string().when("createAccount", {
    is: true,
    then: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  }),
});

export const step2Schema = Yup.object().shape({
  fraudPhoneNumber: Yup.string()
    .matches(/^0\d{9}$/, "Phone number must start with 0 and have 10 digits")
    .required("Phone number is required"),
  mobileMoneyProvider: Yup.string().required(
    "Mobile money provider is required"
  ),
  fraudFirstName: Yup.string().required("First name is required"),
  fraudLastName: Yup.string().required("Last name is required"),
  fraudDescription: Yup.string().required("Description of fraud is required"),
  fraudImage: Yup.mixed(),
  fraudEvidence: Yup.mixed(),
});
