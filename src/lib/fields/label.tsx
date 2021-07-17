import {
  createStyles,
  FormControlLabel,
  Theme,
  WithStyles,
  withStyles,
} from "@material-ui/core";
import { isValidElement, ReactNode } from "react";

const labelStyles = (theme: Theme) =>
  createStyles({
    root: {
      alignItems: "flex-start",
      margin: 0,
      fontSize: theme.typography.body1.fontSize,
    },

    label: {
      color: theme.typography.caption.color,
      fontSize: theme.typography.caption.fontSize,
    },
  });

export type LabelProp = {
  className?: string;
  value?: ReactNode;
  label: ReactNode;
};

type InternalLabelProps = WithStyles<typeof labelStyles> & LabelProp;

const Label = withStyles(labelStyles, {
  name: "Label",
})(({ className, classes, value, label }: InternalLabelProps) => (
  <FormControlLabel
    className={className}
    classes={classes}
    label={label}
    labelPlacement="top"
    control={isValidElement(value) ? value : <span>{value}</span>}
  />
));

export default Label;
