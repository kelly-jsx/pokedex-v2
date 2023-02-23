import { PokeButton } from 'components/PokeButton'
import React from 'react'
import { FilterRegion } from './FilterRegion'
import { FilterType } from './FilterType'
import { ImageType } from './ImageType'
import { SearchInput } from './SearchInput'

type Props = {
  handleChangeImageType: () => void
  handleChangeRegion: () => void
  handleSearch: (e) => void
  handleReset: () => void
  handleFilter: (e) => void
}

export const SiteActions = ({
  handleChangeImageType,
  handleChangeRegion,
  handleFilter,
  handleSearch,
  handleReset
}: Props) => {
  return (
    <div className="flex flex-col lg:px-12">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
        <FilterType handleFilter={handleFilter} />
        <SearchInput handleSearch={handleSearch} />
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between items-center">
        <ImageType handleChangeImageType={handleChangeImageType} />
        <FilterRegion handleChangeRegion={handleChangeRegion} />
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
