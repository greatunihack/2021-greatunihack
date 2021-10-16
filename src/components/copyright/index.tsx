import { Link, Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
interface CopyrightProps {
  variant?: Variant;
  color?:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error"
    | undefined;
}
export function Copyright(props: CopyrightProps) {
  return (
    <Typography variant={props.variant} color={props.color} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://unicsmcr.com/">
        UniCS
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}
