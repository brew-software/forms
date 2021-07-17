import { FieldProps, useFormikContext } from "formik";
import { ComponentType } from "react";
import { useForm } from "./form";

export type AsFormikField<TFieldProps extends {}, T = any> = ComponentType<
  FieldProps<T> & {
    name: string;
    error?: string;
    touched: boolean;
  } & TFieldProps
>;

export default function asFormikField<TField extends AsFormikField<any, any>>(
  Component: TField
): ComponentType<
  TField extends AsFormikField<infer TProps, any>
    ? TProps & { name: string }
    : never
> {
  return (props) => {
    const formik = useFormikContext();
    const form = useForm();
    const field = formik.getFieldProps(props.name);
    const meta = formik.getFieldMeta(props.name);
    const error = form?.showErrorStrategy(meta);

    return (
      <Component
        form={formik}
        field={field}
        meta={meta}
        error={error}
        touched={meta.touched || undefined}
        {...(props as any)}
      />
    );
  };
}
