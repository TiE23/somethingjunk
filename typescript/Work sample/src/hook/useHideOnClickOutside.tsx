import { useEffect, useRef, useState } from "react";

const useHideOnClickOutside = <T extends HTMLElement>(shouldDisplayInitial: boolean): [
  boolean,
  (visible: boolean) => void,
  React.RefObject<T>,
] => {
  const [shouldDisplay, setShouldDisplay] = useState(shouldDisplayInitial);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setShouldDisplay(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return [shouldDisplay, setShouldDisplay, ref];
};

export default useHideOnClickOutside;
