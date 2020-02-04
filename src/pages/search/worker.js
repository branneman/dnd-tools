/* eslint-disable no-restricted-globals */

import _actions from '../../data/actions.json'

/**
 * Listen for new work
 */
self.addEventListener('message', event => {
  setTimeout(() => {
    postMessage(search(event.data))
  }, 500)
})

/**
 * Search
 */
function search(query) {
  const results = [].concat(
    actions(query, 50),
    backgrounds(query, 50),
    feats(query, 50),
    items(query, 50),
    races(query, 50),
    spells(query, 50)
  )
  return results.sort((x, y) => x.weight - y.weight)
}

/**
 * Actions
 */
function actions(query, weight) {
  return []
}

/**
 * Backgrounds
 */
function backgrounds(query, weight) {
  return []
}

/**
 * Feats
 */
function feats(query, weight) {
  return []
}

/**
 * Items
 */
function items(query, weight) {
  return []
}

/**
 * Races
 */
function races(query, weight) {
  return []
}

/**
 * Spells
 */
function spells(query, weight) {
  return [
    {
      url: '/spell/57287/acid-splash',
      type: 'spell',
      title: 'Acid Splash',
      body:
        'Level: cantrip. You hurl a bubble of acid. Choose one creature you can see within range, or choose two creatures you can see within range that are within 5 feet of each other. A target must succeed on a Dexterity saving throw or take 1d6 acid damage.'
    }
  ]
}
