import {
  ActiveFilterBubble,
  ActiveFilterTitleBoldSpan,
  ActiveFilterTitleButton,
  ActiveFilterDeleteButton,
} from "./styles";

import { Filter as FilterType } from "../../types/filters";

type ActiveFilterProps = {
  filter: FilterType,
  onClick: () => void,
  onDelete: () => void,
};

export function ActiveFilter({ filter, onClick, onDelete }: ActiveFilterProps) {
  return (
    <ActiveFilterBubble>
      <ActiveFilterTitleButton onClick={onClick}>
        {filter.category} {filter.relation} {" "}
        <ActiveFilterTitleBoldSpan>
          {filter.option}
        </ActiveFilterTitleBoldSpan>
      </ActiveFilterTitleButton>
      <ActiveFilterDeleteButton onClick={onDelete}>
        ✕
      </ActiveFilterDeleteButton>
    </ActiveFilterBubble>
  );
}
