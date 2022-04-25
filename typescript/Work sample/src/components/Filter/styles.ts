import styled from "styled-components/macro";

export const ActiveFilterBubble = styled.div`
  background-color: ${p => p.theme.colors.filter.bg};
  height: 32px;
  width: auto;

  border-radius: 10px;
  display: flex;
  align-items: center;
`;

/**
 * This is a parent styling that can provide default stylings for other child
 * styled components. Note that I don't export it.
 */
const FilterButton = styled.button`
  background: none;
  border: none;
  padding: 0;

  cursor: pointer;

  font-size: ${p => p.theme.design.searchbar.fontSize};
  color: ${p => p.theme.colors.fonts.regular};
`;

export const ActiveFilterTitleButton = styled(FilterButton)`
  ${p => p.theme.fonts.regular};
  margin-left: 12px;
`;

export const ActiveFilterTitleBoldSpan = styled.span`
  ${p => p.theme.fonts.bold};
`;

export const ActiveFilterDeleteButton = styled(FilterButton)`
  ${p => p.theme.fonts.regular};
  color: ${p => p.theme.colors.fonts.dim};
  margin: 0 10px;
`;

export const AddFilterTextButton = styled(FilterButton)`
  color: ${p => p.theme.colors.fonts.faded};
  margin-left: 3px;
`;

/**
 * Simple component just to make the on-edit inputs line up in a row.
 */
export const InputRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
`;

export const CheckboxContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: nowrap;
`;

export const CheckboxBox = styled.div`
  position: absolute;
  top: 32px;
  border-radius: 6px;
  padding: 10px 5px;
  background-color: ${p => p.theme.colors.filter.checkboxBG};
`;

export const CheckboxLayout = styled.div`
  display: flex;
  flex-direction: column;
`;
