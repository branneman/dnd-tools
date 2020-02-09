import { slug, ellipsify } from '../../../../utils/text'

import { action as data } from '../../../../data/actions.json'

const keys = [
  {
    name: 'name',
    weight: 1
  },
  {
    name: 'body',
    weight: 0.2
  }
]

/**
 * Transform from Source format (json) to Index format
 */
function source2index(item, index) {
  return {
    index,
    name: item.name,
    body: item.entries.join(' '),
    item
  }
}

/**
 * Transform from Index format to Result format
 */
function index2result(item, index) {
  return {
    url: `/db/action/${index}/${slug(item.name)}`,
    type: 'action',
    title: item.name,
    body: ellipsify(item.body, 255)
  }
}

export default function factory(createEngine) {
  return createEngine(data.map(source2index), keys, index2result)
}
