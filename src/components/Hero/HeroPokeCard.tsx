import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { PokeButton } from 'components/PokeButton'
import { Type } from 'components/Type'

type Props = {
  pokemonName: string
}

export const HeroPokeCard: React.FunctionComponent<Props> = ({
  pokemonName
}) => {
  const [pokemon, setPokemon] = useState({
    name: '',
    index: '',
    description: '',
    types: [],
    imgUrl: ''
  })

  const fetchPokemonData = async () => {
    return axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
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
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`)
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
            <Type pokeType={type.type.name} key={type.type.name} />
          ))}
        </div>
        <p className="text-md my-4 text-justify">{pokemon.description}</p>
        <PokeButton BtnW="100%">Show more</PokeButton>
      </div>
    </div>
  )
}
