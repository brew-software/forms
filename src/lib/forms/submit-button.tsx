import { Button } from "@material-ui/core";
import { useFormikContext } from "formik";
import { ReactNode } from "react";

type SubmitButtonProps = {
  className?: string;
  defaultLabel?: ReactNode;
  submittingLabel?: ReactNode;
};

export default function SubmitButton({
  className = "",
  defaultLabel,
  submittingLabel,
}: SubmitButtonProps) {
  const formik = useFormikContext();

  const handleSubmit = () => {
    formik.submitForm();
  };
  return (
    <Button
      className={className}
      disabled={!formik.isValid || formik.isSubmitting}
      onClick={handleSubmit}
      type="submit"
      variant="contained"
      color="secondary"
      size="large"
      fullWidth
    >
      {formik.isSubmitting ? submittingLabel ?? defaultLabel : defaultLabel}
    </Button>
  );
}
