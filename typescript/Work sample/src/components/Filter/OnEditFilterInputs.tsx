import { ChangeEvent, useEffect, useState } from "react";
import {
  Filter as FilterType,
  FilterCategory,
  FilterCategoryType,
  FilterOptions,
  FilterRelation,
} from "types/filters";
import { CheckboxWithText } from "./CheckboxWithText";
import { CheckboxBox, CheckboxContainer, CheckboxLayout } from "./styles";

interface InputProps {
  draftFilter: FilterType;
  setDraftFilter: React.Dispatch<React.SetStateAction<FilterType>>;
}

interface CategorySelectInputProps extends InputProps {
  categoryList: FilterCategory[];
}
export function CategorySelectInput(
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
export function RelationSelectInput({ relationList, draftFilter, setDraftFilter }: RelationSelectInputProps) {
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
interface OptionInputOptionsProps {
  options: FilterOptions;
}

interface OptionInputProps extends InputProps, OptionInputOptionsProps {
  categoryType: FilterCategoryType;
}
/**
 * Given there are three different option input types here's a way to create
 * the appropriate component.
 * There's a half-dozen ways to do this. If felt like using a switch statement
 * was a little better than using a chain of ternary statements in the return
 * statement below.
 * @param OptionInputProps
 * @returns
 */
export function OptionInput(
  { categoryType, options, draftFilter, setDraftFilter }: OptionInputProps,
) {
  switch (categoryType) {
  case FilterCategoryType.SELECT:
    return <OptionSelectInput
      options={options}
      draftFilter={draftFilter}
      setDraftFilter={setDraftFilter}
    />;
  case FilterCategoryType.TEXT:
    return <OptionTextInput
      draftFilter={draftFilter}
      setDraftFilter={setDraftFilter}
    />;
  case FilterCategoryType.CHECKBOX:
    return <OptionCheckboxInput
      options={options}
      draftFilter={draftFilter}
      setDraftFilter={setDraftFilter}
    />;
  default:
    return null;
  }

}


interface OptionSelectInputProps extends InputProps, OptionInputOptionsProps { }
function OptionSelectInput({ options, draftFilter, setDraftFilter }: OptionSelectInputProps) {
  // Design shows that the first option should be auto-filled.
  useEffect(() => {
    setDraftFilter(prevFilter => ({
      ...prevFilter,
      option: options[0] ?? null,
    }));
  }, [options]);

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

interface OptionCheckboxInputProps extends InputProps, OptionInputOptionsProps { }
function OptionCheckboxInput({ options, draftFilter, setDraftFilter }: OptionCheckboxInputProps) {
  const [open, setOpen] = useState(false);
  const openArrow = open ? "▼" : "▲";

  /**
   * To avoid issues with populating two states with references to the same array
   * I provide a function to build a new "initial state".
   * @returns
   */
  const buildInitialState = () => options.map(option => ({
    option,
    checked: draftFilter?.option?.split(", ").includes(option) ?? false,
  }));

  /**
   * This is "a bit extra" but it's my quick solution to emulate the design
   * document where the list of checked options requires two steps. First one
   * must click and update button - which will update the UI.
   */
  const [uiOptions, setUiOptions] = useState(buildInitialState());
  const [draftOptions, setDraftOptions] = useState(buildInitialState());

  // Reset the UI state when closing the checkbox box.
  useEffect(() => {
    if (!open) {
      setUiOptions(buildInitialState());
    }
  }, [open]);


  const handleUiOptionsInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUiOptions(prevChecked => {
      const newChecked = [...prevChecked];
      const changeIndex = prevChecked.findIndex(check => check.option === event.target.name);
      if (changeIndex !== -1) {
        newChecked[changeIndex].checked = event.target.checked;
      }
      return newChecked;
    });
  };

  const handleUpdate = () => {
    setDraftOptions(uiOptions);
    setOpen(false);
  };

  const checkedDraftOptions = draftOptions.filter(check => check.checked);

  return (
    <CheckboxContainer>
      <button
        onClick={() => setOpen(!open)}
      >
        {checkedDraftOptions.length !== 0 ? checkedDraftOptions.map(check => check.option).join(", ") : "(None)"}
        {" "}
        {openArrow}
      </button>

      {open && (
        <CheckboxBox>
          <CheckboxLayout>
            {options.map((option, optionIndex) => (
              <CheckboxWithText
                key={`${optionIndex}_${option}`}
                isChecked={uiOptions[optionIndex].checked}
                text={option}
                onChange={handleUiOptionsInput}
              />
            ))}
            <button onClick={handleUpdate}>
              Update
            </button>
          </CheckboxLayout>
        </CheckboxBox>
      )}
    </CheckboxContainer>
  );
}
