import { SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'

import { Counter } from 'utils/Counter'
import { Hero } from './Hero/Hero'
import { SiteActions } from './SiteActions/SiteActions'
import { InfoModal } from './InfoModal/InfoModal'
import { Footer } from './Footer'

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
  const [maxLimit, setMaxLimit] = useState(151)
  const [limit, setLimit] = useState(10)
  const [offset, setOffset] = useState(0)

  const [allPokemons, setAllPokemons] = useState([])
  const [allRegionPokemons, setAllRegionPokemons] = useState([])
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
    stats: [],
    gender: 0
  })

  useEffect(() => {
    fetchAllPokemons(limit, offset)
    fetchAllRegionPokemons(maxLimit, offset)
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

  const fetchAllRegionPokemons = async (limit: number, offset: number) => {
    const res = await axios
      .get(`${ApiUrl}pokemon?limit=${limit}&offset=${offset}`)
      .catch((err) => console.log(err))
    fetchRegionPokemonData(res.data.results)
  }

  const fetchRegionPokemonData = async (res: any[]) => {
    const pokemonArr: any[] | ((prevState: never[]) => never[]) = []

    await Promise.all(
      res.map((pokemon: { name: any }) => {
        return axios.get(`${ApiUrl}pokemon/${pokemon.name}`).then((res) => {
          pokemonArr.push(res.data)
        })
      })
    )

    pokemonArr.sort((a, b) => (a.id > b.id ? 1 : b.id > a.id ? -1 : 0))

    setAllRegionPokemons(pokemonArr)
  }

  const fetchPokemonDetails = async (pokemon: any) => {
    return axios.get(`${ApiUrl}pokemon/${pokemon}`).then((res) => {
      const data = res.data

      let sprites

      if (imageType === 'dreamworld') {
        data.sprites.other.dream_world.front_default
          ? (sprites = data.sprites.other.dream_world.front_default)
          : (sprites = data.sprites.other['official-artwork'].front_default)
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
        category: category,
        gender: data.gender_rate
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

    for (let i = 0; i < allRegionPokemons.length; i++) {
      if (
        allRegionPokemons[i].name.toLowerCase().includes(value.toLowerCase()) ||
        allRegionPokemons[i].id.toString().includes(value) ||
        allRegionPokemons[i].id.toString().padStart(3, '0').includes(value)
      ) {
        searchArr.push(allRegionPokemons[i])
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

    for (let i = 0; i < allRegionPokemons.length; i++) {
      for (let j = 0; j < allRegionPokemons[i].types.length; j++) {
        if (
          allRegionPokemons[i].types[j].type.name
            .toLowerCase()
            .includes(value.toLowerCase())
        ) {
          filterArr.push(allRegionPokemons[i])
        }
      }

      filterArr.length === 0
        ? setFilterPokemons([])
        : setFilterPokemons(filterArr)
    }
  }

  const handleChangeRegion = (e) => {
    if (e.target.value === 'kanto') {
      setMaxLimit(151)
      setOffset(0)
      setRegion('kanto')
    } else if (e.target.value === 'johto') {
      setMaxLimit(100)
      setOffset(151)
      setRegion('johto')
    } else if (e.target.value === 'hoenn') {
      setMaxLimit(135)
      setOffset(251)
      setRegion('hoenn')
    } else if (e.target.value === 'sinnoh') {
      setMaxLimit(108)
      setOffset(386)
      setRegion('sinnoh')
    } else if (e.target.value === 'unova') {
      setMaxLimit(155)
      setOffset(494)
      setRegion('unova')
    } else if (e.target.value === 'kalos') {
      setMaxLimit(72)
      setOffset(649)
      setRegion('kalos')
    } else if (e.target.value === 'alola') {
      setMaxLimit(88)
      setOffset(721)
      setRegion('alola')
    } else if (e.target.value === 'galar') {
      setMaxLimit(89)
      setOffset(809)
      setRegion('galar')
    }

    setLimit(10)
  }

  const handleResetFilterAndSearch = () => {
    setIsFilter(false)
    setFilterPokemons([])
    setIsSearch(false)
    setSearchPokemons([])
    setLimit(10)
  }

  const handleShowMore = () => {
    if (limit + 10 > maxLimit) {
      setLimit(maxLimit)
    } else {
      setLimit(limit + 10)
    }
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
        {/* <div className="place-self-center lg:place-self-start"></div> */}
        <div className="mt-2 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 w-full px-4">
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
        {limit !== maxLimit && (
          <button
            className="btn btn-primary mx-auto hover:btn-secondary"
            onClick={handleShowMore}
          >
            Show more Pokemons
          </button>
        )}
      </div>
      <Footer />
      <InfoModal
        pokemon={selectedPokemon}
        index={selectedPokemon.index}
        name={selectedPokemon.name}
        imgUrl={selectedPokemon.imgUrl}
        type={selectedPokemon.types}
        height={selectedPokemon.height}
        weight={selectedPokemon.weight}
        gender={selectedPokemon.gender}
        category={selectedPokemon.category}
        description={selectedPokemon.description}
        abilities={selectedPokemon.abilities}
        stats={selectedPokemon.stats}
        handleCloseModal={handleCloseModal}
        handleClickEvo={handleClickPokemon}
        imageType={imageType}
      />
    </>
  )
}
