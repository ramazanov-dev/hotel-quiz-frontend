import {makeAutoObservable} from "mobx";
import {nanoid} from "nanoid";

interface BubbleModel {
  title: string,
  isSelected: boolean
  id: string
  comment: CommentModel
}

interface QuestionModel {
  question: string;
  answer: string;
  text: string;
  bubbles: Array<BubbleModel>;
}

interface CommentModel {
  placeholder: string,
  text: string
}


class QuizStore {
  constructor() {
    makeAutoObservable(this);
  }

  //State variables

  // array of questions
  questions: Array<QuestionModel> = [
    {
      question: "Оцените вежливость персонала отеля",
      answer: "",
      text: "",
      bubbles: [
        {
          id: nanoid(),
          title: "Уборка номеров",
          isSelected: false,
          comment: {
            placeholder: "Какие недостатки в есть уборке номеров?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Запах сигарет в номере",
          isSelected: false,
          comment: {
            placeholder: "Какие посторонние запахи присутствовали в номере?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Обслуживание",
          isSelected: false,
          comment: {
            placeholder: "Что не понравилось в обслуживании?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Плохой напор воды",
          isSelected: false,
          comment: {
            placeholder: "Насколько был слаб напор воды?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Оплата",
          isSelected: false,
          comment: {
            placeholder: "Слишком дорого?",
            text: ""
          }
        },
      ]
    },
    {
      question: "Оцените качество обслуживания отеля",
      answer: "",
      text: "",
      bubbles: [
        {
          id: nanoid(),
          title: "Уборка номеров",
          isSelected: false,
          comment: {
            placeholder: "Какие недостатки в есть уборке номеров?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Запах сигарет в номере",
          isSelected: false,
          comment: {
            placeholder: "Какие посторонние запахи присутствовали в номере?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Обслуживание",
          isSelected: false,
          comment: {
            placeholder: "Что не понравилось в обслуживании?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Плохой напор воды",
          isSelected: false,
          comment: {
            placeholder: "Насколько был слаб напор воды?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Оплата",
          isSelected: false,
          comment: {
            placeholder: "Слишком дорого?",
            text: ""
          }
        },
      ]
    },
    {
      question: "Оцените уровень комфорта спального места",
      answer: "",
      text: "",
      bubbles: [
        {
          id: nanoid(),
          title: "Уборка номеров",
          isSelected: false,
          comment: {
            placeholder: "Какие недостатки в есть уборке номеров?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Запах сигарет в номере",
          isSelected: false,
          comment: {
            placeholder: "Какие посторонние запахи присутствовали в номере?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Обслуживание",
          isSelected: false,
          comment: {
            placeholder: "Что не понравилось в обслуживании?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Плохой напор воды",
          isSelected: false,
          comment: {
            placeholder: "Насколько был слаб напор воды?",
            text: ""
          }
        },
        {
          id: nanoid(),
          title: "Оплата",
          isSelected: false,
          comment: {
            placeholder: "Слишком дорого?",
            text: ""
          }
        },
      ]
    },
  ];

  // empty version array of questions
  cleanedQuestions = JSON.parse(JSON.stringify(this.questions))

  // quiz current step
  step = 0;

  // user displayed name
  userDisplayedName = ""

  // user phone number
  userPhone = ""

  // State reducers


  // function for setting the answer to a question in questions array
  setQuestionAnswer = (answer: string, step: number) => {
    this.questions[step].answer = answer;
  };

  // function for setting the user phone
  setUserPhone = (phone:string) =>{
    this.userPhone = phone
  }

  // function for setting the user phone
  setUserDisplayedName = (name:string) =>{
    this.userDisplayedName = name
  }

  // function for setting the answer additional text to a question in questions array
  setQuestionAnswerText = (text: string, step: number) => {
    this.questions[step].text = text;
  };

  // function for setting the next step in the quiz
  incrementStep = () => {
    this.step = this.step + 1;
  };

  // function for update bubble selection state
  updateBubbleSelection = (bubbleId: string, step: number) => {
    const question = this.questions[step];
    const bubble = question.bubbles.find((bubble) => bubble.id === bubbleId);

    if(bubble) {
      bubble.isSelected = !bubble.isSelected;
    }
  };

  // function for update selected bubble local comment
  updateBubbleComment = (bubbleId: string, step: number, value:string) => {
    const question = this.questions[step];
    const bubble = question.bubbles.find((bubble) => bubble.id === bubbleId);

    if(bubble) {
      bubble.comment.text = value
    }
  };

  // function for reset all state variables and fields in array of questions
  resetQuiz = () => {
    this.questions = JSON.parse(JSON.stringify(this.cleanedQuestions))
    this.step = 0;
  };
}

export default new QuizStore();
