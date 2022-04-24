// As one would add new filter categories you'd be defining them here.
export enum FilterCategory {
  AD_NAME = "Ad Name",
  BG_COLOR = "Background Color",
  CAMPAIGN_NAME = "Campaign Name",
  DEVICE_PLATFORM = "Device Platform",
  FEATURE_TYPE = "Feature Type",
  PRODUCT_TYPE = "Product Type",
}
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

export enum FilterCategoryType {
  TEXT = "text",
  SELECT = "select",
  CHECKBOX = "checkbox",
}

export interface FilterLibraryProperties {
  categoryType: FilterCategoryType;
  options: string[];
}

export type FilterValues = Record<FilterCategory, FilterLibraryProperties>;
