import React from 'react'

type Props = {
  handleChangeRegion: () => void
}

export const FilterRegion = ({ handleChangeRegion }: Props) => (
  <div className="form-control w-full max-w-xs mx-auto lg:mx-0">
    <label className="label">
      <span className="label-text">Region</span>
    </label>
    <select className="select-bordered select" onChange={handleChangeRegion}>
      <option value={'kanto'}>Kanto (1-151)</option>
      <option value={'johto'}>Johto (152-251)</option>
      <option value={'hoenn'}>Hoenn (252-386)</option>
      <option value={'sinnoh'}>Sinnoh (387-494)</option>
      <option value={'unova'}>Unova (495-649)</option>
      <option value={'kalos'}>Kalos (650-721)</option>
      <option value={'alola'}>Alola (722-809)</option>
      <option value={'galar'}>Galar (810-898)</option>
    </select>
  </div>
)
