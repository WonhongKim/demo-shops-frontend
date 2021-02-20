import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Header } from "../components/header";
import { NotFound } from "../pages/404";
import { CreateAccount } from "../pages/User/create-account";
import { Home } from "../pages/home";
import { SearchType } from "../pages/search-type";
import { ShopDetail } from "../pages/Shop/shop-detail";
import { Login } from "../pages/User/login";
import { Dashboard } from "../pages/User/dashboard";
import { CreateShop } from "../pages/Shop/create-shop";
import { MyShopMain } from "../pages/Shop/my-shop-main";
import { AddItem } from "../pages/Shop/add-item";
import { Order } from "../pages/Order/order";
import { StaffDashboard } from "../pages/Staff/staff-dashboard";

export const DemoShopRouter = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route key={1} path="/" exact>
          <Home />
        </Route>
        <Route key={2} path="/login">
          <Login />
        </Route>
        <Route key={3} path="/createAccount">
          <CreateAccount />
        </Route>
        <Route key={4} path="/createShop">
          <CreateShop />
        </Route>
        <Route key={5} path="/dashboard">
          <Dashboard />
        </Route>
        <Route key={6} path="/myShop/:id" exact>
          <MyShopMain />
        </Route>
        <Route key={7} path="/myShop/:id/addItem">
          <AddItem />
        </Route>
        <Route key={8} path="/SearchType/:slug" exact>
          <SearchType />
        </Route>
        <Route key={9} path="/shopdetail/:id" exact>
          <ShopDetail />
        </Route>
        <Route key={10} path="/orders/:id" exact>
          <Order />
        </Route>
        <Route key={10} path="/staffdashboard">
          <StaffDashboard />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
