import { ReactElement, useEffect, useState } from "react";
import {
  getCityList,
  getDoctorsSpecialtyList,
  getListDoctors,
} from "./api/api";
import { FormDoctors } from "./components/form/Form";
import { city, doctor, gender, specialty } from "./types/types";

function App(): ReactElement {
  const [listCites, setListCites] = useState<city[]>([]);
  const [listSpecialty, setListSpeciality] = useState<specialty[]>([]);
  const [listDoctors, setListDoctors] = useState<doctor[]>([]);
  const [sex] = useState<gender[]>([
    { id: 1, type: "Male" },
    { id: 2, type: "Female" },
  ]);

  useEffect(() => {
    getCityList(setListCites);

    getDoctorsSpecialtyList(setListSpeciality);

    getListDoctors(setListDoctors);
  }, []);

  return (
    <div className="bg-black w-fit mx-auto mt-16">
      <FormDoctors
        listDoctors={listDoctors}
        listCites={listCites}
        listSpecialty={listSpecialty}
        sex={sex}
      />
    </div>
  );
}

export default App;
