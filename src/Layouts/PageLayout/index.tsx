import React, {FC} from "react";
import styles from "./index.module.css";

interface PageLayoutProps {
  children: React.ReactElement | React.ReactNode;
}

export const PageLayout: FC<PageLayoutProps> = ({children}) => {

  return (
    <div className={styles.wrapper}>
      {children}
    </div>
  );
};
