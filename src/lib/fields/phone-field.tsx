import React, { useEffect, useState } from "react";
import { TextField, TextFieldProps } from "@material-ui/core";

export type PhoneFieldProps = Omit<TextFieldProps, "type">;
export function PhoneField({
  onChange,
  onKeyDown,
  value,
  ...props
}: PhoneFieldProps) {
  const [formattedValue, setFormattedValue] = useState(value);

  useEffect(() => {
    setFormattedValue(format(typeof value === "string" ? value : "", false));
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = format(event.target.value, false);
    event.target.value = nextValue;
    setFormattedValue(nextValue);

    if (onChange) {
      onChange(event);
    }
  };

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace") {
      const nextValue = format((event.target as HTMLInputElement).value, true);
      setFormattedValue(nextValue);
    }
  };

  return (
    <TextField
      type="tel"
      {...props}
      value={formattedValue}
      onChange={handleChange}
      onKeyDown={handleKeydown}
    />
  );
}

function format(value: string, backspace: boolean) {
  let newVal = value.replace(/\D/g, "");
  if (backspace && newVal.length <= 6) {
    newVal = newVal.substring(0, newVal.length - 1);
  }
  if (newVal.length === 0) {
    newVal = "";
  } else if (newVal.length <= 3) {
    newVal = newVal.replace(/^(\d{0,3})/, "($1)");
  } else if (newVal.length <= 6) {
    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})/, "($1) $2");
  } else if (newVal.length <= 10) {
    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3");
  } else {
    newVal = newVal.substring(0, 10);
    newVal = newVal.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, "($1) $2-$3");
  }

  return newVal;
}
