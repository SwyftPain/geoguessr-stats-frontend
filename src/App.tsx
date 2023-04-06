import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './Register'
import HomePage from './Home'
import Weekly from './Weekly'
import Total from './Total'

function App () {
  const [searchValue, setSearchValue] = useState('')

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/register'
          element={<RegisterPage active={'register'} />}
        />
        <Route
          path='/'
          element={
            <HomePage
              active={'home'}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          }
        />
        <Route
          path='/stats/total'
          element={
            <Total
              active={'total'}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
