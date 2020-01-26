import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import routes from './routes.js'
import './index.css'
import Navigation from '../molecules/Navigation'

export default function App() {
  return (
    <Router>
      <div className="grid__container">
        <div className="grid__nav">
          <Navigation routes={routes} />
        </div>
        <div className="grid__body">
          <Switch>
            {routes.map((route, i) => (
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
      </div>
    </Router>
  )
}
