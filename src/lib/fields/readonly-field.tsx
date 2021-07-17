import { ReactNode } from "react";
import Label from "./label";

type ReadonlyFieldProps = {
  className?: string;
  label?: ReactNode;
  value?: ReactNode;
};

export default function ReadonlyField({
  className,
  value,
  label = "",
}: ReadonlyFieldProps) {
  return <Label className={className} label={label} value={value} />;
}
