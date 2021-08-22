import { 
    Box,
    Button,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

interface SponsorCardProps {
    sponsor: {
        name: string;
        image: string;
        website: string;
        description: string;
    }
}

const useStyles = makeStyles({
    cardImage: {
        height: 140,
    },
});

export default function SponsorCard(props: SponsorCardProps) {
    const { sponsor } = props;
    const classes = useStyles(props);
    return (
        <Box m={2}>
            <Card>
                <CardActionArea disableRipple>
                    <CardMedia
                        image={sponsor.image}
                        title="Contemplative Reptile"
                        className={classes.cardImage}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {sponsor.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {sponsor.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" href={sponsor.website}>
                        Visit Website
                    </Button>
                </CardActions>
            </Card>
        </Box>
    );
}