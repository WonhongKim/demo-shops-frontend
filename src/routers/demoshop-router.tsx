import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/User/create-account";
import { Home } from "../pages/home";

export const DemoShopRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route key={1} path="/">
          <Home />
        </Route>
        <Route key={2} path="/create-account">
          <CreateAccount />
        </Route>
        <Route key={3}>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
