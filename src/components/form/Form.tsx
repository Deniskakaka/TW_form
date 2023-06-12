import { useFormik } from "formik";
import {
  filterListDoctors,
  filterSpeciality,
  getCity,
  getDoctor,
  getSpecialty,
} from "../../helpers/filters";
import { validationShema } from "../../helpers/shema";
import { city, doctor, gender, specialty } from "../../types/types";
import { FieldForm } from "../fieldForm/FieldForm";
import { FieldFormSelect } from "../filedFormSelect/FiledFormSelect";

type Props = {
  listDoctors: doctor[];
  listCites: city[];
  listSpecialty: specialty[];
  sex: gender[];
};

export const FormDoctors: React.FC<Props> = ({
  listDoctors,
  listCites,
  listSpecialty,
  sex,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      birthDay: "",
      sex: "Male",
      city: "Select City",
      doctorSpecialty: "Select specialty",
      doctor: "",
      email: "",
      phone: "",
    },
    validationSchema: validationShema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      formik.resetForm();
    },
  });

  const handleDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue("birthDay", event.target.value);
    formik.setFieldValue("doctor", "Select doctor");
    formik.setFieldValue("city", "Select City");
    formik.setFieldValue("doctorSpecialty", "Select specialty");
  };

  const handleGender = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("sex", event.target.value);
    formik.setFieldValue("doctor", "Select doctor");
    formik.setFieldValue("city", "Select City");
    formik.setFieldValue("doctorSpecialty", "Select specialty");
  };

  const handleCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("city", event.target.value);
    formik.setFieldValue("doctor", "Select doctor");
  };

  const handleDoctor = (event: React.ChangeEvent<HTMLSelectElement>) => {
    formik.setFieldValue("doctor", event.target.value);

    const selectedDoctor = getDoctor(listDoctors, event.target.value);

    if (selectedDoctor) {
      const city = getCity(listCites, selectedDoctor.cityId);
      const specialty = getSpecialty(
        listSpecialty,
        selectedDoctor.specialityId
      );

      formik.setFieldValue("doctorSpecialty", specialty.name);
      formik.setFieldValue("city", city.name);
    }
  };

  return (
    <form
      onSubmit={formik.errors && formik.handleSubmit}
      className="flex flex-col items-center max-w-2xl mx-auto"
    >
      <div className="flex flex-wrap justify-center">
        <FieldForm
          title="Name"
          type="text"
          name="name"
          placeholder="name"
          htmlFor="name"
          id="name"
          value={formik.values.name}
          change={formik.handleChange}
          touched={formik.touched.name}
          error={formik.errors.name}
        />
        <FieldForm
          title="Email"
          type="text"
          name="email"
          placeholder="email"
          htmlFor="email"
          id="email"
          value={formik.values.email}
          change={formik.handleChange}
          touched={formik.touched.email}
          error={formik.errors.email}
        />
        <FieldForm
          title="Date"
          type="date"
          name="birthDay"
          placeholder="birthDay"
          htmlFor="birthDay"
          id="birthDay"
          value={formik.values.birthDay}
          change={handleDate}
          touched={formik.touched.birthDay}
          error={formik.errors.birthDay}
        />
        <FieldForm
          title="Phone number"
          type="tel"
          name="phone"
          placeholder="+380..."
          htmlFor="phone"
          id="phone"
          value={formik.values.phone}
          change={formik.handleChange}
          touched={formik.touched.phone}
          error={formik.errors.phone}
        />
      </div>
      <div className="flex flex-wrap justify-center">
        <FieldFormSelect
          title="Gender"
          options={sex}
          id="sex"
          name="sex"
          htmlFor="sex"
          value={formik.values.sex}
          change={handleGender}
          touched={formik.touched.sex}
          error={formik.errors.sex}
        />
        <FieldFormSelect
          title="City"
          options={listCites}
          id="city"
          name="city"
          htmlFor="city"
          value={formik.values.city}
          change={handleCity}
          touched={formik.touched.city}
          error={formik.errors.city}
        />
        <FieldFormSelect
          title="Doctor specialty"
          options={filterSpeciality(formik.values.sex, listSpecialty)}
          id="doctorSpecialty"
          name="doctorSpecialty"
          htmlFor="cidoctorSpecialtyty"
          value={formik.values.doctorSpecialty}
          change={formik.handleChange}
          touched={formik.touched.doctorSpecialty}
          error={formik.errors.doctorSpecialty}
        />
        <FieldFormSelect
          title="Doctor"
          options={filterListDoctors(
            formik.values.doctorSpecialty,
            formik.values.birthDay,
            formik.values.city,
            formik.values.sex,
            listDoctors,
            listSpecialty,
            listCites
          )}
          id="Doctor"
          name="Doctor"
          htmlFor="Doctor"
          value={formik.values.doctor}
          change={handleDoctor}
          touched={formik.touched.doctor}
          error={formik.errors.doctor}
        />
      </div>
      <button
        type="submit"
        className="bg-indigo-700 w-72 h-10 text-white rounded-lg mt-4 mb-5"
      >
        Submit
      </button>
    </form>
  );
};
