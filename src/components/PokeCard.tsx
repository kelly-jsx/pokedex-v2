import React from 'react'

import { Type } from './Type'
import { getTypeColor } from 'utils'

export const PokeCard = () => {
  return (
    <label htmlFor="info-modal">
      <div
        className="hover:scale-103 cursor-pointer  rounded-lg bg-base-300 text-center text-black shadow-lg transition ease-in-out hover:-translate-y-1.5"
        style={{
          backgroundColor: getTypeColor('fire')
        }}
      >
        <div
          className="rounded-lg p-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
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
    </label>
  )
}
