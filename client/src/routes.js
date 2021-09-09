import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from './App/pages/Home';
import List from './App/pages/List';

const ROUTES = [
    { path: "/", key: "ROOT", exact: true, component: () => <h1>Log in</h1> },
    { path: "/list", key: "ROOT", exact: true, component:List },
    { path: "/home", key: "ROOT", exact: true, component: Home},
    {
      path: "/app",
      key: "APP",
      component: RenderRoutes, // here's the update
      routes: [
        {
          path: "/app",
          key: "APP_ROOT",
          exact: true,
          component: () => <h1>App Index</h1>,
        },
        {
          path: "/app/page",
          key: "APP_PAGE",
          exact: true,
          component: () => <h1>App Page</h1>,
        },
      ],
    },
  ];

export default ROUTES;

function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  }

  export function RenderRoutes({ routes }) {
    return (
      <Switch>
        {routes.map((route, i) => {
          return <RouteWithSubRoutes key={route.key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
    );
  }