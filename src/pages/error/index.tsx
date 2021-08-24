import { 
    Box,
    Typography
} from "@material-ui/core";
import suggestions from 'src/pages/error/Suggestions.json';

interface ErrorProps {
    code?: number;
    message?: string;
}

export default function Error(props: ErrorProps) {
    const { code, message } = props;

    const index = Math.floor(Math.random() * suggestions.length); // Generates random number between 0 and one less than the number of suggestions
    const tip = suggestions[index];

    return (
        <Box m={2}>
            <Typography variant="h1">{code ?? 400}</Typography>
            <Typography variant="h4">{message ?? "Something Went Wrong"}</Typography>
            <Typography variant="h5">Hackathon Tip {index + 1}</Typography>
            <Typography>{tip}</Typography>
        </Box>
    );
}
