import { Header } from './Header'
import { HeroPokeCard } from './HeroPokeCard'
import { PokeButton } from 'components/PokeButton'

type Props = {
  handleClick: () => void
  imageType: string
}

export const Hero = ({ handleClick, imageType }: Props) => {
  const heroPokemon = 'charmander'

  return (
    <>
      <div className="hero min-h-screen text-white">
        <img
          src="https://imgs.search.brave.com/cwGvC8RZYcsBLvaIlqqglK_gI5GP1nYfJRpD6d6HAS4/rs:fit:1200:1080:1/g:ce/aHR0cDovL3dhbGxw/YXBlcmNhdmUuY29t/L3dwL0thcVBPT3Eu/anBn"
          alt="background image"
          className="object-cover"
          style={{
            position: 'absolute',
            left: '0px',
            top: '0px',
            zIndex: -1,
            width: '100%',
            height: '100%',
            filter: 'blur(5px)',
            WebkitFilter: 'blur(5px)'
          }}
        />
        <Header />
        <div className="hero-content flex-col lg:flex-row">
          <div className="lg:w-1/2">
            <h1 className="text-5xl font-bold">Pokedex</h1>
            <p className="py-6 pr-3">
              Check pokemon stats, description and more.
            </p>
            <a href="#site-more">
              <PokeButton>Get Started</PokeButton>
            </a>
          </div>
          <div className="lg:w-1/2">
            <HeroPokeCard
              heroPokemon={heroPokemon}
              handleClick={handleClick(heroPokemon)}
              imageType={imageType}
            />
          </div>
        </div>
      </div>
    </>
  )
}
