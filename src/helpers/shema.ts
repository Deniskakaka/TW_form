import * as Yup from "yup";

export const validationShema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[^0-9]*$/, "Name cannot contain numbers")
    .required("Field is required"),
  birthDay: Yup.date().required("Field is required"),
  city: Yup.string()
    .test(
      "not-select-city",
      "Please select a city",
      (value) => value !== "Select City"
    )
    .required("Field is required"),
  doctor: Yup.string()
    .test(
      "not-select-doctor",
      "Please select a doctor",
      (value) => value !== "Select doctor"
    )
    .required("Field is required"),
  email: Yup.string().email("Invalid email").required("Field is required"),
  phone: Yup.string()
    .matches(/^\+[1-9]\d{1,14}$/, "Invalid mobile number")
    .required("Mobile number is required"),
});
