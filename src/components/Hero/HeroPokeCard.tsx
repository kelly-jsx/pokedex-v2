import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { PokeButton } from 'components/PokeButton'

export const HeroPokeCard = () => {
  const [pokemon, setPokemon] = useState({
    name: '',
    index: '',
    description: '',
    types: [],
    imgUrl: ''
  })

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
    <div className="flex flex-col rounded-lg bg-base-300/90 p-4 text-center shadow-xl drop-shadow-lg lg:flex-row-reverse">
      <div className="m-auto">
        <img src={pokemon.imgUrl} alt="charmander" className="" />
      </div>
      <div className="lg:mr-4">
        <h2>#{String(pokemon.index).padStart(3, '0')}</h2>
        <p className="capitalize">{pokemon.name}</p>
        <div className="flex">
          {pokemon.types.map((type) => (
            <div className="flex gap-2 rounded-lg bg-base-100 px-4 py-2">
              <img
                src={`/src/assets/pokemonTypes/${type.type.name}.svg`}
                alt={type.type.name}
                className="h-8"
              />
              <p className="my-auto capitalize">{type.type.name}</p>
            </div>
          ))}
        </div>
        <p className="mb-4">{pokemon.description}</p>
        <PokeButton BtnW="100%">Show more</PokeButton>
      </div>
    </div>
  )
}
