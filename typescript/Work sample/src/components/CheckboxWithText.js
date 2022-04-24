import { memo } from 'react';

// style
import styles from './CheckboxWithText.module.css'

export const CheckboxWithText = memo(function CheckboxWithText(props) {
  /*
    props: {
      isChecked: <boolean>
      onChange: fn(<event>)
      text: <string>
    }
  */

  return (
    <label className={styles.CheckItem}>
      {props.text}
      <input
        checked={props.isChecked}
        name={props.text}
        onChange={props.onChange}
        type='checkbox'
      />
      <span className={styles.Checkmark} />
    </label>
  )
})