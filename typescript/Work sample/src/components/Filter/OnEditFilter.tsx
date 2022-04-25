import React, { ChangeEvent, useContext, useState } from "react";

import FiltersContext from "context/FiltersContext";
import {
  Filter as FilterType,
  FilterCategory,
  FilterCategoryType,
  FilterOptions,
  FilterRelation,
  FilterValues,
} from "types/filters";

// To enforce typing from the json file requires I use require().
// eslint-disable-next-line @typescript-eslint/no-var-requires
const filterValues: FilterValues = require("../../const/filterValues.json");
const categoryList = Object.entries(filterValues).map(([category]) => category) as FilterCategory[];

const relationList = Object.entries(FilterRelation).map(([_, value]) => value);

type OnEditFilterProps = {
  filter: FilterType,
  onClose: () => void,
}
export function OnEditFilter({ filter, onClose }: OnEditFilterProps) {
  const [draftFilter, setDraftFilter] = useState(filter);
  const { setFilters } = useContext(FiltersContext);

  const handleAddFilter = () => {
    if (setFilters) {
      setFilters(prevFilters => prevFilters.concat([draftFilter]));
      onClose();  // Close it, too!
    }
  };

  console.log("draftfilter", draftFilter);

  /**
   * Given there are three different option input types here's a way to create
   * the appropriate component.
   * There's a half-dozen ways to do this. If felt like using a switch statement
   * was a little better than using a chain of ternary statements in the return
   * statement below.
   */
  let OptionComponent: JSX.Element | null = null;
  if (draftFilter.category != null) {
    switch(filterValues[draftFilter.category].categoryType) {
    case FilterCategoryType.SELECT:
      OptionComponent =
        <OptionSelectInput
          options={filterValues[draftFilter.category].options}
          draftFilter={draftFilter}
          setDraftFilter={setDraftFilter}
        />;
      break;
    case FilterCategoryType.TEXT:
      OptionComponent =
        <OptionTextInput draftFilter={draftFilter} setDraftFilter={setDraftFilter} />;
      break;
    case FilterCategoryType.CHECKBOX:
      OptionComponent = (<span>CHECKBOX</span>);
      break;
    }
  }


  return (
    <div>
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
      {OptionComponent}
      <button
        disabled={
          !(draftFilter.category != null
          && draftFilter.relation != null
          && draftFilter.option != null)
        }
        onClick={handleAddFilter}
      >Add</button>
      <button onClick={onClose}>x</button>
    </div>
  );
}




/**
 * Below are input components used for editing.
 */
interface InputProps {
  draftFilter: FilterType;
  setDraftFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

interface CategorySelectInputProps extends InputProps {
  categoryList: FilterCategory[];
}
function CategorySelectInput(
  { categoryList, draftFilter, setDraftFilter }: CategorySelectInputProps,
) {
  const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilter(prevFilter => ({
      category: event.target.value === "NONE" ? null : event.target.value as FilterCategory,
      relation: prevFilter?.relation ?? FilterRelation.IS,  // Keep relation if present
      option: null,
    }));
  };

  return (
    <select
      title="Filter Category"
      value={draftFilter.category ?? undefined}
      onChange={handleCategoryChange}
    >
      <option value={"NONE"}></option>
      {categoryList.map((categoryName) =>
        <option key={categoryName} value={categoryName}>{categoryName}</option>,
      )}
    </select>
  );
}

interface RelationSelectInputProps extends InputProps {
  relationList: FilterRelation[];
}
function RelationSelectInput({ relationList, draftFilter, setDraftFilter }: RelationSelectInputProps) {
  const handleRelationChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilter(prevFilter => ({
      ...prevFilter,
      relation: event.target.value as FilterRelation,
    }));
  };

  return (
    <select
      title="Filter Relation"
      value={draftFilter.relation ?? undefined}
      onChange={handleRelationChange}
    >
      {relationList.map(relation =>
        <option key={relation} value={relation}>{relation}</option>,
      )}
    </select>
  );
}


/**
 * The following are the option input components.
 */
interface OptionSelectInputProps extends InputProps {
  options: FilterOptions,
}
function OptionSelectInput({ options, draftFilter, setDraftFilter }: OptionSelectInputProps) {
  const handleOptionSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setDraftFilter(prevFilter => ({
      ...prevFilter,
      option: event.target.value,
    }));
  };
  return (
    <select
      title="Select Filter Option"
      value={draftFilter.option ?? undefined}
      onChange={handleOptionSelect}
    >
      {options.map((option, index) => (
        <option key={`${index}_${option}`} value={option}>{option}</option>
      ))}
    </select>
  );
}

function OptionTextInput({ draftFilter, setDraftFilter }: InputProps) {
  const handleOptionInput = (event: ChangeEvent<HTMLInputElement>) => {
    setDraftFilter(prevFilter => ({
      ...prevFilter,
      option: event.target.value,
    }));
  };

  return (
    <input
      title="Input Filter Option"
      type="text"
      value={draftFilter.option ?? ""}
      onChange={handleOptionInput}
    />
  );
}
