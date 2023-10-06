import {FC} from "react";
import styles from "./index.module.css";
import {Route, Routes} from "react-router-dom";
import {QuizPage} from "../../pages/QuizPage";
import {StartPage} from "../../pages/StartPage";
import {FormPage} from "../../pages/FormPage";
import {PreparationPage} from "../../pages/PreparationPage";
import {ShortEndPage} from "../../pages/ShortEndPage";

export const App: FC = () => {
  return (
    <div className={styles.wrapper}>
      <Routes>
        <Route element={<StartPage />} path="/" />
        <Route element={<FormPage />} path="/form" />
        <Route element={<PreparationPage />} path="/preparation" />
        <Route element={<QuizPage />} path="/quiz" />
        <Route element={<ShortEndPage />} path="/short-end" />
      </Routes>
    </div>
  );
};

export default App;
