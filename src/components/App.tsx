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

  const [allPokemons, setAllPokemons] = useState([])
  const [selectedPokemon, setSelectedPokemon] = useState(null)

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
      <InfoModal />
    </>
  )
}
