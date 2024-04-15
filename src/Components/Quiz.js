import React, { useState, useEffect } from 'react';
import { QuizData } from '../Data/QuizData';
import QuizResult from './QuizResult';

function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [clickedOption, setClickedOption] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);

    const changeQuestion = () => {
        updateScore();
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setClickedOption(0);
        } else {
            setShowResult(true);
        }
    }

    const updateScore = () => {
        if (clickedOption === quizQuestions[currentQuestion].answer) {
            setScore(score + 1);
        }
    }

    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setClickedOption(0);
        setScore(0);
        setSelectedCategory(null);
        setQuizQuestions([]);
    }

    const startQuiz = (category) => {
        resetAll();
        setSelectedCategory(category);
        setQuizQuestions(QuizData.filter(item => item.category === category));
    }

    return (
        <div>
            <p className="heading-txt">Quiz APP</p>
            <div className="container">

                {showResult ? (
                    <QuizResult score={score} totalScore={quizQuestions.length} tryAgain={resetAll} />
                ) : (
                    selectedCategory && quizQuestions.length > 0 ? (
                        <>
                        <h3>Total Qusestions:- </h3>
                            <div className="question">

                                <span id="question-number">{currentQuestion + 1}. </span>
                                <span id="question-txt">{quizQuestions[currentQuestion].question}</span>
                            </div>
                            <div className="option-container">
                                {quizQuestions[currentQuestion].options.map((option, i) => {
                                    return (
                                        <button
                                            className={`option-btn ${clickedOption === i + 1 ? "checked" : null}`}
                                            key={i}
                                            onClick={() => setClickedOption(i + 1)}
                                        >
                                            {option}
                                        </button>
                                    )
                                })}
                            </div>
                            <input type="button" value="Next" id="next-button" onClick={changeQuestion} />
                        </>
                    ) : (
                        <div className="category-buttons">
                            <h1>Choose A Category:</h1>
                            <div className="button-row">
                                <button onClick={() => startQuiz('Math')}>Math</button>
                                <button onClick={() => startQuiz('Computer')}>Computer</button>
                            </div>
                            <div className="button-row">
                                <button onClick={() => startQuiz('GK')}>GK</button>
                                <button onClick={() => startQuiz('SSt')}>SST</button>
                            </div>
                        </div>

                    )
                )}
            </div>
        </div>
    )
}

export default Quiz;
