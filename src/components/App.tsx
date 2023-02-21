import { useEffect, useState } from 'react'
import axios from 'axios'

import { Counter } from 'utils/Counter'
import Hero from './Hero/Hero'
import { SiteActions } from './SiteActions/SiteActions'
import { PokeCard } from './PokeCard'
import { InfoModal } from './InfoModal'
import { Footer } from './Footer'
import { Pagination } from './Pagination'
import { setTimeout } from 'timers/promises'

import { timeout } from 'utils'

export default function App() {
  const ApiUrl = 'https://pokeapi.co/api/v2/'

  const heroPokemon = 'charmander'

  const [limit, setLimit] = useState(151)
  const [offset, setOffset] = useState(0)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(9)
  const [totalItems, setTotalItems] = useState(1008)

  const [imageType, setImageType] = useState('dreamworld')

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
    fetchAllPokemons(itemsPerPage, currentPage)
  }, [])

  const fetchAllPokemons = async (limit, page) => {
    const offset = itemsPerPage * (page - 1)
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

      let sprites

      if (imageType === 'dreamworld') {
        sprites = data.sprites.other.dream_world.front_default
      } else if (imageType === 'home') {
        sprites = data.sprites.other.home.front_default
      } else if (imageType === 'pixel') {
        sprites = data.sprites.front_default
      }

      setSelectedPokemon({
        index: data.id,
        name: data.name,
        imgUrl: sprites,
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
      const res = await axios.get(`${ApiUrl}pokemon-species/${pokemon}`)
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
  }

  const handleCloseModal = async () => {
    await timeout(500)
    setSelectedPokemon({
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
  }

  const handleChangePage = (page) => {
    setCurrentPage(page)
    fetchAllPokemons(itemsPerPage, page)
  }

  const handleChangeImageType = (e) => {
    setImageType(e.target.value)
  }

  return (
    <>
      <Hero
        pokemon={heroPokemon}
        handleClick={() => handleClickPokemon(heroPokemon)}
        imageType={imageType}
      />
      <div id="site-more" className="flex flex-col py-4">
        <SiteActions handleChangeImageType={handleChangeImageType} />
        <div className="divider" />
        <div className="p-2 lg:px-12 xl:px-52 2xl:px-96">
          <div className="place-self-center lg:place-self-start">
            <Pagination
              currentPage={currentPage}
              onPageSelect={handleChangePage}
              total={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
            {Object.keys(allPokemons).map((item) => (
              <PokeCard
                key={allPokemons[item].id}
                index={allPokemons[item].id}
                name={allPokemons[item].name}
                image={
                  imageType === 'dreamworld'
                    ? allPokemons[item].sprites.other.dream_world.front_default
                    : imageType === 'home'
                    ? allPokemons[item].sprites.other.home.front_default
                    : imageType === 'pixel'
                    ? allPokemons[item].sprites.front_default
                    : null
                }
                type={allPokemons[item].types}
                handleClick={() => handleClickPokemon(allPokemons[item].name)}
              />
            ))}
          </div>
          <div className="place-self-center">
            <Pagination
              currentPage={currentPage}
              onPageSelect={handleChangePage}
              total={totalItems}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
      <Footer />
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
        handleCloseModal={handleCloseModal}
      />
    </>
  )
}
