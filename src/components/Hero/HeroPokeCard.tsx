import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { PokeButton } from 'components/PokeButton'

import { colorTypes } from 'colorTypes'

export const HeroPokeCard = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    index: '',
    description: '',
    types: [],
    imgUrl: ''
  })

  const getTypeColor = (type: string): string => {
    const foundType = colorTypes.find((item) => item.name === type)
    return foundType?.color || ''
  }

  const fetchPokemonData = async () => {
    return axios
      .get('https://pokeapi.co/api/v2/pokemon/charmander/')
      .then((res) => {
        setPokemon({
          name: res.data.name,
          index: res.data.id,
          types: res.data.types,
          imgUrl: res.data.sprites.other.dream_world.front_default
        })
      })
  }

  const fetchPokemonDescription = async () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/charmander`)
      .then((res) => {
        let description

        for (let i = 0; i < res.data.flavor_text_entries.length; i++) {
          if (res.data.flavor_text_entries[i].language.name === 'en') {
            description = res.data.flavor_text_entries[i].flavor_text
            break
          }
        }

        setPokemon((pokemon) => {
          return {
            ...pokemon,
            description: description
          }
        })
      })
  }

  useEffect(() => {
    fetchPokemonData()
    fetchPokemonDescription()
  }, [])

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-base-300/90 p-4 text-center shadow-xl drop-shadow-lg lg:flex-row-reverse lg:text-left ">
      <img
        src={pokemon.imgUrl}
        alt="charmander"
        className="m-auto h-40 lg:h-auto lg:w-80"
      />
      <div className="mt-0 h-full">
        <h2 className="text-lg">#{String(pokemon.index).padStart(3, '0')}</h2>
        <p className="text-2xl font-bold capitalize">{pokemon.name}</p>
        <div className="my-2 flex justify-center gap-2 lg:mx-0 lg:justify-start">
          {pokemon.types.map((type) => (
            <div
              className="flex gap-1 rounded-lg p-2 shadow-lg"
              style={{
                backgroundColor: getTypeColor(type.type.name),
                boxShadow: `0 0 20px ${getTypeColor(type.type.name)}`
              }}
            >
              <img
                src={`/src/assets/pokemonTypes/${type.type.name}.svg`}
                alt={type.type.name}
                className="h-8"
              />
              <p className="my-auto text-lg font-medium capitalize text-white">
                {type.type.name}
              </p>
            </div>
          ))}
        </div>
        <p className="text-md my-4 text-justify">{pokemon.description}</p>
        <PokeButton BtnW="100%">Show more</PokeButton>
      </div>
    </div>
  )
}
