import React, {FC, useEffect, useState} from "react";
import styles from "./index.module.css";
import {observer} from "mobx-react-lite";
import {Bubble} from "../Bubble";
import {CommentTextArea} from "../CommentTextArea";
import classNames from "classnames";
import QuizStore from "../../store/quizStore";

interface QuizProps {
  question: string;
}

export const Quiz: FC<QuizProps> = observer(({question}) => {
  const [textAreaValue, setTextareaValue] = useState("");
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(-1);

  const {questions, step, setQuestionAnswer, setQuestionAnswerText, updateBubbleSelection, updateBubbleComment} = QuizStore;
  const textareaMaxSymbolCount = 1000;

  const changeHandler = (value: string) => {
    setTextareaValue(value);
    setQuestionAnswerText(value.trim(), step);
  };


  const clickHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setQuestionAnswer(e.currentTarget.title, step);
    setSelectedAnswerIndex(index);
  };

  useEffect(() => {
    setSelectedAnswerIndex(-1);
    setTextareaValue("");
  }, [step]);


  return (<div className={styles.wrapper}>
    <h1 className={styles.title}>{question}</h1>
    <div className={styles.answerContainer}>

      <div className={styles.emojiContainer}>

        <div
          title="Perfect" onClick={(e) => {
          clickHandler(e, 0);
        }}
          className={classNames(styles.answer, {[styles.answerIsActive]: selectedAnswerIndex === 0})}
        >
          <span>🙂</span>
        </div>
        <div
          title="Good" onClick={(e) => {
          clickHandler(e, 1);
        }}
          className={classNames(styles.answer, {[styles.answerIsActive]: selectedAnswerIndex === 1})}
        >
          <span>😐</span>
        </div>
        <div
          title="Bad" onClick={(e) => {
          clickHandler(e, 2);
        }}
          className={classNames(styles.answer, {[styles.answerIsActive]: selectedAnswerIndex === 2})}
        >
          <span>😕</span>
        </div>

      </div>

      {selectedAnswerIndex !== 0 && selectedAnswerIndex !== 0 - 1 ? (<div className={styles.bubbleContainer}>

        <h4>Что вас разочаровало?</h4>

        <div>
          {questions[step].bubbles.map((bubble) => <Bubble
            key={bubble.id}
            title={bubble.title}
            isSelected={bubble.isSelected}
            onClick={() => {
              updateBubbleSelection(bubble.id, step);
            }}
          />)}
        </div>

        <div>
          {questions[step].bubbles.filter(bubble => bubble.isSelected).map((bubble) => (
            <CommentTextArea
              placeholder={bubble.comment.placeholder}
              variant="resized"
              maxRows={8}
              key={bubble.id}
              maxLength={textareaMaxSymbolCount}
              value={bubble.comment.text}
              getValue={(value) => updateBubbleComment(bubble.id, step, value)}
            />
          ) )}
        </div>

      </div>) : null}

      <CommentTextArea
        placeholder="Ваш ответ:"
        maxLength={textareaMaxSymbolCount}
        value={textAreaValue}
        getValue={(value) => changeHandler(value)}
      />
    </div>
  </div>);
});
