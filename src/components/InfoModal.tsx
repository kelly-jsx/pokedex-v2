import React from 'react'

import { GiBodyHeight, GiWeight, GiMale, GiFemale } from 'react-icons/gi'

import { Type } from './Type'
import { InfoStat } from './InfoStat'

export const InfoModal = () => {
  return (
    <>
      <input type="checkbox" id="info-modal" className="modal-toggle" />
      <div className="modal">
        <div className="relative h-screen overflow-y-auto rounded-lg bg-base-100 p-4 shadow-lg lg:h-auto">
          <label
            htmlFor="info-modal"
            className="btn-sm btn-circle btn absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="flex flex-col lg:flex-row">
            <div className="mx-auto flex">
              <div className="flex flex-col gap-4 text-center">
                <div>
                  <p>#004</p>
                  <p>Charmander</p>
                  <p>Lizard Pokemon</p>
                </div>
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg"
                  alt=""
                  className="mx-auto h-60"
                />
                <div className="mt-2 flex cursor-default justify-center gap-2">
                  <Type pokeType={'fire'} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center gap-2">
                    <GiBodyHeight />
                    <p>
                      <b>Height:</b> 20cm
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <GiWeight />
                    <p>
                      <b>Height:</b> 20kg
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
                <p className="break-words">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
              <div>
                <p>Abilities</p>
                <ul className={'flex list-disc gap-8 pl-4'}>
                  <li className="capitalize">Ability 1</li>
                  <li className="capitalize">Ability 2</li>
                </ul>
              </div>
              <div>
                <p>Stats</p>
                <InfoStat statName="HP" statNumber="39" />
                <InfoStat statName="Attack" statNumber="50" />
                <InfoStat statName="Defense" statNumber="39" />
                <InfoStat statName="Sp. Atk" statNumber="39" />
                <InfoStat statName="Sp. Def" statNumber="39" />
                <InfoStat statName="Speed" statNumber="39" />
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
    </>
  )
}
