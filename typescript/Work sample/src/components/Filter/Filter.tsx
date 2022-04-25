import { useContext } from "react";

import { Filter as FilterType } from "../../types/filters";
import { ActiveFilter } from "./ActiveFilter";
import FiltersContext from "context/FiltersContext";
import { OnEditFilter } from "./OnEditFilter";

// custom hook
import useHideOnClickOutside from "../../hook/useHideOnClickOutside";

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
        <OnEditFilter
          filter={filter}
          onClose={() => setIsOnEdit(false)}
        />
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
