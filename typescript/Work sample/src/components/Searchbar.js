// component
import Filter from 'components/Filter'

// style
import styles from './Searchbar.module.css'

export default function Searchbar(props) {
  /*
    filters: [
      [
        category: <string>,
        relation: <string>,
        option: <string>
      ],
      ...
    ],
    setFilters: fn(
      [
        [
          category: <string>,
          relation: <string>,
          option: <string>
        ],
        ...
      ]
    )
  */
  return (
    <div className={styles.Searchbar}>
      {props.filters.map(filter => (
        <Filter
          filter={filter}
          key={filter}
        />
      ))}
      <div>Search or add filters</div>
    </div>
  )
}
