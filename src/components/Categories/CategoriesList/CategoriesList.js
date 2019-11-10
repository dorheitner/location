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
  empty: {
    margin: "10% auto",
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
  const { history } = useReactRouter();

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
        {!_.isEmpty(rows) ? (
          <List
            type='categories'
            rows={rows}
            listHeaderTitles={listHeaderTitles}
          />
        ) : (
          <div className={classes.empty}>
            <Typography style={{ padding: 10 }} variant='h5' gutterBottom>
              Still Don't Have Any Categories.
            </Typography>
            <Button
              variant='contained'
              style={{ background: "#7BCDBA" }}
              className={classes.button}
              onClick={() => history.push("/categories/create")}
            >
              Add Category
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
export default connect(mapStateToProps)(CategoriesList);
