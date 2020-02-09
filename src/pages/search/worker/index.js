/* eslint-disable no-restricted-globals */

import search from './search'

self.addEventListener('message', event => {
  self.postMessage(search(event.data))
})
