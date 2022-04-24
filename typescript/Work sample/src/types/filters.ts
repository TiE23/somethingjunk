export type FilterCategory = string;
export enum FilterRelation {
  IS = "is",
  IS_NOT = "is not",
}
export type FilterOption = string;

export type Filter = {
  category: FilterCategory,
  relation: FilterRelation,
  option: FilterOption,
};
