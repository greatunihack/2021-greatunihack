import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function BackButton ()
{
    const history = useHistory();
    return (
        <Button variant="contained"
        color="primary"
        onClick={() => history.goBack()}>
            &lt;&lt; Go Back to Dashboard
        </Button>
    )
}