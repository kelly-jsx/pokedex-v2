import { Counter } from 'utils/Counter'
import Hero from './Hero/Hero'
import { SiteActions } from './SiteActions'
import { PokeCard } from './PokeCard'
import { InfoModal } from './InfoModal'

export default function App() {
  return (
    <>
      <Hero />
      {/* <Counter /> */}

      <div id="site-more" className="py-4">
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
      </div>
      <InfoModal />
    </>
  )
}
