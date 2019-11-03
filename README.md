This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Components

### LocationsList and CategoriesList

Render the items details from the reducer and send to the `List` component.

### LocationsForm and CategoriesForm

Render a from on `create` or `edit` mode. On edit mode the component get the item details by id.

### LocationsView and CategoriesView

Render the item details by id.

### List

Get column title and rows data from `LocationsList` or `CategoriesList` and render the table.

### Actions

Render 3 buttons (Edit, View Details and Delete). Get Updated button Lists from `List` component.
Manage Modal for the `Delete` button.

## Reducer Dispath Actions

### Add_Item

Add new item for the localStorge (by type item - `categories` or `locations`)

### Edit_Item

Filter the current item from the localStorge and create a new item with the new details and the same id.

### Remove_Item

Filter the current item and update the localStorge without this item
