import { city, doctor, gender } from "../../types/types";

type Props = {
  title: string;
  options: city[] | gender[] | doctor[];
  id: string;
  name: string;
  htmlFor: string;
  value: string;
  change: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  touched: boolean | undefined;
  error: any;
};

export const FieldFormSelect: React.FC<Props> = ({
  title,
  options,
  id,
  name,
  htmlFor,
  value,
  change,
  touched,
  error,
}) => {
  return (
    <div className="mt-2 w-72 flex flex-col ml-4">
      <label htmlFor={htmlFor}>{title}</label>
      <select
        id={id}
        name={name}
        value={value}
        className="w-72 bg-slate-300 text-white p-1.5 rounded-lg mt-1.5 pt-2 pb-2 outline-none"
        onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
          change(event)
        }
      >
        {options.map((el: any) => (
          <option key={el.id}>
            {el.name || el.type} {el.surname}
          </option>
        ))}
      </select>
      <div className="text-red-500 h-5">
        {error && touched && <span>{error}</span>}
      </div>
    </div>
  );
};
