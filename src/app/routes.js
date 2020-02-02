import Search from '../pages/search'
import PartyTracker from '../pages/party-tracker'
import DieRoller from '../pages/die-roller'

import Generators from '../pages/generators'
import Names from '../pages/generators/names'

import Calculators from '../pages/calculators'
import EncounterDifficulty from '../pages/calculators/encounter-difficulty'

import NotFound from '../pages/not-found'

export default [
  {
    path: '/party-tracker',
    component: PartyTracker,
    name: 'Party Tracker'
  },
  {
    path: '/die-roller',
    component: DieRoller,
    name: 'Die Roller'
  },
  {
    path: '/generators',
    component: Generators,
    name: 'Generators',
    routes: [
      {
        path: '/generators/names',
        component: Names,
        name: 'Names'
      }
    ]
  },
  {
    path: '/calculators',
    component: Calculators,
    name: 'Calculators',
    routes: [
      {
        path: '/calculators/encounter-difficulty',
        component: EncounterDifficulty,
        name: 'Encounter Difficulty'
      }
    ]
  },
  // Must be second to last (matches /)
  {
    path: '/',
    component: Search,
    name: 'Search'
  },
  // Must be last (failed to match anything)
  {
    component: NotFound,
    name: '404 Not Found'
  }
]
