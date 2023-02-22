type Props = {
  currentPage: number
  total: number
  onPageSelect: (page: number) => void
  itemsPerPage: number
}

export const Pagination = ({
  currentPage,
  total,
  onPageSelect,
  itemsPerPage
}: Props) => {
  let middleButtonPages = [currentPage - 1, currentPage, currentPage + 1]

  if (middleButtonPages[0] === 0)
    middleButtonPages.push(currentPage + 2, currentPage + 3)
  else if (middleButtonPages[0] === 1) middleButtonPages.push(currentPage + 2)

  if (middleButtonPages[2] === Math.ceil(total / itemsPerPage) + 1)
    middleButtonPages.unshift(0, 0, currentPage - 3, currentPage - 2)
  else if (middleButtonPages[2] === Math.ceil(total / itemsPerPage))
    middleButtonPages.unshift(0, 0, currentPage - 3)

  middleButtonPages = middleButtonPages.filter((p, i) => {
    if (p <= 1) return false
    if (p >= total / itemsPerPage) return false
    return true
  })

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="btn-group self-center">
        <button
          className={`btn ${currentPage === 1 && 'btn-active'}`}
          onClick={() => onPageSelect(1)}
        >
          1
        </button>

        {middleButtonPages.map((i) => (
          <button
            className={`btn ${i === currentPage && 'btn-active'}`}
            onClick={() => onPageSelect(i)}
          >
            {i}
          </button>
        ))}

        {total > 5 && (
          <button
            className={`
							btn ${currentPage === Math.ceil(total / itemsPerPage) && 'btn-active'}
						`}
            onClick={() => onPageSelect(Math.ceil(total / itemsPerPage))}
          >
            {Math.ceil(total / itemsPerPage)}
          </button>
        )}
      </div>
    </div>
  )
}
