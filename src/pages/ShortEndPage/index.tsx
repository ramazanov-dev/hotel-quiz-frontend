import React, {FC, useEffect, useState} from "react";
import styles from "./index.module.css";
import {MainButton} from "../../components/MainButton";
import {CommentTextArea} from "../../components/CommentTextArea";
import {PageLayout} from "../../Layouts/PageLayout";
import {QuizContainer} from "../../Layouts/QuizContaier";
import axios from "axios";
import quizStore from "../../store/quizStore";
import config from "../../config";

export const ShortEndPage: FC = () => {

  const [comment, setComment] = useState("")
  const {userPhone, userDisplayedName} = quizStore
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);


  const clickHandler =  async() => {
    setButtonIsDisabled(true)
    await submitData()
    setButtonIsDisabled(false)

  };

  const submitData = async() => {

    await axios.post(`${config.API_URL}/save-short-result`, {
      displayedName: userDisplayedName,
      phone: userPhone,
      comment
    })
      .catch(() => {
        alert("Произошла ошибка! Пройдите опрос еще раз");
      });
  };


  return <PageLayout>
    <QuizContainer>
      <h3 className={styles.title}>Оставьте ваш комментарий</h3>
      <div className={styles.container}>
        <div className={styles.emoji}>
          <img src="https://www.imgonline.com.ua/examples/qr-code.png" alt="qr" />
        </div>
        <div className={styles.emoji}>
          <img src="https://www.imgonline.com.ua/examples/qr-code.png" alt="qr" />
        </div>
      </div>

      <CommentTextArea placeholder="Ваш отзыв:" maxLength={1000} value={comment} getValue={(value) => {
        value ? setButtonIsDisabled(false) : setButtonIsDisabled(true);
        setComment(value)
      }}/>

      <div className={styles.footer}>
        <MainButton isDisabled={buttonIsDisabled} title="Отправить" onClick={clickHandler} />
      </div>
    </QuizContainer>
  </PageLayout>;

};
