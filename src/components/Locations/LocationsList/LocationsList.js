import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import List from "../../List/List";
import { connect } from "react-redux";
import useReactRouter from "use-react-router";
import _ from "lodash";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginLeft: 5,
  },
  table: {
    minWidth: 700,
  },
  empty: {
    margin: "10% auto",
  },
  "@media only screen and (max-width: 800px)": {
    root: {
      width: "100%",
    },
  },
}));

// Order Data For The List
function createData(id, name, address, coordinates, category) {
  return { id, name, address, coordinates, category };
}

// List Column Titles
const listHeaderTitles = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Laction Name",
  },
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "Address",
  },
  {
    id: "coordinates",
    numeric: false,
    disablePadding: true,
    label: "Coordinates",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: true,
    label: "Category",
  },
];

const mapStateToProps = state => {
  return {
    locations: state.locations,
  };
};

function LocationsList(props) {
  const classes = useStyles();
  // Set Header Title
  document.querySelector("title").innerHTML = "Locations List";
  const { history } = useReactRouter();

  const rows = [];
  const locationItems = props.locations;

  // Order Rows Items For List
  if (locationItems) {
    locationItems.forEach(location => {
      rows.push(
        createData(
          location.id,
          location.name,
          location.address,
          location.coordinates,
          location.category
        )
      );
    });
  }

  return (
    <>
      <div className={classes.root}>
        {!_.isEmpty(rows) ? (
          <List
            type='locations'
            rows={rows}
            listHeaderTitles={listHeaderTitles}
          />
        ) : (
          <div className={classes.empty}>
            <Typography style={{ padding: 10 }} variant='h5' gutterBottom>
              Still Don't Have Any Locations.
            </Typography>
            <Button
              variant='contained'
              style={{ background: "#7BCDBA" }}
              className={classes.button}
              onClick={() => history.push("/locations/create")}
            >
              Add Location
            </Button>
          </div>
        )}
      </div>
    </>
  );
}

export default connect(mapStateToProps)(LocationsList);
