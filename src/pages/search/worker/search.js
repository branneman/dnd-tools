import Fuse from 'fuse.js'
import { flatten } from '../../../utils/fp'

import createSpellEngine from './engines/spell'

const engines = [createSpellEngine(createEngine)]

/**
 * @param {String} query
 * @returns {Array<Objects<{ item: Object, score: Number }>>}
 */
export default function search(query) {
  return flatten(
    engines.map(engine => {
      return engine.search(query).map(engine.mapper)
    })
  )
}

/**
 * @param {Array<Object>} data
 * @param {Array<Object<{ name: String, weight: Number }>>} keys
 * @param {Function} mapper
 */
function createEngine(data, keys, mapper) {
  const options = {
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    threshold: 0.3,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys
  }

  const engine = new Fuse(data, options)
  return {
    search: q => engine.search(q),
    mapper
  }
}
