import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ActiveProps } from './interfaces/props'

function Menu ({ active, searchValue, setSearchValue }: ActiveProps) {
  return (
    <>
      <h1
        style={{
          color: 'lightgoldenrodyellow',
          textShadow: '2px 2px 4px #000000'
        }}
      >
        <span style={{ color: 'orange', textShadow: '2px 2px 4px #000000' }}>
          GeoGuessr Stats
        </span>
      </h1>
      <h2 style={{ color: 'white', textShadow: '2px 2px 4px #000000' }}>
        <span
          style={{
            color: 'lightgoldenrodyellow',
            textShadow: '2px 2px 4px #000000'
          }}
        >
          Find your stats
        </span>
      </h2>
      <div className='ui small menu inverted'>
        <a className={active === 'home' ? 'active item' : 'item'} href='/'>
          Home
        </a>
        <a
          className={active === 'total' ? 'active item' : 'item'}
          href='/stats/total'
        >
          Total Stats
        </a>
        <div className='right menu inverted'>
          <div className='item'>
            <div className='ui transparent icon input inverted'>
              <input
                type='text'
                placeholder='Find your stats...'
                onChange={e => setSearchValue!(e.target.value)}
              />
              <i className='search link icon'></i>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Menu
