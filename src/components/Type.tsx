import React from 'react'

import { getTypeColor } from 'utils'

type Props = {
  pokeType: string
}

export const Type = ({ pokeType }: Props) => {
  return (
    <div
      className="flex w-max gap-1 rounded-lg p-1 px-2 shadow-lg justify-center"
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
