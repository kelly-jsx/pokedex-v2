import React from 'react'

import { colorTypes } from 'colorTypes'
import { Type } from './Type'

export const FilterType = () => (
  <div className="flex snap-x snap-mandatory gap-2 overflow-y-scroll p-2 px-12 lg:w-1/2">
    {colorTypes.map(({ name }) => (
      <div className="hover:scale-103 snap-center transition duration-300 ease-in-out hover:-translate-y-0.5 hover:cursor-pointer">
        <Type key={name} pokeType={name} />
      </div>
    ))}
  </div>
)