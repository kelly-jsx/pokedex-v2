import { useState } from 'react'

type Props = {
  handleSearch: (e) => void
}

export const SearchInput = ({ handleSearch }: Props) => {
  const [searchValue, setSearchValue] = useState('')

  return (
    <form
      className="form-control mx-auto mt-2 lg:mx-0 lg:mt-0 w-full lg:w-auto"
      onSubmit={() => {
        handleSearch(searchValue)
        setSearchValue('')
      }}
    >
      <div className="input-group">
        <input
          type="text"
          placeholder="Search…"
          className="input-bordered input w-full lg:w-auto"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button
          className="btn-primary btn-square btn hover:btn-secondary"
          type="submit"
        >
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
    </form>
  )
}
