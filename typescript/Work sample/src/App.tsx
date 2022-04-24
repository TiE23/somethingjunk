import { useState } from "react";

import { Filter, FilterCategory, FilterRelation } from "./types/filters";
import { Searchbar } from "./components/Searchbar";

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

/**
 * I'm taking the time to define the state a little more concretely so as to
 * take advantage of strong typing. Enums, all that stuff. It's what I'd like to
 * write at my actual job, so, I'm doing it for you here.
 */
const defaultFilters: Filter[] = [
  { category: FilterCategory.AD_NAME, relation: FilterRelation.IS, option: "viralspace_ad_1" },
  { category: FilterCategory.BG_COLOR, relation: FilterRelation.IS_NOT, option: "black" },
  { category: FilterCategory.DEVICE_PLATFORM, relation: FilterRelation.IS_NOT, option: "Desktop, Tablet" },
];

export default App;
