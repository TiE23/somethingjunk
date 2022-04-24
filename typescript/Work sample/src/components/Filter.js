import { Fragment } from 'react'

// const
import filterValues from 'const/filterValues'

// custom hook
import useHideOnClickOutside from 'hook/useHideOnClickOutside'

export default function Filter(props) {
  /*
    props: {
      filters: [
        [
          category: <string>,
          relation: <string>,
          option: <string>
        ],
        ...
      ]
    }
  */
  const [isOnEdit, setIsOnEdit, ref] = useHideOnClickOutside(false)

  return (
    <div ref={ref}>
      {isOnEdit ? (
        <div>Editing {props.filter.join(' ')}</div>
      ) : (
        <Fragment>
          <button onClick={() => setIsOnEdit(true)}>{props.filter.join(' ')}</button>
          <button onClick={() => alert('Implement "Delete Filter"')}>✕</button>
        </Fragment>
      )}
    </div>
  )
}
