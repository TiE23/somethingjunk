import { useEffect, useRef, useState } from 'react'

export default function useHideOnClickOutside(shouldDisplayInitial) {
  const [shouldDisplay, setShouldDisplay] = useState(shouldDisplayInitial)
  const ref = useRef(null)

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setShouldDisplay(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  })

  return [shouldDisplay, setShouldDisplay, ref]
}
