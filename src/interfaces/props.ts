import { ActivePage } from '../enums/props'

interface ActiveProps {
  active: ActivePage
  searchValue?: string
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>
}

interface SearchProps {
  searchValue: string
}

export type { ActiveProps, SearchProps }
