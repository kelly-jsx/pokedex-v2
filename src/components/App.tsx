import { useEffect, useState } from 'react'
import axios from 'axios'

import { Counter } from 'utils/Counter'
import Hero from './Hero/Hero'
import { SiteActions } from './SiteActions'
import { PokeCard } from './PokeCard'
import { InfoModal } from './InfoModal'
import { Footer } from './Footer'

export default function App() {
  const ApiUrl = 'https://pokeapi.co/api/v2/'

  const [showModal, setShowModal] = useState(false)
  const [allPokemons, setAllPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState({
    index: '',
    name: '',
    imgUrl: '',
    types: [],
    height: '',
    weight: '',
    category: '',
    description: '',
    abilities: [],
    stats: []
  })

  useEffect(() => {
    fetchAllPokemons(0, 151)
  }, [])

  const fetchAllPokemons = async (offset, limit) => {
    const res = await axios
      .get(`${ApiUrl}pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log(err))
    fetchPokemonData(res.data.results)
  }

  const fetchPokemonData = async (res) => {
    const pokemonArr = []

    await Promise.all(
      res.map((pokemon) => {
        return axios.get(`${ApiUrl}pokemon/${pokemon.name}`).then((res) => {
          pokemonArr.push(res.data)
        })
      })
    )

    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))

    setAllPokemons(pokemonArr)
  }

  const fetchPokemonDetails = async (pokemon) => {
    return axios.get(`${ApiUrl}pokemon/${pokemon}`).then((res) => {
      const data = res.data

      setSelectedPokemon({
        index: data.id,
        name: data.name,
        imgUrl: data.sprites.other.dream_world.front_default,
        types: data.types,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        stats: data.stats
      })
    })
  }

  const fetchPokemonSpecies = async (pokemon) => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`
      )
      const data = res.data
      let category
      let description

      for (let i = 0; i < data.genera.length; i++) {
        if (data.genera[i].language.name === 'en') {
          category = data.genera[i].genus
          break
        }
      }

      for (let j = 0; j < data.flavor_text_entries.length; j++) {
        if (data.flavor_text_entries[j].language.name === 'en') {
          description = data.flavor_text_entries[j].flavor_text
          break
        }
      }

      setSelectedPokemon((prevPokemon) => ({
        ...prevPokemon,
        description: description,
        category: category
      }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickPokemon = (pokemon) => {
    fetchPokemonDetails(pokemon)
    fetchPokemonSpecies(pokemon)
    setShowModal(true)
  }

  return (
    <>
      <Hero />
      {/* <Counter /> */}

      <div id="site-more" className="flex flex-col py-4">
        <SiteActions />
        <div className="divider" />
        <div className="mx-4 mt-8 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          {Object.keys(allPokemons).map((item) => (
            <PokeCard
              key={allPokemons[item].id}
              index={allPokemons[item].id}
              name={allPokemons[item].name}
              image={allPokemons[item].sprites.other.dream_world.front_default}
              type={allPokemons[item].types}
              handleClick={() => handleClickPokemon(allPokemons[item].name)}
            />
          ))}
        </div>
        <div className="place-self-center">
          <div className="btn-group">
            <button className="btn">1</button>
            <button className="btn-active btn">2</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
          </div>
        </div>
      </div>
      <Footer />
      {showModal ? (
        <InfoModal
          index={selectedPokemon.index}
          name={selectedPokemon.name}
          imgUrl={selectedPokemon.imgUrl}
          type={selectedPokemon.types}
          height={selectedPokemon.height}
          weight={selectedPokemon.weight}
          category={selectedPokemon.category}
          description={selectedPokemon.description}
          abilities={selectedPokemon.abilities}
          stats={selectedPokemon.stats}
        />
      ) : null}
    </>
  )
}
