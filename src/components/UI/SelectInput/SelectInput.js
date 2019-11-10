import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: 300,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function SelectInput(props) {
  const classes = useStyles();
  const [item, setItem] = useState("");

  const handleChange = event => {
    setItem(event.target.value);
    props.selectedItems(event.target.value);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id='demo-simple-select-helper-label'>
          {props.label}
        </InputLabel>
        <Select
          labelId='demo-simple-select-helper-label'
          id='demo-simple-select-helper'
          value={item}
          onChange={handleChange}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {props.names &&
            props.names.map((name, index) => (
              <MenuItem key={index} value={name}>
                {name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
