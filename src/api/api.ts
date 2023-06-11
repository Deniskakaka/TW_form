import axios from "axios";
import { city, doctor, specialty } from "../types/types";

const baseUrl = "https://run.mocky.io/v3/";

const request = (id: string): Promise<city[] | specialty[] | doctor[]> => {
  return axios
    .get(`${baseUrl}${id}`)
    .then((response) => {
      const data: city[] | specialty[] | doctor[] = response.data;
      return data;
    })
    .catch((error) => {
      console.log("Error occurred:", error);
      throw error;
    });
};

export const getCityList = (func: (list: city[]) => void) => {
  return request("9fcb58ca-d3dd-424b-873b-dd3c76f000f4").then((res: city[]) => {
    res.unshift({ id: 0, name: "Select City" });
    func(res);
  });
};

export const getDoctorsSpecialtyList = (func: (list: specialty[]) => void) => {
  return request("e8897b19-46a0-4124-8454-0938225ee9ca").then(
    (res: specialty[]) => {
      res.unshift({ id: 0, name: "Select specialty" });
      func(res);
    }
  );
};

export const getListDoctors = (func: (list: doctor[]) => void) => {
  return request("3d1c993c-cd8e-44c3-b1cb-585222859c21").then((res) => {
    res.unshift({
      cityId: 0,
      id: 0,
      isPediatrician: false,
      name: "Select doctor",
      specialityId: 0,
      surname: "",
    });
    func(res as doctor[]);
  });
};
