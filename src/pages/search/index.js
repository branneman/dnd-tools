import React from 'react'

import { Link } from 'react-router-dom'
import useDebounce from '../../hooks/use-debounce'

import './index.css'

const worker = new Worker('./worker.js', { type: 'module' })

const capitalise = s => `${s.substr(0, 1).toUpperCase()}${s.substr(1)}`

export default function Search() {
  const [query, setQuery] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [results, setResults] = React.useState([])
  const debouncedQuery = useDebounce(query, 250)

  React.useEffect(() => {
    const onWorkerDone = e => {
      setLoading(false)
      setResults(e.data)
    }
    worker.addEventListener('message', onWorkerDone)

    if (debouncedQuery.length > 2 && !loading) {
      setLoading(true)
      worker.postMessage(debouncedQuery)
    }

    return () => {
      worker.removeEventListener('message', onWorkerDone)
    }

    // Exclude 'loading' from dependencies: this would create an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery])

  return (
    <div className="search">
      <h2>Search</h2>

      <div className="search__box">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="query"
        />
      </div>

      {loading ? (
        <div className="search__loading">Loading...</div>
      ) : (
        <ol className="search__results">
          {results.map((result, i) => (
            <li key={i}>
              <Link to={result.url}>
                <strong>
                  {capitalise(result.type)}: {result.title}
                </strong>
                <p>{result.body}</p>
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  )
}
