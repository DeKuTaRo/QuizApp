import React, { useState } from "react";
import { fetchQuizQuestions } from "./API";
// Components
import QuestionCard from "./components/QuestionCard";
// Types
import { QuestionState } from "./API";
// Styles
import { GlobalStyle, Wrapper } from "./App.styles";

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  // Search
  const [totalQuestions, setTotalQuestions] = useState(0);
  const handleChangTotalQuestions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTotalQuestions(Number(event.target.value));
  };

  const [typeQuestions, setTypeQuestions] = useState("");
  const handleChangTypeQuestions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTypeQuestions(event.target.value);
  };

  const [difficultyQuestions, setDifficultyQuestions] = useState("");
  const handleChangDifficultyQuestions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficultyQuestions(event.target.value);
  };

  const [categoryQuestions, setCategoryQuestions] = useState(0);
  const handleChangCategoryQuestions = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryQuestions(Number(event.target.value));
  };

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(
      totalQuestions,
      typeQuestions,
      difficultyQuestions,
      categoryQuestions
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      let answer = e.currentTarget.value;
      const correct: boolean = questions[number].correct_answer === answer;
      if (correct) {
        setScore((prev) => prev + 1);
      }
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const currentQuestionIndex = number + 1;

    if (currentQuestionIndex === totalQuestions - 1) {
      setGameOver(true);
      setTotalQuestions(0);
      setTypeQuestions("");
      setDifficultyQuestions("");
      setCategoryQuestions(0);
    } else {
      setNumber(currentQuestionIndex);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>React Quiz</h1>
        {gameOver || userAnswers.length === totalQuestions ? (
          <>
            <div className="optionsSearch">
              <select value={totalQuestions} onChange={handleChangTotalQuestions} required>
                <option value="">Number questions</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
              <select value={typeQuestions} onChange={handleChangTypeQuestions}>
                <option value="">Type</option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/ False Choice</option>
              </select>
              <select value={difficultyQuestions} onChange={handleChangDifficultyQuestions}>
                <option value="">Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <select value={categoryQuestions} onChange={handleChangCategoryQuestions}>
                <option value="">Category</option>
                <option value={9}>General Knowledge</option>
                <option value={10}>Entertainment : Books</option>
                <option value={11}>Entertainment : Film</option>
                <option value={12}>Entertainment : Music</option>
                <option value={13}>Entertainment : Musicals and Theatres</option>
                <option value={14}>Entertainment : Television</option>
                <option value={15}>Entertainment : Video games</option>
                <option value={16}>Entertainment : Board games</option>
                <option value={17}>Science & Nature</option>
                <option value={18}>Science: Computers</option>
                <option value={19}>Science: Mathematics</option>
                <option value={20}>Mythology</option>
                <option value={21}>Sports</option>
                <option value={22}>Geography</option>
                <option value={23}>History</option>
                <option value={24}>Polistics</option>
                <option value={25}>Art</option>
                <option value={26}>Celebrities</option>
                <option value={27}>Animals</option>
                <option value={28}>Vehicles</option>
                <option value={29}>Entertainment : Comics</option>
                <option value={30}>Science: Gadgets</option>
                <option value={31}>Entertainment : Japanese Anime & Manga</option>
                <option value={32}>Entertainment : Cartoons & Animations</option>
              </select>
            </div>
            <button className="start" onClick={startTrivia}>
              {gameOver ? "Start again" : "Start"}
            </button>
            <p className="score">Score: {score}</p>
          </>
        ) : null}
        {loading && <p>Loading Questions ...</p>}
        {!loading && !gameOver && (
          <>
            <p className="score">Score: {score}</p>
            <QuestionCard
              questionNumber={number + 1}
              totalQuestions={totalQuestions}
              question={questions[number].question}
              answers={questions[number].answers}
              userAnswer={userAnswers ? userAnswers[number] : undefined}
              callback={checkAnswer}
            />
          </>
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== totalQuestions - 1 ? (
          <button className="next" onClick={nextQuestion}>
            Next Question
          </button>
        ) : null}
      </Wrapper>
    </>
  );
};

export default App;
