import React from 'react'

export const ImageType = ({ handleChangeImageType }) => (
  <div className="form-control w-full max-w-xs px-8 lg:px-0">
    <label className="label">
      <span className="label-text">
        Pick your favourite style of Pokemon images
      </span>
    </label>
    <select className="select-bordered select" onChange={handleChangeImageType}>
      <option value={'dreamworld'}>Dream World</option>
      <option value={'pixel'}>Pixel</option>
      <option value={'home'}>Home</option>
    </select>
  </div>
)
