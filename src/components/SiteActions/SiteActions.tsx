import React from 'react'
import { FilterType } from './FilterType'
import { ImageType } from './ImageType'

type Props = {
  handleChangeImageType: () => void
}

export const SiteActions = ({ handleChangeImageType }: Props) => {
  return (
    <div className="flex flex-col lg:px-12">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <FilterType />
        <div className="form-control mx-auto mt-2 lg:mx-0">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input-bordered input"
            />
            <button className="btn-primary btn-square btn hover:btn-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <ImageType handleChangeImageType={handleChangeImageType} />
    </div>
  )
}
