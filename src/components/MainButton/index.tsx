import { FC } from "react";
import styles from "./index.module.css";
import classNames from "classnames";

interface MainButtonProps{
  title:string,
  onClick: () => void,
  isDisabled?:boolean
  className?:string
}

export const MainButton: FC<MainButtonProps> = ({title, isDisabled, className, onClick}) => {
  return (
    <button onClick={onClick} disabled={isDisabled} className={classNames(className ,styles.button)}>
      {title}
    </button>
  );
};
