import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import useReactRouter from "use-react-router";

const useStyles = makeStyles({
  card: {
    width: "50%",
    margin: "2% auto",
  },
  title: {
    fontSize: 14,
  },
});

export default function LocationsView(props) {
  const classes = useStyles();

  const { history, location } = useReactRouter();
  const [locationDetails, setLocationDetails] = useState();

  useEffect(() => {
    //Set Header Title
    document.querySelector("title").innerHTML = "View Details";

    // Filter The Current Location
    let locations = localStorage.getItem("locations");
    if (locations) {
      locations = JSON.parse(locations);
      let locationId = location.pathname.replace("/locations/view/", "");
      let getDetails = locations.filter(location => location.id === locationId);

      if (getDetails) {
        setLocationDetails(getDetails[0]);
      }
    }
  }, [location]);

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color='textSecondary'
          gutterBottom
          style={{ color: "#7bcdba" }}
        >
          LOCATION
        </Typography>
        <Typography variant='h5' component='h2'>
          {locationDetails && locationDetails.name}
        </Typography>

        <Typography variant='body2' component='p'>
          Address: {locationDetails && locationDetails.address}
        </Typography>
        <Typography variant='body2' component='p'>
          Coordinates: {locationDetails && locationDetails.coordinates}
        </Typography>
        <Typography variant='body2' component='p'>
          Category: {locationDetails && locationDetails.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={history.goBack}
          size='small'
          style={{ color: "#7bcdba" }}
        >
          Go Back
        </Button>
      </CardActions>
    </Card>
  );
}
