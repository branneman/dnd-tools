import React from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default function Navigation(props) {
  return (
    <nav className="navigation">
      <ol className="navigation__menu">
        {props.routes.map((route, i) => (
          <li key={i}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
