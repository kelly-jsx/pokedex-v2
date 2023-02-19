import React from 'react'

import { Type } from './Type'
import { colorTypes } from 'colorTypes'

export const PokeCard = () => {
  const getTypeColor = (type: string): string => {
    const foundType = colorTypes.find((item) => item.name === type)
    return foundType?.color || ''
  }

  return (
    <div
      className="poke-card hover:scale-103 cursor-pointer  rounded-lg bg-base-300 text-center shadow-lg transition ease-in-out hover:-translate-y-1.5"
      style={{
        backgroundColor: getTypeColor('fire')
      }}
    >
      <div
        className=" p-3"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.4)'
        }}
      >
        <p className="text-2xl">#001</p>
        <img
          src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
          alt=""
          className="mx-auto mt-5 h-60"
        />
        <p className="mt-5 text-xl font-bold capitalize">Charmander</p>
        <div className="mt-5 flex justify-center gap-2">
          <Type pokeType={'fire'} />
        </div>
      </div>
    </div>
  )
}
