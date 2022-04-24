import { Filter as FilterType } from "../types/filters";

// const
// import filterValues from "../const/filterValues";

// custom hook
import useHideOnClickOutside from "../hook/useHideOnClickOutside";

type FilterProps = {
  filter: FilterType,
};

export default function Filter(
  { filter: { category, relation, option } }: FilterProps,
): JSX.Element {
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
        <div>Editing {category}</div>
      ) : (
        <>
          <button onClick={() => setIsOnEdit(true)}>{category} {relation} {option}</button>
          <button onClick={() => alert("Implement \"Delete Filter\"")}>✕</button>
        </>
      )}
    </div>
  );
}
