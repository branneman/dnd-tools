import { flatten } from '../../../../utils/fp'
import { slug, ellipsify } from '../../../../utils/text'

import { spell as dataPHB } from '../../../../data/spells/spells-phb.json'
import { spell as dataXGE } from '../../../../data/spells/spells-xge.json'

const data = flatten([dataPHB, dataXGE])

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
    url: `/db/spell/${index}/${slug(item.name)}`,
    type: 'spell',
    title: item.name,
    body: ellipsify(item.body, 255)
  }
}

export default function factory(createEngine) {
  return createEngine(data.map(source2index), keys, index2result)
}
