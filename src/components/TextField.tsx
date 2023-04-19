import { TextField, TextFieldProps } from "@mui/material";

interface TextFieldValues {
  label: string;
  fieldName: string;
  value?: string;
  handleChange: (fieldName: string, value: string) => any;
}

const TextFieldStandard: React.FC<TextFieldValues> = (
  props: TextFieldValues
) => {
  const { fieldName, label, value, handleChange } = props;
  return (
    <TextField
      id="standard-basic"
      label={label}
      value={value}
      variant="standard"
      onChange={(e) => {
        handleChange(fieldName, e.target.value);
      }}
    />
  );
};

export default TextFieldStandard;
