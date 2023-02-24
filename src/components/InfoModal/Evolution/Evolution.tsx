// import { ArrowForward } from '@mui/icons-material'
import axios from 'axios'
import React, { useEffect, useState, useCallback } from 'react'

import {
  BsFillArrowDownCircleFill,
  BsFillArrowRightCircleFill
} from 'react-icons/bs'

import { EvolutionImg } from './EvolutionImage'

export const Evolution = ({ pokemon, name, handleClickEvo }) => {
  const [pokemonsFamily, setPokemonsFamily] = useState([])
  const [evolvesPokemon, setEvolvesPokemon] = useState([])

  const handleNameSpecies = useCallback(
    ({ species, evolves_to, evolution_details }) => {
      let namesPokemons = [
        {
          name: species.name,
          level: 0,
          item: evolution_details[0]?.item?.name,
          held_item: evolution_details[0]?.held_item?.name,
          trigger: evolution_details[0]?.trigger?.name,
          // slice last 5 characters to get the id instead of index because names have hyphens
          id: species.url.slice(-5).replace(/\D/g, '').replaceAll('/', '')
        }
      ]
      if (evolution_details.length)
        namesPokemons[0].level = evolution_details[0].min_level

      evolves_to.forEach((evolves) => {
        namesPokemons = namesPokemons.concat(handleNameSpecies(evolves))
      })
      return namesPokemons
    },
    []
  )

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.index}`)
      .then((responseSpecies) => {
        const url = responseSpecies.data?.evolution_chain?.url
        axios.get(url).then((responseEvolution) => {
          const species = handleNameSpecies(responseEvolution.data?.chain)
          setPokemonsFamily(species)
        })
      })
  }, [name, handleNameSpecies])

  useEffect(() => {
    if (pokemonsFamily.length) {
      const urlsAxios = pokemonsFamily.map((p) => {
        return axios.get(`https://pokeapi.co/api/v2/pokemon/${p.id}`)
      })

      Promise.all([...urlsAxios]).then((responses) => {
        const result = responses.map((response, index) => {
          const data = response.data
          return {
            ...pokemonsFamily[index],
            index: `#${data.id}`,
            image: data.sprites.other.dream_world.front_default,
            type: data.types
          }
        })
        setEvolvesPokemon(result)
      })
    }
  }, [pokemonsFamily])

  return (
    <div className="flex flex-col lg:flex-row gap-4">
      {evolvesPokemon.length
        ? evolvesPokemon.slice(0, 9).map((evolves, index) => (
            <div className="flex flex-col lg:flex-row" key={evolves.index}>
              {index !== 0 ? (
                <div className="my-auto flex justify-center">
                  <BsFillArrowDownCircleFill className="w-8 h-8 block lg:hidden" />
                  <BsFillArrowRightCircleFill className="w-8 h-8 hidden lg:block" />
                </div>
              ) : null}
              <div className="text-center flex flex-col justify-center w-full h-full p-2">
                <EvolutionImg
                  evolves={evolves}
                  handleClickEvo={handleClickEvo}
                />
                <h4 className="capitalize">{evolves.name}</h4>
              </div>
            </div>
          ))
        : pokemonsFamily.length > 0 &&
          evolvesPokemon.length > 0 && (
            <h1 className="text-center">Loading...</h1>
          )}
    </div>
  )
}
export default Evolution
