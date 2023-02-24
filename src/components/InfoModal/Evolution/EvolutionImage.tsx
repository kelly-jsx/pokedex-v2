import { getTypeColor } from 'utils'

export const EvolutionImg = ({ evolves, handleClickEvo }) => {
  let finalColor = []

  if (evolves.type.length === 2) {
    finalColor = [
      getTypeColor(evolves.type[0].type.name),
      getTypeColor(evolves.type[1].type.name)
    ]
  } else {
    finalColor = [
      getTypeColor(evolves.type[0].type.name),
      getTypeColor(evolves.type[0].type.name)
    ]
  }
  return (
    <div
      className="m-auto w-36 h-36 cursor-pointer rounded-full shadow-md transition ease-in-out hover:-translate-y-1.5 hover:scale-105 delay-75"
      style={{
        background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`
      }}
      onClick={() => handleClickEvo(evolves.name)}
    >
      <div
        className="w-full h-full rounded-full p-6 flex items-center justify-center"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.3)'
        }}
      >
        <img
          src={evolves.image}
          className="w-fit h-fit"
          alt={`pokemon image ${evolves.name}`}
        />
      </div>
    </div>
  )
}
