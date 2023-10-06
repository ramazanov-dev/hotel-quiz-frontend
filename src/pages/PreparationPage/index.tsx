import React, { FC, useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { MainButton } from "../../components/MainButton";
import { PageLayout } from "../../Layouts/PageLayout";
import { QuizContainer } from "../../Layouts/QuizContaier";
export const PreparationPage: FC = () => {

  const navigate = useNavigate();
  const [step, setStep] = useState(0)

  const controlQuestions = [
    { question: "Вы уже проходили опрос?", isSelected: false },
    { question: "Хотите пройти еще раз?", isSelected: false }
  ]


  const clickHandler = () => {
    if (step < controlQuestions.length - 1) {
      setStep(step + 1)
    }
    else {
      const allIsTrue = controlQuestions.some(question => question.isSelected)

      if (allIsTrue) {
        navigate("/short-end")
      }
      else {
        navigate("/quiz")
      }
    }
  };


  return <PageLayout >
    <QuizContainer>
      <div className={styles.container}>
        <h3 className={styles.title}>{controlQuestions[step].question}</h3>
      </div>
      <div className={styles.footer}>
        <MainButton title="Да" onClick={() => {
          controlQuestions[step].isSelected = true
          clickHandler()
        }} />

        <MainButton title="Нет" onClick={() => {
          controlQuestions[step].isSelected = false
          clickHandler()
        }} />
      </div>
    </QuizContainer>
  </PageLayout>;

};
