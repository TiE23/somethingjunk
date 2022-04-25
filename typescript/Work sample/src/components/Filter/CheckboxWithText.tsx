import { ChangeEvent, memo } from "react";

// style
import styles from "./CheckboxWithText.module.css";

type CheckboxWithTextProps = {
  isChecked: boolean,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void,
  text: string,
};

export const CheckboxWithText = memo(function CheckboxWithText(props: CheckboxWithTextProps): JSX.Element {
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
        onChange={e => props.onChange(e)}
        type='checkbox'
      />
      <span className={styles.Checkmark} />
    </label>
  );
});
