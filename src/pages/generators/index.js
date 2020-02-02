import React from 'react'

import { Link } from 'react-router-dom'
import RenderRoute from '../../utils/render-route'

export default function Generators(props) {
  return (
    <div className="calculators">
      <h2>Generators</h2>
      <ol>
        {props.routes.map((route, i) => (
          <li key={i}>
            <Link to={route.path}>{route.name}</Link>
          </li>
        ))}
      </ol>
      <RenderRoute routes={props.routes} />
    </div>
  )
}
