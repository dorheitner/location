import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import useReactRouter from "use-react-router";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions";

const useStyles = makeStyles(theme => ({
  crudButtonsGrid: {
    margin: "3% auto",
    display: "flex",
    justifyContent: "flex-start",
  },
  button: {
    margin: "0 5px",
    color: "#fff",
    fontSize: 16,
  },
  createButton: {
    display: "none",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  "@media only screen and (max-width: 800px)": {
    crudButtonsGrid: {
      justifyContent: "center",
    },
    createButton: {
      display: "block",
      color: "#fff",
    },
  },
}));

const mapDispathToProps = dispath => {
  return {
    onItemRemove: item =>
      dispath({
        type: actionTypes.REMOVE_ITEM,
        data: item,
      }),
  };
};

function Actions(props) {
  const classes = useStyles();
  const { history } = useReactRouter();
  const [open, setOpen] = useState(false);

  // Handle Remove Item
  const handleRemoveItem = () => {
    props.onItemRemove(props.links ? props.links.delete : "");
    handleCloseModal();
  };

  // Handle Open Modal
  const handleOpenModal = () => {
    setOpen(true);
  };

  //  // Handle Close Modal
  const handleCloseModal = () => {
    setOpen(false);
  };

  return (
    <div className={classes.crudButtonsGrid}>
      <Button
        disabled={props.enableActions}
        variant='contained'
        style={{ background: "#FFC300" }}
        className={(classes.button, classes.createButton)}
        onClick={() => history.push(props.links ? props.links.create : null)}
      >
        Create
      </Button>
      <Button
        disabled={!props.enableActions}
        variant='contained'
        style={{ background: "#7BCDBA" }}
        className={classes.button}
        onClick={() => history.push(props.links ? props.links.edit : null)}
      >
        Edit
      </Button>
      <Button
        disabled={!props.enableActions}
        variant='contained'
        style={{ background: "#247BA0" }}
        className={classes.button}
        onClick={() => history.push(props.links ? props.links.view : null)}
      >
        View Details
      </Button>
      <Button
        disabled={!props.enableActions}
        variant='contained'
        style={{ background: "#F25F5C" }}
        className={classes.button}
        onClick={() => handleOpenModal()}
      >
        Delete
      </Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id='transition-modal-title'>
              Are You sure That You What To Renove This Item?
            </h2>
            <Button
              disabled={!props.enableActions}
              variant='contained'
              style={{ background: "#247BA0" }}
              className={classes.button}
              onClick={() => handleCloseModal()}
            >
              NO NO NO!
            </Button>
            <Button
              disabled={!props.enableActions}
              variant='contained'
              style={{ background: "#F25F5C" }}
              className={classes.button}
              onClick={() => handleRemoveItem()}
            >
              Remove This Item
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
export default connect(
  null,
  mapDispathToProps
)(Actions);
