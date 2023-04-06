import './App.css'
import Menu from './Menu'
import { ActiveProps } from './interfaces/props'
import Table from './Table'

function Home (props: ActiveProps) {
  const { active, searchValue, setSearchValue } = props

  return (
    <div className='App'>
      <Menu
        active={active}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <div className='ui raised segment inverted'>
        <Table searchValue={searchValue!} />
      </div>
    </div>
  )
}

export default Home
