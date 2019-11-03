import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NotFound from "./hoc/NotFound/NotFound";

import Layout from "./hoc/Layout/Layout";
import {
  LocationsList,
  LocationsForm,
  LocationsView,
} from "./components/Locations";
import {
  CategoriesList,
  CategoriesForm,
  CategoriesView,
} from "./components/Categories";

function App() {
  return (
    <div className='App'>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/' component={LocationsList} name='list' />
            <Route exact path='/locations' component={LocationsList} />
            <Route path='/locations/create' component={LocationsForm} />
            <Route
              path='/locations/edit/:locationId'
              component={LocationsForm}
            />
            <Route exact path='/categories' component={CategoriesList} />
            <Route path='/categories/create' component={CategoriesForm} />
            <Route
              path='/categories/edit/:categoryId'
              component={CategoriesForm}
            />
            <Route
              path='/locations/view/:locationId'
              component={LocationsView}
            />
            <Route
              path='/categories/view/:categoryId'
              component={CategoriesView}
            />
            {/* Catch Not Found */}
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
