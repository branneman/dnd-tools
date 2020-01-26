import React from 'react'

import { sum } from '../../../utils/fp'
import { getXPThreshold, getEncounterMultiplier } from './constants'

export default function EncounterDifficulty() {
  const partyXP = getPartyXPThresholds([3, 3, 3, 3])
  const adjustedMonsterXP = getAdjustedMonsterXP([100, 100, 100, 100])

  return (
    <div>
      <h1>EncounterDifficulty</h1>
      {JSON.stringify({ partyXP, adjustedMonsterXP })}
    </div>
  )
}

export const getAdjustedMonsterXP = monsterXP => {
  const multiplier = getEncounterMultiplier(monsterXP.length)
  return sum(monsterXP) * multiplier
}

export const getPartyXPThresholds = characterLevels => {
  const calc = difficulty =>
    sum(characterLevels.map(lvl => getXPThreshold(lvl)[difficulty]))
  return {
    easy: calc('easy'),
    medium: calc('medium'),
    hard: calc('hard'),
    deadly: calc('deadly')
  }
}

export const getEncounterDifficulty = (
  partyXPThresholds,
  adjustedMonsterXP
) => {
  if (adjustedMonsterXP < partyXPThresholds.easy) return 'Easy'
  if (adjustedMonsterXP < partyXPThresholds.medium) return 'Medium'
  if (adjustedMonsterXP < partyXPThresholds.hard) return 'Hard'
  if (adjustedMonsterXP < partyXPThresholds.deadly) return 'Deadly'
  return 'Above Deadly'
}
