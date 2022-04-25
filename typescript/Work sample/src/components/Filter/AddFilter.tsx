import useHideOnClickOutside from "hook/useHideOnClickOutside";
import { AddFilterTextButton } from "./styles";

import { OnEditFilter } from "./OnEditFilter";

export function AddFilter() {
  const [isOnEdit, setIsOnEdit, ref] = useHideOnClickOutside<HTMLDivElement>(false);

  return (
    <div ref={ref}>
      {isOnEdit ? (
        <OnEditFilter
          filter={{
            category: null,
            relation: null,
            option: null,
          }}
          onClose={() => setIsOnEdit(false)}
        />
      ) : (
        <AddFilterTextButton onClick={() => setIsOnEdit(true)}>
          Search or add filters
        </AddFilterTextButton>
      )}
    </div>
  );
}
