import React from 'react'

import { Type } from './Type'
import { getTypeColor } from 'utils'

type Props = {
  index: number
  name: string
  image: string
  type: []
  handleClick: () => void
}

export const PokeCard = ({ index, name, image, type, handleClick }: Props) => {
  let finalColor = []

  if (type.length === 2) {
    finalColor = [
      getTypeColor(type[0].type.name),
      getTypeColor(type[1].type.name)
    ]
  } else {
    finalColor = [
      getTypeColor(type[0].type.name),
      getTypeColor(type[0].type.name)
    ]
  }

  return (
    <label htmlFor="info-modal" onClick={handleClick}>
      <div
        className="hover:scale-105 cursor-pointer rounded-lg bg-base-300 text-center text-black shadow-lg transition ease-in-out hover:-translate-y-1.5"
        style={{
          background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`
        }}
      >
        <div
          className="rounded-lg p-3"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)'
          }}
        >
          <p className="text-2xl">#{String(index).padStart(3, '0')}</p>
          <img src={image} alt="" className="mx-auto mt-5 h-60" />
          <p className="mt-5 text-xl font-bold capitalize">{name}</p>
          <div className="mt-5 flex justify-center gap-2">
            {type.map((type) => (
              <Type pokeType={type.type.name} />
            ))}
          </div>
        </div>
      </div>
    </label>
  )
}
