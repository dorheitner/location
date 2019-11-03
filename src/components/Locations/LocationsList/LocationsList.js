import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "../../List/List";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginLeft: 5,
  },
  table: {
    minWidth: 700,
  },
}));

// Order Data For The List
function createData(id, name, address, coordinates, category) {
  return { id, name, address, coordinates, category };
}

// List Column Titles
const listHeaderTitles = {
  name: "Laction Name",
  address: "Address",
  coordinates: "Coordinates",
  category: "Category",
};

const mapStateToProps = state => {
  return {
    locations: state.locations,
  };
};

function LocationsList(props) {
  const classes = useStyles();
  // Set Header Title
  document.querySelector("title").innerHTML = "Locations List";

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
        <List
          type='locations'
          rows={rows}
          listHeaderTitles={listHeaderTitles}
        />
      </div>
    </>
  );
}

export default connect(mapStateToProps)(LocationsList);
