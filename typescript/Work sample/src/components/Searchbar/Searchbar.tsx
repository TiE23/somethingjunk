// component
import { AddFilter } from "components/Filter/AddFilter";
import { Filter as FilterType } from "../../types/filters";
import { Filter } from "../Filter";

// style
import { SearchbarBody } from "./styles";

type SearchBarProps = {
  filters: FilterType[],
}

export function Searchbar({ filters }: SearchBarProps): JSX.Element {
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
    <SearchbarBody>
      {filters.map((filter, filterIndex) => (
        <Filter
          filter={filter}
          filterIndex={filterIndex}
          key={filter.category}
        />
      ))}
      <AddFilter />
    </SearchbarBody>
  );
}
