import React from 'react';

const FlagAnswer = ({correct, countryName, onNext}) => (
    <div className='flag-answer'>
        {correct ? `Correct!: ${countryName}` : `Incorrect! Right answer: ${countryName}`}
        <button
            type='button'
            onClick={onNext}
            style={{
                backgroundColor: "#6b93d6",
                borderRadius: "4px",
                border: "none",
                color: "white",
                padding: "4px 10px",
                textAlign: "center",
                textDecoration: "none",
                fontSize: "1em",
            }}
        >
            NEXT
        </button>
    </div>
);

export default FlagAnswer;