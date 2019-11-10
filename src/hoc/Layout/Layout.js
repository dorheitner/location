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
import Button from "@material-ui/core/Button";

import useReactRouter from "use-react-router";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: "3% 0",
  },
  title: {
    flexGrow: 0.2,

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
  headerLinks: {
    flexGrow: 2,
    justifyContent: "flex-start",
    display: "flex",
  },
  headerLink: {
    justifyContent: "flex-start",
    display: "flex",
  },
  list: {
    width: "100%",
  },
  paper: {
    // height: '100vh'
    width: "100%",
  },
  menu: {
    display: "block",
  },
  "@media only screen and (max-width: 800px)": {
    menu: {
      display: "none",
    },
    root: {
      margin: "8% auto",
    },
  },
}));

const links = [
  {
    name: "locations",
    friendlyName: "Locations List",
    icon: "",
    address: "/locations",
    type: "locations",
  },
  {
    name: "locationsForm",
    friendlyName: "Create Location",
    icon: "",
    address: "/locations/create",
    type: "locations",
  },
  {
    name: "ctegories",
    friendlyName: "Categories List",
    icon: "",
    address: "/categories",
    type: "categories",
  },
  {
    name: "ctegoriesForm",
    friendlyName: "Create Category",
    icon: "",
    address: "/categories/create",
    type: "categories",
  },
];

export default function Layout(props) {
  const classes = useStyles();
  const { location, history } = useReactRouter();
  const [action, setAction] = useState();
  const [menuType, setMenuType] = useState();

  useEffect(() => {
    const title = [];

    location.pathname.startsWith("/locations")
      ? setMenuType("locations")
      : setMenuType("categories");

    location.pathname === "/locations" && setAction("Locations List");
    location.pathname === "/categories" && setAction("Categories List");

    title.push(document.querySelector("title").innerText);
    document.querySelector("#title").innerHTML = title;
  }, [location, menuType]);

  const changeAction = title => {
    setAction(title);
  };
  return (
    <div className={classes.root}>
      <AppBar style={{ width: "100%" }} position='fixed'>
        <Toolbar className={classes.toolbar}>
          <Typography variant='h6' className={classes.title} id='title' />
          <div className={classes.headerLinks}>
            <Button
              className={classes.headerLink}
              color='inherit'
              onClick={() => history.push("/locations")}
            >
              Locations
            </Button>
            <Button
              color='inherit'
              className={classes.headerLink}
              onClick={() => history.push("/categories")}
            >
              Categories
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Grid container>
        <Grid item xs={2} className={classes.menu}>
          <Paper className={classes.paper}>
            <List className={classes.list}>
              {links.map(
                (link, index) =>
                  link.type === menuType && (
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
                  )
              )}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={12} md={10}>
          <div>{props.children}</div>
        </Grid>
      </Grid>
    </div>
  );
}
