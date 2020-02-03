import React from 'react'

import { isNull } from '../../../utils/fp'
import { name as data } from '../../../data/names.json'

import './index.css'

export default function Names() {
  const [race, setRace] = React.useState(null)
  const [option, setOption] = React.useState(null)

  return (
    <div className="generators-names">
      <h1>Names</h1>

      <select onChange={e => setRace(e.target.value)}>
        <option value={null}>&ndash;</option>
        {getRaces().map(([idx, race]) => (
          <option key={idx} value={idx}>
            {race}
          </option>
        ))}
      </select>

      {!isNull(race) && (
        <select onChange={e => setOption(e.target.value)}>
          <option value={null}>&ndash;</option>
          {getOptions(race).map(([idx, option]) => (
            <option key={idx} value={idx}>
              {option}
            </option>
          ))}
        </select>
      )}

      {!isNull(race) && !isNull(option) && (
        <div className="generators-names__table">
          <table>
            <tbody>
              {data[race].tables[option].table.map((row, i) => (
                <tr key={i}>
                  <td>
                    {row.min} - {row.max}
                  </td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function getRaces() {
  return data.map((x, i) => [i, x.name])
}

function getOptions(race) {
  return data[race].tables.map((x, i) => [i, x.option])
}
