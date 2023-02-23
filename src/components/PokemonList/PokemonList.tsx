import { PokeCard } from 'components/PokeCard'

type Props = {
  pokemons: []
  imageType: string
  handleClickPokemon: () => void
}

export const PokemonList = ({
  pokemons,
  imageType,
  handleClickPokemon
}: Props) =>
  Object.keys(pokemons).map((item) => (
    <PokeCard
      key={pokemons[item].id}
      index={pokemons[item].id}
      name={pokemons[item].name}
      image={
        imageType === 'dreamworld'
          ? pokemons[item].sprites.other.dream_world.front_default
            ? pokemons[item].sprites.other.dream_world.front_default
            : pokemons[item].sprites.other['official-artwork'].front_default
          : imageType === 'home'
          ? pokemons[item].sprites.other.home.front_default
          : imageType === 'pixel'
          ? pokemons[item].sprites.front_default
          : null
      }
      type={pokemons[item].types}
      handleClick={() => handleClickPokemon(pokemons[item].name)}
    />
  ))
