import React, {FC} from "react";
import styles from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {MainButton} from "../../components/MainButton";
import {PageLayout} from "../../Layouts/PageLayout";
import {QuizContainer} from "../../Layouts/QuizContaier";

export const StartPage: FC = () => {

  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/form");
  };


  return <PageLayout>
    <QuizContainer>
      <div className={styles.container}>
        <div className={styles.emoji}>📋</div>
        <h3 className={styles.title}>Сейчас вы пройдете опрос</h3>
      </div>
      <div className={styles.footer}>
        <MainButton title="Начать" onClick={clickHandler} />
      </div>
    </QuizContainer>
  </PageLayout>;

};
