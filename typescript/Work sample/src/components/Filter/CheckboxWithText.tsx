import { ChangeEventHandler, memo } from "react";

// style
import styles from "./CheckboxWithText.module.css";

type CheckboxWithTextProps = {
  isChecked: boolean,
  onChange: ChangeEventHandler<HTMLInputElement>,
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
        onChange={props.onChange}
        type='checkbox'
      />
      <span className={styles.Checkmark} />
    </label>
  );
});
