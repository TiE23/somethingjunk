import { useState } from 'react'
import Searchbar from 'components/Searchbar'

function App() {
  const [filters, setFilters] = useState(defaultFilters)

  return (
    <div>
      <Searchbar
        filters={filters}
        setFilters={setFilters}
      />
      <div style={{marginLeft: '10px'}}>Currently applied filters</div>
      <ul>
        {filters.map(filter => (
          <li key={filter}>{filter.join(' ')}</li>
        ))}
      </ul>
    </div>
  )
}

const defaultFilters = [
  ["Ad Name", "is", "viralspace_ad_1"],
  ["Background Color", "is not", "black"],
  ["Device Platform", "is not", "Desktop, Tablet"]
]

export default App
