import { Counter } from 'utils/Counter'
import Hero from './Hero/Hero'
import { SiteActions } from './SiteActions'
import { PokeCard } from './PokeCard'
import { InfoModal } from './InfoModal'
import { Footer } from './Footer'

export default function App() {
  const ApiUrl = 'https://pokeapi.co/api/v2/'

  return (
    <>
      <Hero />
      {/* <Counter /> */}

      <div id="site-more" className="flex flex-col py-4">
        <SiteActions />
        <div className="divider" />
        <div className="mx-4 mt-8 grid grid-cols-1 gap-4 pb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          <PokeCard />
          <PokeCard />
          <PokeCard />
          <PokeCard />
          <PokeCard />
          <PokeCard />
          <PokeCard />
          <PokeCard />
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
