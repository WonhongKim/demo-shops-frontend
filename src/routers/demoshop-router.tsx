import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/User/create-account";
import { Home } from "../pages/home";
import { SearchType } from "../pages/search-type";

export const DemoShopRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route key={1} path="/" exact>
          <Home />
        </Route>
        <Route key={2} path="/createAccount">
          <CreateAccount />
        </Route>
        <Route key={3} path="/SearchType/:slug">
          <SearchType />
        </Route>
        <Route key={4}>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
