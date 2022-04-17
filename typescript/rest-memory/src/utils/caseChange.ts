import { ModeEnum as CaseChangeMode } from "../schema/caseChange.schema";

export function caseChange(input: string, mode: CaseChangeMode) {
  switch (mode) {
  case CaseChangeMode.Lower:
    return input.toLowerCase();
  case CaseChangeMode.Upper:
    return input.toUpperCase();
  }
}
