import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

export default function Calculators(props) {
  return (
    <div>
      <ol>
        {props.routes.map((route, i) => (
          <li key={i}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ol>
      <Switch>
        {props.routes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            render={props => (
              <route.component {...props} routes={route.routes} />
            )}
          />
        ))}
      </Switch>
    </div>
  )
}
