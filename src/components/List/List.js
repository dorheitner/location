import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";

import Actions from "../UI/Actions/Actions";
import SelectInput from "../UI/SelectInput/SelectInput";

import { connect } from "react-redux";
import _ from "lodash";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.listHeaderTitles.map(headCell => (
          <TableCell
            key={headCell.id}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: "auto",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  chip: {
    margin: "1%",
  },
  filterByCategory: {
    display: "flex",
    justifyContent: "flex-start",
    margin: "10px 0",
  },
}));

const mapStateToProps = state => {
  return {
    categories: state.categories,
  };
};
function List(props) {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [enableActions, setEnableActions] = useState(false);
  const [linksForActionButtons, setLinksForActionButtons] = useState({
    create: `/${props.type}/create`,
  });
  const [currentRows, setCurrentRows] = useState([]);
  const [category, setCategory] = useState();
  const [buttonFilterColor, setButtonFilterColor] = useState("default");

  const rows = useRef([]);
  rows.current = currentRows;

  useEffect(() => {
    setCurrentRows(props.rows);
  }, [props.rows]);

  const categoriesNames =
    props.categories &&
    props.categories.map(category => {
      return category.name;
    });
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

  const handleRequestSort = (event, property) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const handleFilterByCategories = () => {
    if (!_.isEmpty(category)) {
      setButtonFilterColor("primary");
      let filterRows = props.rows.filter(item => {
        return item["category"] ? item["category"].includes(category) : null;
      });
      setCurrentRows(filterRows);
    } else {
      setButtonFilterColor("default");
      setCurrentRows(props.rows);
    }
  };

  const handleSelectedCategory = category => {
    if (category === "") {
      setCurrentRows(props.rows);
      setButtonFilterColor("default");
    }
    setCategory(category);
  };

  const handleSelectAllClick = event => {};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, rows.current.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Actions enableActions={enableActions} links={linksForActionButtons} />
      {props.type === "locations" && (
        <div className={classes.filterByCategory}>
          <SelectInput
            names={categoriesNames}
            selectedItems={handleSelectedCategory}
            label='Category'
          />
          <Button
            onClick={() => handleFilterByCategories()}
            color={buttonFilterColor}
            className={classes.button}
          >
            Filter By Category
          </Button>
        </div>
      )}

      <div className={classes.tableWrapper}>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          aria-label='enhanced table'
        >
          <EnhancedTableHead
            listHeaderTitles={props.listHeaderTitles}
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.current.length}
          />
          <TableBody>
            {stableSort(rows.current, getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                return (
                  <TableRow
                    hover
                    style={
                      selected === row.id
                        ? { background: "#7BCDBA" }
                        : { cursor: "pointer" }
                    }
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    onClick={e => handleActions(e, row.id)}
                  >
                    {props.listHeaderTitles.map((key, titleIndex) =>
                      key.id === "category" ? (
                        <TableCell key={titleIndex} scope='row'>
                          {row.category.map((categoryItem, indexItem) => (
                            <Chip
                              key={indexItem}
                              variant='outlined'
                              color='primary'
                              label={categoryItem.toUpperCase()}
                              className={classes.chip}
                            />
                          ))}
                        </TableCell>
                      ) : (
                        <TableCell key={titleIndex} scope='row'>
                          {row[key.id]}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        {_.isEmpty(rows.current) && (
          <Typography className={classes.empty} variant='h5' gutterBottom>
            Sorry, We Don't find any result.
          </Typography>
        )}
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component='div'
        count={rows.current.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "next page",
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default connect(mapStateToProps)(List);
