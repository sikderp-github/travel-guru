import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        maxWidth: 350,
    },
    media: {
        height: 400,
    }
});

const cardStyle = {
    display: "flex",
    justifyContent: 'left',
    alignItems: 'center',
    marginLeft: '70px',
    borderRadius: '20px',
    height: '560px',
    boxShadow: "3px 3px gold, -1em 0 .4em olive",
}

export default function Tour(props) {
    let { title, description, photoUrl } = props.site;
    const history = useHistory();
    const handlebooking = (title) => {
        console.log(title);
        history.push(`/booking/${title}`);
    }

    const classes = useStyles();

    return (
        <section >
            <Card className={classes.root} style={cardStyle}>
                <CardActionArea mx="auto" boxShadow={3}>
                    <CardMedia
                        className={classes.media}
                        image={photoUrl} title="Travel-guru" />

                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" >
                            <h2>{title}</h2>
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <p>{description}</p>
                        </Typography>
                    </CardContent>

                    <Button mr={3} textAlign="right" onClick={() => handlebooking(title)} variant="contained" size="medium" color="primary">
                        Book now
                    </Button>
                </CardActionArea>
            </Card>
        </section>
    );
}

