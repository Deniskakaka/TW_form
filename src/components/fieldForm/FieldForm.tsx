type Props = {
  title: string;
  type: string;
  name: string;
  placeholder: string;
  htmlFor: string;
  id: string;
  value?: string;
  change: (event: React.ChangeEvent<HTMLInputElement>) => void;
  touched: boolean | undefined;
  error: any;
};

export const FieldForm: React.FC<Props> = ({
  title,
  type,
  name,
  placeholder,
  htmlFor,
  id,
  value,
  change,
  touched,
  error,
}) => {
  return (
    <div className="flex flex-col rounded mt-2 w-72 ml-4">
      <label htmlFor={htmlFor}>{title}</label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-72 rounded-lg border-#dbdedd pl-2 pt-2 pb-2 outline-none"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => change(event)}
        value={value}
      />
      <div className="text-red-500 h-5">
        {error && touched && <span>{error}</span>}
      </div>
    </div>
  );
};
