import React, {FC} from "react";
import styles from "./index.module.css";
import classNames from "classnames";

interface BubbleProps {
  title: string,
  isSelected: boolean
  onClick: () => void
}

export const Bubble: FC<BubbleProps> = ({title, isSelected, onClick}) => {
  return (
    <div onClick={onClick} className={classNames(styles.bubble, {[styles.bubbleActive]: isSelected})}>
      {title}
    </div>
  );
};
