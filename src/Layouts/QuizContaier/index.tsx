import React, {FC} from "react";
import styles from "./index.module.css";
import classNames from "classnames";

interface QuizContainerProps {
  children: React.ReactElement | React.ReactNode;
  className?:string
}

export const QuizContainer: FC<QuizContainerProps> = ({children, className}) => {

  return (
    <div className={classNames(className, styles.quizContainer)} >
      {children}
    </div>
  );
};
