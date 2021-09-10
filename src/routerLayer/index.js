import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import routes from "../App-route";
import Layout from "../layout";

const RouterLayer = () => {
  return (
    <Router>
      <Switch>
        {routes &&
          routes
            .filter((r) => r.public)
            .map((route) => (
              <Route exact key={route.key} path={route.path}>
                <Layout {...route} />
              </Route>
            ))}
      </Switch>
    </Router>
  );
};

export default RouterLayer;