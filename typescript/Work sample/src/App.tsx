import { useState } from "react";
import { Filter, FilterRelation } from "./types/filters";
import Searchbar from "./components/Searchbar";

function App(): JSX.Element {
  const [filters, setFilters] = useState(defaultFilters);

  return (
    <div>
      <Searchbar
        filters={filters}
        setFilters={setFilters}
      />
      <div style={{ marginLeft: "10px" }}>Currently applied filters</div>
      <ul>
        {filters.map(({ category, relation, option }) => (
          <li key={category}>{category} {relation} {option}</li>
        ))}
      </ul>
    </div>
  );
}

// const defaultFilters: [string, string, string][] = [
//   ["Ad Name", "is", "viralspace_ad_1"],
//   ["Background Color", "is not", "black"],
//   ["Device Platform", "is not", "Desktop, Tablet"],
// ];
const defaultFilters: Filter[] = [
  { category: "Ad Name", relation: FilterRelation.IS, option: "viralspace_ad_1" },
  { category: "Background Color", relation: FilterRelation.IS_NOT, option: "black" },
  { category: "Device Platform", relation: FilterRelation.IS_NOT, option: "Desktop, Tablet" },
];

export default App;
