import React from 'react'

import { Link, BrowserRouter as Router } from 'react-router-dom'
import RenderRoute from '../utils/render-route'
import routes from './routes.js'

import './index.css'
import Navigation from '../molecules/Navigation'

export default function App() {
  return (
    <Router>
      <div className="grid__container">
        <div className="grid__nav">
          <h1 className="site-title">
            <Link to={'/'}>DnD Tools</Link>
          </h1>
          <Navigation routes={routes} />
        </div>
        <div className="grid__body">
          <RenderRoute routes={routes} />
        </div>
      </div>
    </Router>
  )
}
