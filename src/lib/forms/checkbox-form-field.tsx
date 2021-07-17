import { Checkbox, CheckboxProps, FormControlLabel } from "@material-ui/core";
import { ChangeEvent } from "react";
import asFormikField, { AsFormikField } from "./asField";

const CheckboxFormField: AsFormikField<
	Omit<CheckboxProps, "value" | "onChange"> & {
		label?: string;
		labelPlacement?: "end" | "start" | "top" | "bottom";
	}
> = ({
	form,
	field,
	meta,
	label,
	labelPlacement,
	className,
	...checkboxProps
}) => {
	const handleChange = (
		_: ChangeEvent<HTMLInputElement>,
		checked: boolean
	) => {
		form.setFieldValue(field.name, checked);
	};

	const control = (
		<Checkbox
			className={label !== undefined ? className : undefined}
			{...checkboxProps}
			checked={field.value}
			onChange={handleChange}
		/>
	);

	return label !== undefined ? (
		<FormControlLabel
			className={className}
			label={label}
			labelPlacement={labelPlacement}
			control={control}
		/>
	) : (
		control
	);
};

export default asFormikField(CheckboxFormField);
