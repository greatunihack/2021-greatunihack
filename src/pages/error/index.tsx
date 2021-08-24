import { 
    Box,
    Typography
} from "@material-ui/core";

interface ErrorProps {
    code?: number;
    message?: string;
}

export default function Error(props: ErrorProps) {
    const { code, message } = props;
    return (
        <Box m={2}>
            <Typography variant="h1">{code ?? 400}</Typography>
            <Typography variant="h4">{message ?? "Something Went Wrong"}</Typography>
        </Box>
    );
}
