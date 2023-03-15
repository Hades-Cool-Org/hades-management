import { TextField, TextFieldProps } from "@mui/material";

interface TextFieldValues {
  label: string;
  handleChange:(event:any)=>any;
}

const TextFieldStandard: React.FC<TextFieldValues> = (
  props: TextFieldValues
) => {
  const { label, handleChange } = props;
  return (
    <TextField
      id="standard-basic"
      label={label}
      variant="standard"
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    />
  );
};

export default TextFieldStandard;
