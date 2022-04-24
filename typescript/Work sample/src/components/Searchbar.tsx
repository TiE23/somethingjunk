// component
import { Filter as FilterType } from "../types/filters";
import Filter from "./Filter";

// style
import styles from "./Searchbar.module.css";

type SearchBarProps = {
  filters: FilterType[],
  setFilters: (filters: FilterType[]) => void,
}

export default function Searchbar({ filters, setFilters }: SearchBarProps): JSX.Element {
  /*
    filters: [
      [
        category: <string>,
        relation: <string>,
        option: <string>
      ],
      ...
    ],
    setFilters: fn(
      [
        [
          category: <string>,
          relation: <string>,
          option: <string>
        ],
        ...
      ]
    )
  */
  return (
    <div className={styles.Searchbar}>
      {filters.map(filter => (
        <Filter
          filter={filter}
          key={filter.category}
        />
      ))}
      <div>Search or add filters</div>
    </div>
  );
}
