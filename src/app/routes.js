import Search from '../pages/search'
import PartyTracker from '../pages/party-tracker'
import DieRoller from '../pages/die-roller'
import Generators from '../pages/generators'
import Calculators from '../pages/calculators'
import EncounterDifficulty from '../pages/calculators/encounter-difficulty'

export default [
  {
    path: '/search',
    component: Search,
    name: 'Search'
  },
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
    name: 'Generators'
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
  }
]
