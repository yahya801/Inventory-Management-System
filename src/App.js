import React, { Component } from "react";
import Dashboard  from "./components/dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Signup } from "./components/signup/signup";
import { Signin } from "./components/signin/signin";
import {Itemsview } from "./components/Items/itemsview"

export default class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div className="App">
            <Route exact path="/" component={Signup} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/dashboard" component={Dashboard } />
            <Route exact path="/items" component={Itemsview } />
          </div>
        </Switch>
      </Router>
      // <div>
      //  <Signup />
      // </div>;
    );
  }
}
