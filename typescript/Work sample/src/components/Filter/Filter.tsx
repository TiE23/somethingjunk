import { Filter as FilterType, FilterValues } from "../../types/filters";
import { ActiveFilter } from "./ActiveFilter";

// custom hook
import useHideOnClickOutside from "../../hook/useHideOnClickOutside";

// const
// eslint-disable-next-line @typescript-eslint/no-var-requires
const filterValues: FilterValues = require("../../const/filterValues.json");

type FilterProps = {
  filter: FilterType,
};

export function Filter({ filter }: FilterProps): JSX.Element {
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

  return (
    <div ref={ref}>
      {isOnEdit ? (
        <div>Editing {filter.category}</div>
      ) : (
        <ActiveFilter
          filter={filter}
          onClick={() => setIsOnEdit(true)}
          onDelete={() => console.log("Make on Delete!")}
        />
      )}
    </div>
  );
}
