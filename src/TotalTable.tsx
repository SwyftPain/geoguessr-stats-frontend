import { useState, useEffect, useMemo, useCallback } from 'react'
import howLongAgo from './functions/time'
import mysql from 'mysql2/promise'
import { SearchProps } from './interfaces/props'
import Pagination from './Pagination'

function Table (props: SearchProps) {
  const { searchValue } = props
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

  const fetchData = async () =>
  {
      const response = await fetch('https://api.swyftpain.co.uk/api/getstats')
      const data = await response.json()
      const userStats = data.reduce((acc: any, row: any) => {
        if (!acc[row.discordid]) {
          acc[row.discordid] = {
		id: row.id,
            user: row.user,
            wins: row.wins,
            losses: row.losses
          }
        } else {
          acc[row.discordid].wins += row.wins
          acc[row.discordid].losses += row.losses
        }
        return acc
      }, {} )

      const userStatsArray = Object.values(userStats)

      setResults(userStatsArray as mysql.RowDataPacket[])

      setLoading(false)
  }

useEffect(() => {
  fetchData()
}, [fetchData])

  const filteredResults = useMemo(() => {
    return results.filter(row => {
      return row.user.toLowerCase().includes(searchValue!.toLowerCase()) || row.discordid.toLowerCase().includes(searchValue!.toLowerCase())
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
                  <i className='normal silver list icon'></i>{' '}
                  {isMobile ? 'Id' : 'Id'}:
                </th>
                <th rowSpan={2} className='collapsing descending'>
                  <i className='normal silver user icon'></i>{' '}
                  {isMobile ? 'User' : 'Username'}:
                </th>
                <th colSpan={2} style={{ pointerEvents: 'none' }}>
                  <i className='normal silver list icon'></i>
                  Score:
                </th>
              </tr>
              <tr>
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
                  <td>{row.id}</td>
                  <td>{row.user}</td>
                  <td>{row.wins}</td>
                  <td>{row.losses}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>{results.length} players</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </tfoot>
          </table>
            { searchValue.length < 1 ? <Pagination
              currentPage={ currentPage }
              totalPages={ totalPages }
              onChangePage={ handlePageClick }
            /> : '' }
        </>
      ) : (
        <p>No results!</p>
      )}
    </>
  )
}

export default Table
