import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import List from "../../List/List";
import { connect } from "react-redux";

const useStyles = makeStyles(theme => ({
  root: {
    width: "90%",
    marginLeft: 5,
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
const listHeaderTitles = {
  name: "Category Name",
};

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
          rows={rows}
          listHeaderTitles={listHeaderTitles}
          type='categories'
        />
      </div>
    </>
  );
}
export default connect(mapStateToProps)(CategoriesList);
