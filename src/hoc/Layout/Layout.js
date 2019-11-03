import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import useReactRouter from "use-react-router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "3% 0",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    justifyContent: "flex-start",
    display: "flex",
  },
  toolbar: {
    background: "#0A2530",
  },
  linkes: {
    textDecoration: "none",
    color: "#000",
  },
  crudButtonsGrid: {
    margin: "2% auto",
  },
  button: {
    margin: 5,
    width: "100%",
  },
  list: {
    width: "100%",
  },
  paper: {
    // height: '100vh'
    width: "100%",
  },
}));

const links = [
  {
    name: "locations",
    friendlyName: "Locations List",
    icon: "",
    address: "/locations",
  },
  {
    name: "locationsForm",
    friendlyName: "Create Location",
    icon: "",
    address: "/locations/create",
  },
  {
    name: "ctegories",
    friendlyName: "Categories List",
    icon: "",
    address: "/categories",
  },
  {
    name: "ctegoriesForm",
    friendlyName: "Create Category",
    icon: "",
    address: "/categories/create",
  },
];

export default function Layout(props) {
  const classes = useStyles();
  const { location } = useReactRouter();
  const [action, setAction] = useState("Locations List");

  useEffect(() => {
    const title = [];

    title.push(document.querySelector("title").innerText);
    document.querySelector("#title").innerHTML = title;
  }, [location]);

  const changeAction = title => {
    setAction(title);
  };
  return (
    <div className={classes.root}>
      <AppBar style={{ width: "100%" }} position='fixed'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6' className={classes.title} id='title' />
        </Toolbar>
      </AppBar>

      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper className={classes.paper}>
            <List className={classes.list}>
              {links.map((link, index) => (
                <Link
                  key={index}
                  className={classes.linkes}
                  to={link.address}
                  onClick={() => changeAction(link.friendlyName)}
                >
                  <ListItem
                    button
                    key={index}
                    style={
                      action === link.friendlyName
                        ? { background: "#247BA0", color: "#fff" }
                        : {}
                    }
                  >
                    <ListItemText primary={link.friendlyName} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={10}>
          <div>{props.children}</div>
        </Grid>
      </Grid>
    </div>
  );
}
