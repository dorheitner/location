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
  const [categoryDetails, setCategoryDetails] = useState();

  useEffect(() => {
    //Set Header Title
    document.querySelector("title").innerHTML = "View Details";

    // Filter The Current Category
    let categories = localStorage.getItem("categories");
    if (categories) {
      categories = JSON.parse(categories);
      let categoryId = location.pathname.replace("/categories/view/", "");
      let getDetails = categories.filter(
        category => category.id === categoryId
      );

      if (getDetails) {
        setCategoryDetails(getDetails[0]);
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
          CATEGORY
        </Typography>
        <Typography variant='h5' component='h2'>
          {categoryDetails && categoryDetails.name}
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
