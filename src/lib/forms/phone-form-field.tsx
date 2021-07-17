import { PhoneField, PhoneFieldProps } from "../fields";
import asFormikField, { AsFormikField } from "./asField";

const PhoneFieldFormField: AsFormikField<PhoneFieldProps> = ({
  form,
  field,
  meta,
  error,
  touched,
  ...inputProps
}) => {
  return (
    <PhoneField {...field} error={!!error} helperText={error} {...inputProps} />
  );
};

export default asFormikField(PhoneFieldFormField);
