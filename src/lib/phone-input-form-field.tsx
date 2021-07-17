import { PhoneInput, PhoneInputProps } from "../inputs";
import asFormikField, { AsFormikField } from "./asField";

const PhoneInputFormField: AsFormikField<PhoneInputProps> = ({
  form,
  field,
  meta,
  error,
  touched,
  ...inputProps
}) => {
  return (
    <PhoneInput {...field} error={!!error} helperText={error} {...inputProps} />
  );
};

export default asFormikField(PhoneInputFormField);
