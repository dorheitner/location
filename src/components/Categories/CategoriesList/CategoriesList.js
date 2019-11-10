import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "../../List/List";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginLeft: 5,
  },
  "@media only screen and (max-width: 800px)": {
    root: {
      width: "100%",
    },
  },
}));

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

// Order Data For The List
function createData(id, name) {
  return { id, name };
}

// List Column Titles
const listHeaderTitles = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Category Name",
  },
];

function CategoriesList(props) {
  const classes = useStyles();
  // Set Header Title
  document.querySelector("title").innerHTML = "Categories List";

  const rows = [];
  const categoryItems = props.categories;

  // Order Rows Items For List
  if (categoryItems) {
    categoryItems.forEach(category => {
      rows.push(createData(category.id, category.name));
    });
  }

  return (
    <>
      <div className={classes.root}>
        <List
          type='categories'
          rows={rows}
          listHeaderTitles={listHeaderTitles}
        />
      </div>
    </>
  );
}
export default connect(mapStateToProps)(CategoriesList);
