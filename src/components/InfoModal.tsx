import React from 'react'

import { GiBodyHeight, GiWeight, GiMale, GiFemale } from 'react-icons/gi'

import { Type } from './Type'
import { InfoStat } from './InfoStat'
import { getTypeColor } from 'utils'

// export const InfoModal = ({
export const InfoModal = ({
  index,
  name,
  imgUrl,
  type,
  height,
  weight,
  category,
  description,
  abilities,
  stats
}) => {
  let finalColor = []

  if (type.length === 2) {
    finalColor = [
      getTypeColor(type[0]?.type?.name),
      getTypeColor(type[1]?.type?.name)
    ]
  } else if (type.length === 1) {
    finalColor = [
      getTypeColor(type[0]?.type?.name),
      getTypeColor(type[0]?.type?.name)
    ]
  }

  return (
    <>
      <input type="checkbox" id="info-modal" className="modal-toggle" />
      <div className="modal">
        <div
          className="relative h-screen overflow-y-auto rounded-lg text-black shadow-lg lg:h-auto"
          style={{
            background: `linear-gradient(${finalColor[0]}, ${finalColor[1]})`
          }}
        >
          <div className="rounded-lg p-4">
            <label
              htmlFor="info-modal"
              className="btn-sm btn-circle btn absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="flex flex-col lg:flex-row">
              <div className="mx-auto flex w-full lg:w-auto">
                <div
                  className="flex w-full flex-col gap-4 rounded-lg p-2 text-center"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <div className="flex flex-col">
                    <p>#{String(index).padStart(3, '0')}</p>
                    <p className="capitalize">{name}</p>
                    <div
                      className="mx-auto w-max rounded-md py-1 px-2"
                      style={{
                        backgroundColor: getTypeColor(type[0]?.type?.name),
                        boxShadow: `0 0 20px ${getTypeColor(
                          type[0]?.type?.name
                        )}`
                      }}
                    >
                      <p className="capitalize">{category}</p>
                    </div>
                  </div>
                  <img src={imgUrl} alt={name} className="mx-auto h-60" />
                  <div className="mt-2 flex cursor-default justify-center gap-2">
                    {type.map((type) => (
                      <Type pokeType={type.type.name} />
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center gap-2">
                      <GiBodyHeight />
                      <p>
                        <b>Height:</b> {height}cm
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <GiWeight />
                      <p>
                        <b>Weight:</b> {weight}kg
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex items-center gap-1">
                        <GiMale /> <p>87.5%</p>
                      </div>
                      <div className="flex items-center">
                        <GiFemale /> <p>12.5%</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="divider divider-horizontal hidden lg:flex"></div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="max-w-lg">
                  <p>About</p>
                  <p className="break-words">{description}</p>
                </div>
                <div>
                  <p>Abilities</p>
                  <ul className={'flex list-disc gap-8 pl-4'}>
                    {abilities.map((ability) => (
                      <li key={ability.ability.name} className="capitalize">
                        {ability.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p>Stats</p>
                  {stats.map((stats) => (
                    <InfoStat
                      key={stats.stat.name}
                      statName={stats.stat.name}
                      statNumber={stats.base_stat}
                    />
                  ))}
                </div>
                <div>
                  <p>Evolution</p>
                  <div className="flex justify-center gap-4">
                    <div>Evolution 1</div>
                    <div>Evolution 2</div>
                    <div>Evolution 3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
