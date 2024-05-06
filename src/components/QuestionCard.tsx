import React from "react";
// Styles
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";

// Types
import { AnswerObject } from "../App";

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNumber, totalQuestions }) => {
  console.log("userAnswer = ", userAnswer);
  console.log("!userAnswer = ", !userAnswer);
  // const newUserAnswer: Boolean = true;
  // if (!userAnswer) {
  //   newUserAnswer = false;
  // }
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers ? (
          answers.map((answer) => {
            return (
              <ButtonWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}>
                <button disabled={userAnswer ? true : false} value={answer} onClick={callback}>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </ButtonWrapper>
            );
          })
        ) : (
          <p>Not found any questions, please choose another options</p>
        )}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
