import styles from "./index.module.css";
import {FC} from "react";
import classNames from "classnames";

interface PrimaryInputProps {
  placeholder: string;
  max?: number;
  getValue?: (value: string) => void;
  defaultValue?: string;
  value?: string | number;
  type?: string;
  errorMessage?:string
}

export const PrimaryInput: FC<PrimaryInputProps> = ({
  placeholder,
  getValue,
  max,
  defaultValue,
  value,
  type,
  errorMessage
}) => {

  const getInputValue = (value: string): void | string => {
    if(!getValue) return "";
    getValue(value);
  };

  const changeHandler = (e: any) => {
    getInputValue(e.currentTarget.value);
  };

  return (
    <label className={classNames(styles.inputContainer, {[styles.error] : errorMessage})}>
      <input
        className={styles.input}
        placeholder={placeholder}
        type={type || "text"}
        onChange={changeHandler}
        value={value}
        defaultValue={defaultValue}
        maxLength={max}
      />
      <span className={styles.placeholder}>{placeholder}</span>
      {errorMessage && <span className={styles.errorMessage}>{errorMessage}</span>}
    </label>);
};
