import React from 'react'

import { colorTypes } from 'colorTypes'

type Props = {
  pokeType: string
}

export const Type: React.FunctionComponent<Props> = ({ pokeType }) => {
  const getTypeColor = (type: string): string => {
    const foundType = colorTypes.find((item) => item.name === type)
    return foundType?.color || ''
  }

  return (
    <div
      className="flex w-max gap-1 rounded-lg p-2 shadow-lg"
      style={{
        backgroundColor: getTypeColor(pokeType),
        boxShadow: `0 0 20px ${getTypeColor(pokeType)}`
      }}
    >
      <img
        src={`/src/assets/pokemonTypes/${pokeType}.svg`}
        alt={pokeType}
        className="h-8"
      />
      <p className="my-auto text-lg font-medium capitalize text-white">
        {pokeType}
      </p>
    </div>
  )
}
