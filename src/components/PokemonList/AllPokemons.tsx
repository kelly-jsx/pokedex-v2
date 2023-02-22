import { PokeCard } from 'components/PokeCard'

type Props = {
  allPokemons: []
  imageType: string
  handleClickPokemon: () => void
}

export const AllPokemons = ({
  allPokemons,
  imageType,
  handleClickPokemon
}: Props) =>
  Object.keys(allPokemons).map((item) => (
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
  ))
