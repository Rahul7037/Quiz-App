import React from 'react'

function QuizResult(props) {
    return (
        <>
            <div className='show-score'>
                Your Score:{props.score}<br />
                Total Score:{props.totalScore}
            </div>
            <button id="next-button" onClick={props.tryAgain}>Home</button>
        </>
    )
}

export default QuizResult