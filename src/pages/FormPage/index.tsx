import React, {FC, useState} from "react";
import styles from "./index.module.css";
import {useNavigate} from "react-router-dom";
import {MainButton} from "../../components/MainButton";
import {PrimaryInput} from "../../components/PrimaryInput";
import {PageLayout} from "../../Layouts/PageLayout";
import {QuizContainer} from "../../Layouts/QuizContaier";
import quizStore from "../../store/quizStore";
import {observer} from "mobx-react-lite";


export const FormPage: FC = observer(() => {

  const {userPhone, userDisplayedName, setUserDisplayedName, setUserPhone} = quizStore;
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [phoneInputErrorMessage, setPhoneInputErrorMessage] = useState("");
  const [nameInputErrorMessage, setNameInputErrorMessage] = useState("");
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate("/preparation");
  };

  const nameValidator = (name: string) => {
    const formattedValue = name ? name.replace(name[0], name[0].toUpperCase()).trim() : "";

    if(formattedValue && formattedValue.length < 2) {
      setNameInputErrorMessage("Минимум 2 символа");
      setButtonIsDisabled(true);
    } else {
      setNameInputErrorMessage("");
      setButtonIsDisabled(false);
    }

    setUserDisplayedName(formattedValue);
  };

  const phoneValidator = (phone: string) => {
    const formattedValue = phone.replace(/\D/g, "");
    const match = formattedValue.match(/^(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})$/);

    if(!match || !formattedValue) {
      setUserPhone(formattedValue);
    } else {
      const parts = ["+7", match[2], match[3], match[4]];
      const cleaned = parts.filter((part) => part).join(" ").trim();

      if(cleaned && cleaned.length < 15) {
        setPhoneInputErrorMessage("Телефон введен не верно");
        setButtonIsDisabled(true);
      } else {
        setPhoneInputErrorMessage("");
        setButtonIsDisabled(false);
      }

      setUserPhone(cleaned);
    }
  };

  return <PageLayout>
    <QuizContainer>

      <div className={styles.container}>
        <h3 className={styles.title}>Введите ваши данные</h3>
        <PrimaryInput
          placeholder="Имя"
          errorMessage={nameInputErrorMessage}
          getValue={(value) => nameValidator(value)}
          value={userDisplayedName}
          max={30}
        />
        <PrimaryInput
          errorMessage={phoneInputErrorMessage}
          placeholder="Телефон"
          type="phone"
          getValue={(value) => phoneValidator(value)}
          value={userPhone}
          max={15}
        />
      </div>

      <div className={styles.footer}>
        <MainButton title="Продолжить" onClick={clickHandler} isDisabled={buttonIsDisabled} />
      </div>

    </QuizContainer>
  </PageLayout>;
});
