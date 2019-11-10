import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import _ from "lodash";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

import useReactRouter from "use-react-router";

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  select: {
    width: "100%",
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: 24,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

const mapDispathToProps = dispath => {
  return {
    onCategoryAdded: category =>
      dispath({
        type: actionTypes.ADD_ITEM,
        data: category,
        itemType: "categories",
      }),
    onCategoryEdited: category =>
      dispath({
        type: actionTypes.EDIT_ITEM,
        data: category,
        itemType: "categories",
      }),
  };
};

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};

function CategoriesForm(props) {
  const classes = useStyles();

  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState(null);

  const [submit, setSumnit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const { history, location } = useReactRouter();

  // Handle Input Change
  const handleInputChange = event => {
    setCategory(event.target.value);
  };

  useEffect(() => {
    // Check if This Is Create Or Edit Screen
    if (location.pathname !== "/categories/create") {
      // Edit Mode
      // Set Header Title
      document.querySelector("title").innerHTML = "Edit Category";
      setEditMode(true);

      // Get Category Id From URL
      let categoryId = location.pathname.replace("/categories/edit/", "");

      setCategoryId(categoryId);

      // Check If There Is Item With This Is
      _.isEmpty(props.categories) && history.push("/categories");

      let categoryObj = props.categories.filter(
        category => category.id === categoryId
      );
      _.isEmpty(categoryObj) && history.push("/categories");

      setCategory(categoryObj[0].name ? categoryObj[0].name : "");
    } else {
      // Create Mode
      // Set Header Title
      document.querySelector("title").innerHTML = "Create Category";
      setEditMode(false);
    }
  }, [location, history, props.categories]);

  // Handle Submit for Create Or Edit
  const handleSubmit = event => {
    event.preventDefault();
    setSumnit(true);

    if (category !== "") {
      if (editMode) {
        props.onCategoryEdited({
          name: category,
          id: categoryId,
        });
      } else {
        props.onCategoryAdded({
          name: category,
          id: Math.random()
            .toString(36)
            .substr(2, 12),
        });
      }
      history.push("/categories");
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {editMode ? "Edit Category" : "Create New Category"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            error={submit && category === ""}
            helperText={
              submit && category === "" ? `Please set category name` : " "
            }
            onChange={handleInputChange}
            required
            id='standard-required'
            label='Category Name'
            className={classes.textField}
            margin='normal'
            name='name'
            value={category && category}
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {editMode ? "Update Category" : "Add Category"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default connect(
  mapStateToProps,
  mapDispathToProps
)(CategoriesForm);
