import React, { useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import _ from "lodash";

import Actions from "../UI/Actions/Actions";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#154C63",
    color: theme.palette.common.white,
    textAlign: "start",
  },
  body: {
    fontSize: 16,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
  },

  table: {
    minWidth: 700,
  },
  empty: {
    margin: "3% auto",
    padding: "2%",
  },
}));

export default function List(props) {
  const classes = useStyles();
  const [selected, setSelected] = useState(0);
  const [enableActions, setEnableActions] = useState(false);
  const [linksForActionButtons, setLinksForActionButtons] = useState(false);

  // Change Actions Links (Buttons On Top)
  const handleActions = (event, id) => {
    setSelected(id);
    setEnableActions(true);
    setLinksForActionButtons({
      edit: `/${props.type}/edit/${id}`,
      view: `/${props.type}/view/${id}`,
      delete: {
        type: props.type,
        id,
      },
    });
  };

  return (
    <>
      <div className={classes.root}>
        <Actions enableActions={enableActions} links={linksForActionButtons} />
        <Table className={classes.table} aria-label='customized table'>
          <TableHead>
            <TableRow>
              {Object.values(props.listHeaderTitles).map((val, index) => (
                <StyledTableCell key={index}>{val}</StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.rows &&
              props.rows.map((row, rowIndex) => (
                <StyledTableRow
                  hover
                  selected
                  style={
                    selected === row.id
                      ? { background: "#7BCDBA" }
                      : { cursor: "pointer" }
                  }
                  key={rowIndex}
                  onClick={e => handleActions(e, row.id)}
                >
                  {Object.keys(props.listHeaderTitles).map(
                    (key, titleIndex) => (
                      <StyledTableCell
                        selected
                        key={titleIndex}
                        component='th'
                        scope='row'
                      >
                        {row[key]}
                      </StyledTableCell>
                    )
                  )}
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
        {_.isEmpty(props.rows) && (
          <Typography className={classes.empty} variant='h5' gutterBottom>
            Still Don't have any {props.type}
          </Typography>
        )}
      </div>
    </>
  );
}
