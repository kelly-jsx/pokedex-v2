import { Header } from './Header'
import { HeroPokeCard } from './HeroPokeCard'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' }
]

export default function Hero() {
  return (
    <>
      <div className="hero min-h-screen">
        <img
          src="https://imgs.search.brave.com/gmvfsWd_YMWjnie209NGc43vnJ-dz33f050OEKic_SM/rs:fit:1200:1200:1/g:ce/aHR0cDovL2dldHdh/bGxwYXBlcnMuY29t/L3dhbGxwYXBlci9m/dWxsL2IvNS83LzE0/NTgwOTItYmVhdXRp/ZnVsLXBva2Vtb24t/bW92aWUtd2FsbHBh/cGVyLTM4NDB4MjE2/MC1mb3ItYW5kcm9p/ZC01MC5qcGc"
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
          <div>
            <h1 className="text-5xl font-bold">Pokedex</h1>
            <p className="py-6 pr-3">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn-primary btn">Get Started</button>
          </div>
          <HeroPokeCard />
        </div>
      </div>
    </>
  )
}
