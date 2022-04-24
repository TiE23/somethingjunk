import { useContext } from "react";

import { Filter as FilterType, FilterValues } from "../../types/filters";
import { ActiveFilter } from "./ActiveFilter";

// custom hook
import useHideOnClickOutside from "../../hook/useHideOnClickOutside";
import FiltersContext from "context/FiltersContext";

// To enforce typing from the json file requires I use require().
// eslint-disable-next-line @typescript-eslint/no-var-requires
const filterValues: FilterValues = require("../../const/filterValues.json");

type FilterProps = {
  filter: FilterType,
  filterIndex: number,
};

export function Filter({ filter, filterIndex }: FilterProps): JSX.Element {
  /*
    props: {
      filters: [
        [
          category: <string>,
          relation: <string>,
          option: <string>
        ],
        ...
      ]
    }
  */
  const [isOnEdit, setIsOnEdit, ref] = useHideOnClickOutside<HTMLDivElement>(false);

  const { setFilters } = useContext(FiltersContext);

  const onDelete = () => {
    if (setFilters) {
      setFilters(prevFilters => prevFilters.filter((_, index) => index !== filterIndex));
    }
  };


  return (
    <div ref={ref}>
      {isOnEdit ? (
        <div>Editing {filter.category}</div>
      ) : (
        <ActiveFilter
          filter={filter}
          onClick={() => setIsOnEdit(true)}
          onDelete={onDelete}
        />
      )}
    </div>
  );
}
