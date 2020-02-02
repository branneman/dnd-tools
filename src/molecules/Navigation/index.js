import React from 'react'
import { Link } from 'react-router-dom'

import { find, filter, concat } from '../../utils/fp'

import './index.css'

export default function Navigation(props) {
  // Sort 'Search' first, remove NotFound
  const isSearch = x => x.path === '/'
  const isNotFound = x => x.path
  const x = find(isSearch, props.routes)
  const xs = filter(y => y !== x && isNotFound(y), props.routes)
  const sortedRoutes = concat([x], xs)

  return (
    <nav className="navigation">
      <ol className="navigation__menu">
        {sortedRoutes.map((route, i) => (
          <li key={i}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
