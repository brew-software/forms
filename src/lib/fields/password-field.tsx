import {
	IconButton,
	InputAdornment,
	InputProps,
	TextField,
	TextFieldProps,
} from "@material-ui/core";
import { useState } from "react";
import { EyeIcon } from "@brew-software/react-icons";

export type PasswordFieldProps = Omit<TextFieldProps, "InputProps" | "type"> & {
	InputProps?: Omit<InputProps, "endAdornment">;
};

export function PasswordField({ InputProps, ...props }: PasswordFieldProps) {
	const [visible, setVisible] = useState(false);

	const toggleVisible = () => {
		setVisible((v) => !v);
	};

	return (
		<TextField
			{...(props as any)}
			type={visible ? "text" : "password"}
			InputProps={{
				...InputProps,
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={toggleVisible}>
							<EyeIcon type={visible ? "solid" : "solidSlash"} />
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
}
