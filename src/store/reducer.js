import * as actionTypes from "./actions";
import _ from "lodash";

const initialState = {
  categories: JSON.parse(localStorage.getItem("categories")),
  locations: JSON.parse(localStorage.getItem("locations")),
  errors: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM:
      let itemsArray = [];
      let items = localStorage.getItem(action.itemType);
      if (items) {
        let parseItems = JSON.parse(items);
        parseItems.forEach(item => {
          itemsArray.push(item);
        });
      }
      itemsArray.push(action.data);

      localStorage.setItem(action.itemType, [JSON.stringify(itemsArray)]);

      let updateItems = localStorage.getItem(action.itemType);
      updateItems = JSON.parse(updateItems);
      if (action.itemType === "categories") {
        return {
          ...state,
          categories: updateItems,
        };
      }
      if (action.itemType === "locations") {
        return {
          ...state,
          locations: updateItems,
        };
      }
      return {};
    case actionTypes.EDIT_ITEM:
      let edit_itemsArray = [];
      let edit_items = localStorage.getItem(action.itemType);

      if (edit_items) {
        let parseItems = JSON.parse(edit_items);
        let filterItems = parseItems.filter(item => item.id !== action.data.id);

        if (!_.isEmpty(filterItems)) {
          filterItems.forEach(item => {
            edit_itemsArray.push(item);
          });
          edit_itemsArray.push(action.data);
        } else {
          edit_itemsArray.push(action.data);
        }

        localStorage.setItem(action.itemType, [
          JSON.stringify(edit_itemsArray),
        ]);
        let edit_updateItems = localStorage.getItem(action.itemType);
        edit_updateItems = JSON.parse(edit_updateItems);

        if (action.itemType === "categories") {
          return {
            ...state,
            categories: edit_updateItems,
          };
        }
        if (action.itemType === "locations") {
          return {
            ...state,
            locations: edit_updateItems,
          };
        }
      }

      return {};

    case actionTypes.REMOVE_ITEM:
      let delete_items = localStorage.getItem(action.data.type);
      if (delete_items) {
        let delete_parseItems = JSON.parse(delete_items);
        let delete_filterItems = delete_parseItems.filter(
          item => item.id !== action.data.id
        );

        localStorage.setItem(action.data.type, [
          JSON.stringify(delete_filterItems),
        ]);

        let delete_updateItems = localStorage.getItem(action.data.type);

        delete_updateItems = JSON.parse(delete_updateItems);
        if (action.data.type === "categories") {
          return {
            ...state,
            categories: delete_updateItems,
          };
        }
        if (action.data.type === "locations") {
          return {
            ...state,
            locations: delete_updateItems,
          };
        }
      }

      return {};
    default:
      return state;
  }
};
export default reducer;
