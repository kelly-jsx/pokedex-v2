import { PokeButton } from 'components/PokeButton'
import React from 'react'
import { FilterType } from './FilterType'
import { ImageType } from './ImageType'
import { SearchInput } from './SearchInput'

type Props = {
  handleChangeImageType: () => void
  handleSearch: (e) => void
  handleReset: () => void
}

export const SiteActions = ({
  handleChangeImageType,
  handleSearch,
  handleReset
}: Props) => {
  return (
    <div className="flex flex-col lg:px-12">
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <FilterType />
        <SearchInput handleSearch={handleSearch} />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <ImageType handleChangeImageType={handleChangeImageType} />
        <button
          className="btn-primary btn hover:btn-secondary mt-2 lg:mt-0 w-full lg:w-auto"
          onClick={handleReset}
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
