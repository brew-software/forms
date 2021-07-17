import { useFormikContext } from "formik";
import { ComponentType, useCallback, useEffect } from "react";
import { ObjectSchema } from "yup";
import { useForm } from "./form";

type PartialFormOptions = {
  validationSchema?: ObjectSchema<any>;
};

type InjectedPartialFormProps<Values> = {
  values: Values;
  withNamespace: (name: string) => string;
  setValue: (prop: keyof Values, value: any) => void;
};

export type PartialFormProps<
  Values extends Object = {},
  AdditionalProps extends Object = {}
> = InjectedPartialFormProps<Values> & AdditionalProps;

export default function partialForm<
  Values extends object,
  Props extends object
>(
  Component: ComponentType<PartialFormProps<Values, Props>>,
  options?: PartialFormOptions
): ComponentType<
  Omit<Props, keyof InjectedPartialFormProps<Values>> & { namespace?: string }
> {
  return ({ namespace, ...props }) => {
    const form = useForm();
    const formikContext = useFormikContext();
    const setFieldValue = formikContext.setFieldValue;
    const values = namespace
      ? formikContext.getFieldProps(namespace).value
      : formikContext.values;
    const withNamespace = useCallback(
      (name: string) => (namespace ? `${namespace}.${name}` : name),
      [namespace]
    );

    const setValue = useCallback(
      (prop, value) => {
        setFieldValue(withNamespace(prop), value);
      },
      [withNamespace, setFieldValue]
    );

    if (options?.validationSchema) {
      useEffect(() => {
        if (form) {
          return namespace
            ? form.registerValidationSchema(
                namespace,
                options.validationSchema!
              )
            : form.registerValidationSchema(options.validationSchema!);
        }
      }, [form, namespace]);
    }

    return (
      <Component {...({ ...props, values, withNamespace, setValue } as any)} />
    );
  };
}
