import { SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'

import { Counter } from 'utils/Counter'
import { Hero } from './Hero/Hero'
import { SiteActions } from './SiteActions/SiteActions'
import { InfoModal } from './InfoModal'
import { Footer } from './Footer'
import { Pagination } from './Pagination'
import { setTimeout } from 'timers/promises'

import { timeout } from 'utils'
import { PokemonList } from './PokemonList/PokemonList'

export default function App() {
  const ApiUrl = 'https://pokeapi.co/api/v2/'

  const heroPokemon = 'charmander'

  const [searchPokemons, setSearchPokemons] = useState([])
  const [isSearch, setIsSearch] = useState(false)
  const [filterPokemons, setFilterPokemons] = useState([])
  const [isFilter, setIsFilter] = useState(false)

  const [imageType, setImageType] = useState('dreamworld')

  const [region, setRegion] = useState('kanto')
  const [limit, setLimit] = useState(151)
  const [offset, setOffset] = useState(0)

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
    fetchAllPokemons(limit, offset)
  }, [limit, offset])

  const fetchAllPokemons = async (limit: number, offset: number) => {
    const res = await axios
      .get(`${ApiUrl}pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log(err))
    fetchPokemonData(res.data.results)
  }

  const fetchPokemonData = async (res: any[]) => {
    const pokemonArr: any[] | ((prevState: never[]) => never[]) = []

    await Promise.all(
      res.map((pokemon: { name: any }) => {
        return axios.get(`${ApiUrl}pokemon/${pokemon.name}`).then((res) => {
          pokemonArr.push(res.data)
        })
      })
    )

    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))

    setAllPokemons(pokemonArr)
  }

  const fetchPokemonDetails = async (pokemon: any) => {
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

  const fetchPokemonSpecies = async (pokemon: any) => {
    try {
      const res = await axios.get(`${ApiUrl}pokemon-species/${pokemon}`)
      const data = res.data
      let category: string
      let description: string

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

  const handleClickPokemon = (pokemon: string) => {
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

  const handleChangeImageType = (e: {
    target: { value: SetStateAction<string> }
  }) => {
    setImageType(e.target.value)
  }

  const handleSearch = (value: string) => {
    setIsFilter(false)
    value.length > 0 ? setIsSearch(true) : setIsSearch(false)

    let searchArr: SetStateAction<never[]> = []

    for (let i = 0; i < allPokemons.length; i++) {
      if (
        allPokemons[i].name.toLowerCase().includes(value.toLowerCase()) ||
        allPokemons[i].id.toString().includes(value) ||
        allPokemons[i].id.toString().padStart(3, '0').includes(value)
      ) {
        searchArr.push(allPokemons[i])
      }

      searchArr.length === 0
        ? setSearchPokemons([])
        : setSearchPokemons(searchArr)
    }
  }

  const handleFilter = (value: string) => {
    setIsSearch(false)
    value.length > 0 ? setIsFilter(true) : setIsFilter(false)

    let filterArr: SetStateAction<never[]> = []

    for (let i = 0; i < allPokemons.length; i++) {
      for (let j = 0; j < allPokemons[i].types.length; j++) {
        if (
          allPokemons[i].types[j].type.name
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          filterArr.push(allPokemons[i])
        }
      }

      filterArr.length === 0
        ? setFilterPokemons([])
        : setFilterPokemons(filterArr)
    }
  }

  const handleChangeRegion = (e) => {
    if (e.target.value === 'kanto') {
      setLimit(151)
      setOffset(0)
    } else if (e.target.value === 'johto') {
      setLimit(100)
      setOffset(151)
    } else if (e.target.value === 'hoenn') {
      setLimit(135)
      setOffset(251)
    } else if (e.target.value === 'sinnoh') {
      setLimit(108)
      setOffset(386)
    } else if (e.target.value === 'unova') {
      setLimit(155)
      setOffset(494)
    } else if (e.target.value === 'kalos') {
      setLimit(72)
      setOffset(649)
    } else if (e.target.value === 'alola') {
      setLimit(88)
      setOffset(721)
    } else if (e.target.value === 'galar') {
      setLimit(89)
      setOffset(809)
    }
  }

  const handleResetFilterAndSearch = () => {
    setIsFilter(false)
    setFilterPokemons([])
    setIsSearch(false)
    setSearchPokemons([])
    fetchAllPokemons(151, 0)
  }

  return (
    <>
      <Hero
        pokemon={heroPokemon}
        handleClick={() => handleClickPokemon(heroPokemon)}
        imageType={imageType}
      />
      <div id="site-more" className="flex flex-col py-4">
        <SiteActions
          handleChangeImageType={handleChangeImageType}
          handleChangeRegion={handleChangeRegion}
          handleFilter={handleFilter}
          handleSearch={handleSearch}
          handleReset={handleResetFilterAndSearch}
        />
        <div className="divider" />
        <div className="p-2 lg:px-12 xl:px-52 2xl:px-96">
          <div className="place-self-center lg:place-self-start"></div>
          <div className="mt-8 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3">
            {isFilter ? (
              <PokemonList
                pokemons={filterPokemons}
                imageType={imageType}
                handleClickPokemon={handleClickPokemon}
              />
            ) : isSearch ? (
              <PokemonList
                pokemons={searchPokemons}
                imageType={imageType}
                handleClickPokemon={handleClickPokemon}
              />
            ) : (
              <PokemonList
                pokemons={allPokemons}
                imageType={imageType}
                handleClickPokemon={handleClickPokemon}
              />
            )}
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
