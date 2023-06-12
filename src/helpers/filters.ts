import moment from "moment";
import { city, doctor, specialty } from "../types/types";

export const getDoctor = (list: doctor[], name: string): doctor => {
  return list.filter(
    (doctor: doctor) => `${doctor.name} ${doctor.surname}` === name
  )[0];
};

export const getCity = (list: city[], id: number): city => {
  return list.filter((city: city) => city.id === id)[0];
};

export const getSpecialty = (list: specialty[], id: number): specialty => {
  return list.filter((speciality: specialty) => speciality.id === id)[0];
};

export const filterSpeciality = (
  gender: string,
  listSpecialty: specialty[]
): specialty[] => {
  return listSpecialty.filter((spec: specialty) => {
    if (spec.params) {
      if (spec.params.gender === gender) {
        return spec;
      } else {
        return null;
      }
    }

    return spec;
  });
};

export const filterListDoctors = (
  speciality: string,
  date: string,
  city: string,
  gender: string,
  listDoctors: doctor[],
  listSpecialty: specialty[],
  listCity: city[]
): doctor[] => {
  const copy = [...listDoctors];
  const filterSpeciality = filterBySpecialty(speciality, copy, listSpecialty);
  const filterDate = filterByDate(date, filterSpeciality);
  const filterCity = filterByCity(city, filterDate, listCity);
  const filterGender = filterByGender(gender, filterCity, listSpecialty);

  return filterGender;
};

const filterBySpecialty = (
  specialty: string,
  listDoctors: doctor[],
  listSpecialty: specialty[]
): doctor[] => {
  const result = [...listDoctors];

  if (specialty === "Select specialty") {
    return listDoctors;
  } else {
    return result.filter(
      (doc: doctor) =>
        getSpecialty(listSpecialty, doc.specialityId).name === specialty ||
        doc.name === "Select doctor"
    );
  }
};

const filterByCity = (
  city: string,
  listDoctors: doctor[],
  listCity: city[]
): doctor[] => {
  let result = [...listDoctors];

  if (city === "Select City") {
    return listDoctors;
  } else {
    return result.filter(
      (doc: doctor) =>
        getCity(listCity, doc.cityId).name === city ||
        doc.name === "Select doctor"
    );
  }
};

const filterByDate = (date: string, listDoctors: doctor[]): doctor[] => {
  const today = moment();
  const userDate = moment(date);
  let result = [...listDoctors];

  if (date) {
    if (today.diff(userDate, "years") < 18) {
      return result.filter(
        (doc: doctor) => doc.isPediatrician || doc.name === "Select doctor"
      );
    } else {
      return result.filter(
        (doc: doctor) => !doc.isPediatrician || doc.name === "Select doctor"
      );
    }
  }

  return listDoctors;
};

const filterByGender = (
  gender: string,
  listDoctors: doctor[],
  listSpecialty: specialty[]
): doctor[] => {
  return listDoctors.filter((doc: doctor) => {
    const specDoctor = getSpecialty(listSpecialty, doc.specialityId).params;
    if (specDoctor) {
      if (specDoctor.gender === gender) {
        return doc;
      } else {
        return null;
      }
    }
    return doc;
  });
};
