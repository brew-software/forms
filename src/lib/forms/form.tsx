import {
  FieldMetaProps,
  FormikConfig,
  FormikHelpers,
  FormikProps,
  FormikProvider,
  useFormik,
} from "formik";
import { useCallback } from "react";
import {
  createContext,
  CSSProperties,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { lazy, object, ObjectSchema } from "yup";
import { FormErrors } from "./form-errors";

type OnSubmitResult<T> = undefined | true | FormErrors<T>;

type FormProps<Values extends {}> = Omit<
  FormikConfig<Values>,
  "validationSchema" | "children" | "onSubmit"
> & {
  onSubmit: (
    values: Values
  ) => OnSubmitResult<Values> | Promise<OnSubmitResult<Values>>;
  className?: string;
  style?: CSSProperties;
  validationSchema?: ObjectSchema<Values>;
  children?:
    | ((props: FormikProps<Values>) => React.ReactNode)
    | React.ReactNode;
};

type UnregisterValidationSchema = () => void;

type RegisterValidationSchema = {
  (validationSchema: ObjectSchema<any>): UnregisterValidationSchema;
  (
    namespace: string,
    validationSchema: ObjectSchema<any>
  ): UnregisterValidationSchema;
};

type FormContextType =
  | {
      registerValidationSchema: RegisterValidationSchema;
      showErrorStrategy: (meta: FieldMetaProps<any>) => string | null;
    }
  | undefined;

export const FormContext = createContext<FormContextType>(undefined);
FormContext.displayName = "FormContext";

const FormProvider = ({
  children,
  value,
}: PropsWithChildren<{ value: FormContextType }>) => {
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export function useForm() {
  const context = useContext<FormContextType>(FormContext);
  return context;
}

export function Form<Values extends {}>({
  children,
  className,
  style,
  validationSchema: baseSchema,
  onSubmit,
  ...props
}: FormProps<Values>) {
  const [schemaDefinitions, setSchemaDefinitions] = useState<
    (({ type: "base" } | { type: "scoped"; namespace: string }) & {
      schema: ObjectSchema<any>;
    })[]
  >(baseSchema ? [{ type: "base", schema: baseSchema }] : []);

  const validationSchema = useMemo(() => {
    return schemaDefinitions.reduce((combined, definition) => {
      return combined.concat(
        definition.type === "base"
          ? definition.schema
          : object().shape({ [definition.namespace]: definition.schema })
      );
    }, object().shape({}));
  }, [schemaDefinitions]);

  const handleSubmit = useCallback(
    async (values: Values, helpers: FormikHelpers<Values>) => {
      const result = await Promise.resolve(onSubmit(values));

      if (result !== true && result !== undefined) {
        helpers.setErrors(result);
      }
    },
    []
  );

  const formik = useFormik({
    ...props,
    onSubmit: handleSubmit,
    validationSchema: lazy(() => validationSchema),
  });

  const registerValidationSchema: RegisterValidationSchema = (
    namespaceOrSchema: string | ObjectSchema<any>,
    schema?: ObjectSchema<any>
  ) => {
    const namespace =
      typeof namespaceOrSchema === "string" ? namespaceOrSchema : "";
    schema = typeof namespaceOrSchema === "string" ? schema : namespaceOrSchema;
    const definition = {
      type: namespace ? "scoped" : "base",
      schema,
      namespace,
    };

    setSchemaDefinitions((sd) => [...sd, definition as any]);

    return () => {
      setSchemaDefinitions((sd) => {
        const toRemoveIndex = sd.indexOf(definition as any);
        return sd.slice(0, toRemoveIndex).concat(sd.slice(toRemoveIndex + 1));
      });
    };
  };

  const showErrorStrategy = (meta: FieldMetaProps<any>) =>
    meta.touched ? meta.error ?? null : null;

  const form = useMemo(() => {
    return { registerValidationSchema, showErrorStrategy };
  }, []);

  return (
    <FormikProvider value={formik}>
      <FormProvider value={form}>
        <form
          className={className}
          style={style}
          onSubmit={formik.handleSubmit}
        >
          {typeof children === "function" ? children(formik) : children}
        </form>
      </FormProvider>
    </FormikProvider>
  );
}
