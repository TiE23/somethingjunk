import { useContext, useState } from "react";

import FiltersContext from "context/FiltersContext";
import {
  Filter as FilterType,
  FilterCategory,
  FilterRelation,
  FilterValues,
} from "types/filters";

import { CategorySelectInput, OptionInput, RelationSelectInput } from "./OnEditFilterInputs";
import { InputRow } from "./styles";

// To enforce typing from the json file requires I use require().
// eslint-disable-next-line @typescript-eslint/no-var-requires
const filterValues: FilterValues = require("../../const/filterValues.json");
const categoryList = Object.entries(filterValues).map(([category]) => category) as FilterCategory[];

const relationList = Object.entries(FilterRelation).map(([_, value]) => value);

type OnEditFilterProps = {
  filter: FilterType,
  onClose: () => void,
  filterIndex: number,  // When set to -1 it's a new filter.
}
export function OnEditFilter({ filter, onClose, filterIndex }: OnEditFilterProps) {
  const [draftFilter, setDraftFilter] = useState(filter);
  const { setFilters } = useContext(FiltersContext);

  const handleSaveFilter = () => {
    if (setFilters) {
      if (filterIndex === -1) {
        // Create a new filter.
        setFilters(prevFilters => prevFilters.concat([draftFilter]));
      } else {
        // Update an existing filter.
        setFilters(prevFilters => {
          const newFilters = [...prevFilters];
          newFilters[filterIndex] = draftFilter;
          return newFilters;
        });
      }
      onClose();  // Close it, too!
    }
  };

  console.log("draftfilter", draftFilter);


  return (
    <InputRow>
      <CategorySelectInput
        draftFilter={draftFilter}
        setDraftFilter={setDraftFilter}
        categoryList={categoryList}
      />
      {draftFilter.category != null && (
        <RelationSelectInput
          draftFilter={draftFilter}
          setDraftFilter={setDraftFilter}
          relationList={relationList}
        />
      )}
      {draftFilter.category != null && (
        <OptionInput
          categoryType={filterValues[draftFilter.category].categoryType}
          options={filterValues[draftFilter.category].options}
          draftFilter={draftFilter}
          setDraftFilter={setDraftFilter}
        />

      )}
      <button
        disabled={
          !(draftFilter.category != null
          && draftFilter.relation != null
          && draftFilter.option != null)
        }
        onClick={handleSaveFilter}
      >
        {filterIndex === -1 ? "Add" : "Save"}
      </button>
      <button onClick={onClose}>x</button>
    </InputRow>
  );
}
