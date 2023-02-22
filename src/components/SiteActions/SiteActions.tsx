import React from 'react'
import { FilterType } from './FilterType'
import { ImageType } from './ImageType'
import { SearchInput } from './SearchInput'

type Props = {
  handleChangeImageType: () => void
  handleSearch: (e) => void
}

export const SiteActions = ({ handleChangeImageType, handleSearch }: Props) => {
  return (
    <div className="flex flex-col lg:px-12">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <FilterType />
        <SearchInput handleSearch={handleSearch} />
      </div>
      <ImageType handleChangeImageType={handleChangeImageType} />
    </div>
  )
}
