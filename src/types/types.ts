export type city = {
  id: number;
  name: string;
};

export type gender = {
  id: number;
  type: string;
};

export type specialty = {
  id: number;
  name: string;
  params?: {
    gender: string;
  };
};

export type doctor = {
  cityId: number;
  id: number;
  isPediatrician: boolean;
  name: string;
  specialityId: number;
  surname: string;
};
