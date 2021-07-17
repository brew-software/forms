import asFormikField, { AsFormikField } from "./asField";
import { PasswordFieldProps, PasswordField } from "../inputs";

const PasswordFormField: AsFormikField<PasswordFieldProps> = ({
  form,
  field,
  meta,
  error,
  touched,
  ...inputProps
}) => {
  return (
    <PasswordField
      {...field}
      error={!!error}
      helperText={error}
      {...inputProps}
    />
  );
};

export default asFormikField(PasswordFormField);
