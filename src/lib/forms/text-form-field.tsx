import { TextField, TextFieldProps } from "@material-ui/core";
import asFormikField, { AsFormikField } from "./asField";

const TextFormField: AsFormikField<TextFieldProps> = ({
  form,
  field,
  meta,
  error,
  touched,
  ...inputProps
}) => {
  return (
    <TextField {...field} error={!!error} helperText={error} {...inputProps} />
  );
};

export default asFormikField(TextFormField);
