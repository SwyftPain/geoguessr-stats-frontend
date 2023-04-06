import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Menu from './Menu'
import { ActiveProps } from './interfaces/props'

function Register ({ active }: ActiveProps) {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Menu active={active} />
      <div className='ui raised segment'>
        <p>Reg.</p>
      </div>
    </div>
  )
}

export default Register
