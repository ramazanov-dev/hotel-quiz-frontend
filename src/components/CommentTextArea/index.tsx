import styles from "./index.module.css";
import {FC} from "react";
import TextareaAutosize from "react-textarea-autosize";

interface CommentTextAreaProps {
  placeholder: string;
  maxLength?: number;
  getValue?: (value: string) => void;
  defaultValue?: string;
  value?: string;
  variant?: "default" | "resized";
  maxRows?: number;
}

export const CommentTextArea: FC<CommentTextAreaProps> = ({
  placeholder, getValue, maxRows, maxLength, defaultValue, value, variant
}) => {

  const getTextAreaValue = (value: string): void | string => {
    if(!getValue) return "";
    getValue(value);
  };

  const changeHandler = (e: any) => {
    getTextAreaValue(e.currentTarget.value);
  };


  return (
    <label className={styles.textareaContainer}>
      {variant === "resized" ? (
        <TextareaAutosize
          onChange={changeHandler}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={styles.textareaAutoSize}
          maxLength={maxLength}
          maxRows={maxRows}
        />
      ) : (
        <textarea
          onChange={changeHandler}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={styles.textarea}
          maxLength={maxLength}
          rows={maxRows}
        />

      )}
      {maxLength && value && <div className={styles.symbolCounter}>{value?.length}/{maxLength}</div>}
    </label>);
};
