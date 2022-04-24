import { useContext } from "react";

import { Searchbar } from "./components/Searchbar";
import FiltersContext from "context/FiltersContext";

function App(): JSX.Element {
  // Using context to handle the filters.
  const { filters } = useContext(FiltersContext);

  return (
    <div>
      <Searchbar filters={filters} />
      <div style={{ marginLeft: "10px" }}>Currently applied filters</div>
      <ul>
        {filters.map(({ category, relation, option }) => (
          <li key={category}>{category} {relation} {option}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
