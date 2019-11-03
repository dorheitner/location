import React, { useState, useEffect } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

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
    minWidth: 120,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
  },
}));

const mapDispathToProps = dispath => {
  return {
    onLocationAdded: location =>
      dispath({
        type: actionTypes.ADD_ITEM,
        data: location,
        itemType: "locations",
      }),
    onLocationEdited: location =>
      dispath({
        type: actionTypes.EDIT_ITEM,
        data: location,
        itemType: "locations",
      }),
  };
};

function LocationForm(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    address: "",
    coordinates: "",
    category: "",
  });
  const [submit, setSumnit] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const { history, location } = useReactRouter();

  // Get Categories Itmes For The Select Input
  const categories = [];
  let categoriesList = localStorage.getItem("categories");

  if (categoriesList) {
    let categoriesItems = JSON.parse(categoriesList);
    categoriesItems.forEach(category => {
      categories.push([category.id, category.name]);
    });
  }

  useEffect(() => {
    // Check if This Is Create Or Edit Screen

    if (location.pathname !== "/locations/create") {
      // Edit Mode
      // Set Header Title
      document.querySelector("title").innerHTML = "Edit Location";

      // Get Location Id From URL
      let locationId = location.pathname.replace("/locations/edit/", "");
      let locations = localStorage.getItem("locations");
      _.isEmpty(locations) && history.push("/locations");

      setEditMode(true);
      locations = JSON.parse(locations);

      let locationObj = locations.filter(
        location => location.id === locationId
      );
      // Check If There Is Item With This Is
      _.isEmpty(locationObj) && history.push("/locations");
      setValues(locationObj[0]);
    } else {
      // Create Mode
      // Set Header Title
      document.querySelector("title").innerHTML = "Create Location";

      setValues({ name: "", address: "", coordinates: "", category: "" });
      setEditMode(false);
    }
  }, [location, history]);

  // Handle Submit for Create Or Edit
  const handleSubmit = event => {
    event.preventDefault();

    setSumnit(true);
    let validation = handleValidation(values);

    if (validation.length === 0) {
      if (editMode) {
        props.onLocationEdited(values);
      } else {
        props.onLocationAdded({
          ...values,
          id: Math.random()
            .toString(36)
            .substr(2, 12),
        });
      }
    }
    history.push("/locations");
  };

  // Handle Validation
  const handleValidation = values => {
    const validInputs = ["name", "address", "coordinates", "category"];

    const check = Object.entries(values).map(([key, value]) => {
      let inputCheck = validInputs.includes(key);

      if (inputCheck) {
        if (value === "") {
          return key;
        }
        return true;
      }
      return true;
    });

    return check.filter(input => input !== true);
  };

  //Handle Input Change
  const handleInputChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {editMode ? "Edit Location" : "Create New Location"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            error={submit && values.name === ""}
            helperText={
              submit && values.name === "" ? `Please set location name` : " "
            }
            required
            id='standard-required'
            label='Location Name'
            className={classes.textField}
            margin='normal'
            name='name'
            value={values && values.name ? values.name : ""}
            onChange={handleInputChange}
          />
          <TextField
            error={submit && values.address === ""}
            helperText={
              submit && values.address === "" ? `Please set address` : " "
            }
            required
            id='standard-required'
            label='Address'
            className={classes.textField}
            margin='normal'
            name='address'
            onChange={handleInputChange}
            value={values && values.address ? values.address : ""}
          />
          <TextField
            error={submit && values.coordinates === ""}
            helperText={
              submit && values.coordinates === ""
                ? `Please set coordinates`
                : " "
            }
            required
            id='standard-required'
            label='Coordinates'
            className={classes.textField}
            margin='normal'
            name='coordinates'
            onChange={handleInputChange}
            value={values && values.coordinates ? values.coordinates : ""}
          />

          <FormControl
            className={classes.select}
            error={!!(submit && values.category === "")}
          >
            <InputLabel htmlFor='name-native-error'>
              {submit && values.category === "" ? "Please select category" : ""}
            </InputLabel>
            <NativeSelect
              inputProps={{
                id:
                  submit && values.category === ""
                    ? "name-native-error"
                    : "age-native-required",
                name: "category",
              }}
              value={values && values.category ? values.category : ""}
              onChange={handleInputChange}
            >
              <option value={5}>Select Category *</option>
              {categories.map(category => (
                <option key={category[0]} value={category[1]}>
                  {category[1]}
                </option>
              ))}
            </NativeSelect>
          </FormControl>

          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {editMode ? "Update Location" : "Add Location"}
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default connect(
  null,
  mapDispathToProps
)(LocationForm);
