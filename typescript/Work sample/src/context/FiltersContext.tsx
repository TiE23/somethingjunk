import React, { createContext, PropsWithChildren, useState } from "react";

import { Filter, FilterCategory, FilterRelation } from "types/filters";


/**
 * I'm taking the time to define the state a little more concretely so as to
 * take advantage of strong typing. Enums, all that stuff. It's what I'd like to
 * write at my actual job, so, I'm doing it for you here.
 */
const defaultFilters: Filter[] = [
  { category: FilterCategory.AD_NAME, relation: FilterRelation.IS, option: "viralspace_ad_1" },
  { category: FilterCategory.BG_COLOR, relation: FilterRelation.IS_NOT, option: "black" },
  { category: FilterCategory.DEVICE_PLATFORM, relation: FilterRelation.IS_NOT, option: "Desktop, Tablet" },
];

interface Context {
  filters: Filter[];
  setFilters?: React.Dispatch<React.SetStateAction<Filter[]>>,
}

const FiltersContext = createContext<Context>({
  filters: defaultFilters,
});

export default FiltersContext;

/**
 * Wrapper component provides children components with access to the FiltersContext.
 * @param param0
 * @returns
 */
export const FiltersProvider = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  // Start with initial "default" filters.
  const [filters, setFilters] = useState(defaultFilters);

  return(
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};
