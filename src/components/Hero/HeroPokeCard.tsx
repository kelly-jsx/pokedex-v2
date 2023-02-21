import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { PokeButton } from 'components/PokeButton'
import { Type } from 'components/Type'
import { InfoModal } from 'components/InfoModal'

type Props = {
  pokemonName: string
  handleClick: any
  imageType: any
}

export const HeroPokeCard: React.FunctionComponent<Props> = ({
  pokemonName,
  handleClick,
  imageType
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
        let sprites

        if (imageType === 'dreamworld') {
          sprites = res.data.sprites.other.dream_world.front_default
        } else if (imageType === 'home') {
          sprites = res.data.sprites.other.home.front_default
        } else if (imageType === 'pixel') {
          sprites = res.data.sprites.front_default
        }

        setPokemon({
          name: res.data.name,
          index: res.data.id,
          types: res.data.types,
          imgUrl: sprites
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
  }, [imageType])

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg bg-base-300/90 p-4 text-center shadow-xl drop-shadow-lg lg:flex-row-reverse lg:text-left ">
        <div className="h-full">
          <img
            src={pokemon.imgUrl}
            alt={pokemon.name}
            className="my-auto h-full lg:h-auto lg:w-80"
          />
        </div>
        <div className="mt-0 h-full">
          <h2 className="text-lg">#{String(pokemon.index).padStart(3, '0')}</h2>
          <p className="text-2xl font-bold capitalize">{pokemon.name}</p>
          <div className="my-2 flex justify-center gap-2 lg:mx-0 lg:justify-start">
            {pokemon.types.map((type) => (
              <Type pokeType={type.type.name} key={type.type.name} />
            ))}
          </div>
          <p className="text-md my-4 text-justify">{pokemon.description}</p>
          <label
            htmlFor="info-modal"
            className="btn-primary btn w-full hover:btn-secondary"
            onClick={handleClick}
          >
            Show More
          </label>
          {/* <label htmlFor="info-modal" onClick={handleClick}>
            <PokeButton BtnW="100%">Show more</PokeButton>
          </label> */}
        </div>
      </div>
    </>
  )
}
