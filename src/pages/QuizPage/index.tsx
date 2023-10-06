import React, {FC} from "react";
import styles from "./index.module.css";
import {Quiz} from "../../components/Quiz";
import axios from "axios";
import {MainButton} from "../../components/MainButton";
import config from "../../config";
import quizStore from "../../store/quizStore";
import {observer} from "mobx-react-lite";
import {PageLayout} from "../../Layouts/PageLayout";
import {QuizContainer} from "../../Layouts/QuizContaier";

export const QuizPage: FC = observer(() => {

  const {step, userDisplayedName, userPhone, questions, incrementStep, resetQuiz} = quizStore;
  const percentage = Math.round(step / questions.length * 100);

  const clickHandler = async () => {
    incrementStep();

    if(step + 1 >= questions.length) {
      await submitData();
    }
  };

  const resetHandler = () => {
    resetQuiz();
  };

  const buttonDisableHandler = () => {

    const answerIsSelected = !questions[step].answer;
    const answer = questions[step].answer;


    if(answer !== "Perfect" && !answerIsSelected) {
      return false;
    } else if(answer === "Perfect") {
      return false;
    }

    return true;
  };

  const submitData = async() => {

    await axios.post(`${config.API_URL}/save-result`, {
      displayedName: userDisplayedName,
      phone: userPhone,
      questions
    })
      .catch(() => {
        alert("Произошла ошибка! Пройдите опрос еще раз");
      });
  };

  return <PageLayout>
    <QuizContainer className={styles.quizContainer}>
      <div className={styles.progressbar}>
        <div style={{width: `${percentage}%`}} className={styles.progress}></div>
      </div>

      {step !== questions.length ?
        <>
          <Quiz question={questions[step].question} />
          <div className={styles.footer}>
            <MainButton title="Ответить" onClick={clickHandler} isDisabled={buttonDisableHandler()} />
          </div>
        </>

        : <>
          <div className={styles.container}>
            <div className={styles.emoji}>🎉</div>
            <h3 className={styles.title}>Спасибо за прохождение опроса</h3>
          </div>

          <div className={styles.footer}>
            <MainButton title="Пройти еще раз" onClick={resetHandler} />
          </div>
        </>
      }
    </QuizContainer>
  </PageLayout>;
});
