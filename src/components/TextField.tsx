import { TextField } from "@mui/material";

interface TextFieldProps {
  label: string;
  fieldName: string;
  value?: string | number;
  handleChange: (fieldName: string, value: string) => any;
  number?: boolean;
  required?: boolean;
}

const TextFieldStandard: React.FC<TextFieldProps> = ({
  fieldName,
  label,
  value,
  handleChange,
  number,
  required,
}: TextFieldProps) => {
  return (
    <TextField
      id="standard-basic"
      label={label}
      value={value}
      variant="standard"
      onChange={(e) => {
        handleChange(fieldName, e.target.value);
      }}
      type={number ? "number" : "text"}
      required={required}
    />
  );
};

export default TextFieldStandard;
