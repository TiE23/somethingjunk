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
const ActiveFilterButton = styled.button`
  background: none;
  border: none;
  padding: 0;

  cursor: pointer;

  font-size: 16px;  /* The design doc said "16pt" but the size didn't match. */
  color: ${p => p.theme.colors.fonts.regular};
`;

export const ActiveFilterTitleButton = styled(ActiveFilterButton)`
  ${p => p.theme.fonts.regular};
  margin-left: 12px;
`;

export const ActiveFilterTitleBoldSpan = styled.span`
  ${p => p.theme.fonts.bold};
`;

export const ActiveFilterDeleteButton = styled(ActiveFilterButton)`
  ${p => p.theme.fonts.regular};
  color: ${p => p.theme.colors.fonts.dim};
  margin: 0 10px;
`;
