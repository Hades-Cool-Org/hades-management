import { TextField, TextFieldProps } from "@mui/material";

interface TextFieldValues {
  label: string;
  fieldName: string;
  value?: string;
  handleChange: (fieldName: string, value: string) => any;
  number?: boolean;
}

const TextFieldStandard: React.FC<TextFieldValues> = (
  props: TextFieldValues
) => {
  const { fieldName, label, value, handleChange, number } = props;
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
    />
  );
};

export default TextFieldStandard;
