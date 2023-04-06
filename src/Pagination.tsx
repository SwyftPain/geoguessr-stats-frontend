import React from 'react'

interface Props {
  currentPage: number
  totalPages: number
  onChangePage: (pageNumber: number) => void
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  onChangePage
}) => {
  const pageNumbers = []

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className='ui pagination menu inverted'>
      {totalPages > 2 && currentPage !== 1 && (
        <a className='item' onClick={() => onChangePage(1)}>
          First
        </a>
      )}

      {currentPage !== 1 && (
        <a className='item' onClick={() => onChangePage(currentPage - 1)}>
          Previous
        </a>
      )}

      {pageNumbers.map(pageNumber => (
        <a
          key={pageNumber}
          className={`item ${currentPage === pageNumber ? 'active' : ''}`}
          onClick={() => onChangePage(pageNumber)}
        >
          {pageNumber}
        </a>
      ))}

      {currentPage !== totalPages && (
        <a className='item' onClick={() => onChangePage(currentPage + 1)}>
          Next
        </a>
      )}

      {totalPages > 2 && currentPage !== totalPages && (
        <a className='item' onClick={() => onChangePage(totalPages)}>
          Last
        </a>
      )}
    </div>
  )
}

export default Pagination
