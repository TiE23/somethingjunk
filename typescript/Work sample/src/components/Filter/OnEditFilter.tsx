import { ChangeEvent, useState } from "react";
import { Filter as FilterType, FilterCategory, FilterRelation, FilterValues } from "types/filters";

// To enforce typing from the json file requires I use require().
// eslint-disable-next-line @typescript-eslint/no-var-requires
const filterValues: FilterValues = require("../../const/filterValues.json");

const filtersList = Object.entries(filterValues);
const relationList = Object.entries(FilterRelation).map(([_, value]) => value);

type OnEditFilterProps = {
  filter: FilterType,
}
export function OnEditFilter({ filter }: OnEditFilterProps) {
  const [draftFilter, setDraftFilter] = useState(filter);

  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilter(prevFilter => ({
      category: event.target.value === "NONE" ? null : event.target.value as FilterCategory,
      relation: prevFilter?.relation ?? FilterRelation.IS,  // Keep relation if present
      option: null,
    }));
  };

  const handleRelationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilter(prevFilter => ({
      ...prevFilter,
      relation: event.target.value as FilterRelation,
    }));
  };


  console.log("draftfilter", draftFilter);

  return (
    <div>
      <select
        title="Filter Category"
        value={draftFilter.category ?? undefined}
        onChange={handleCategoryChange}
      >
        <option value={"NONE"}></option>
        {filtersList.map(([categoryName]) =>
          <option key={categoryName} value={categoryName}>{categoryName}</option>,
        )}
      </select>
      {draftFilter.category != null && (
        <select
          title="Filter Relation"
          value={draftFilter.relation ?? undefined}
          onChange={handleRelationChange}
        >
          {relationList.map(relation =>
            <option key={relation} value={relation}>{relation}</option>,
          )}
        </select>
      )}
    </div>
  );
}
