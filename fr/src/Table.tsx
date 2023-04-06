import { useState, useEffect, useMemo, useCallback } from 'react'
import howLongAgo from './functions/time'
import mysql from 'mysql2/promise'
import { SearchProps } from './interfaces/props'
import Pagination from './Pagination'

function Table (props: SearchProps) {
  const { searchValue } = props
  const uniquePlayers = new Set<string>()
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<mysql.RowDataPacket[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [resultsPerPage, setResultsPerPage] = useState(10)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handleMediaChange = (e: any) => {
      setIsMobile(e.matches)
    }

    mediaQuery.addEventListener('change', handleMediaChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange)
    }
  }, [])

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('https://express-backend.vercel.app/api/getstats')
      const data = await response.json()
      setResults(data)
      setLoading(false)
    } catch (error) {
      console.log('Error', error)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const intervalId = setInterval(async () => {
      try {
        await fetchData()
      } catch (error) {
        console.log('Error', error)
      }
    }, 60000)
    return () => clearInterval(intervalId)
  }, [fetchData])

  results.forEach((row: mysql.RowDataPacket) => {
    uniquePlayers.add(row.user)
  })

  const filteredResults = useMemo(() => {
    return results.filter(row => {
      return row.user.toLowerCase().includes(searchValue!.toLowerCase())
    })
  }, [results, searchValue])

  const indexOfLastResult = currentPage * resultsPerPage
  const indexOfFirstResult = indexOfLastResult - resultsPerPage
  const currentResults = useMemo(() => {
    return results.slice(indexOfFirstResult, indexOfLastResult)
  }, [results, indexOfFirstResult, indexOfLastResult])

  const totalPages = Math.ceil(results.length / resultsPerPage)

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : currentResults.length > 0 ? (
        <>
          <table
            className={
              isMobile
                ? 'ui unstackable table inverted'
                : 'ui sortable celled structured table inverted'
            }
          >
            <thead>
              <tr>
                <th rowSpan={2} className='collapsing descending'>
                  <i className='normal silver user icon'></i>{' '}
                  {isMobile ? 'User' : 'Username'}:
                </th>
                <th colSpan={3} style={{ pointerEvents: 'none' }}>
                  <i className='normal silver list icon'></i>
                  Score:
                </th>
              </tr>
              <tr>
                <th className='descending'>
                  <i className='normal blue calendar icon'></i>{' '}
                  {isMobile ? 'D/T' : 'Date/Time'}:
                </th>
                <th className='descending'>
                  <i className='normal green checkmark icon'></i>{' '}
                  {isMobile ? 'W' : 'Wins'}:
                </th>
                <th className='descending'>
                  <i className='normal red x icon'></i>{' '}
                  {isMobile ? 'L' : 'Losses'}:
                </th>
              </tr>
            </thead>
            <tbody>
              {(searchValue ? filteredResults : currentResults).map(row => (
                <tr key={row.id}>
                  <td>{row.user}</td>
                  <td>{howLongAgo(row.date)}</td>
                  <td>{row.wins}</td>
                  <td>{row.losses}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>{uniquePlayers.size} players</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onChangePage={handlePageClick}
          />
        </>
      ) : (
        <p>No results!</p>
      )}
    </>
  )
}

export default Table
