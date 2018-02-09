import React from 'react';

const FlagChoices = (props) => {
    let options = props.options || [];
    let inputs = options.map(opt => (
        <label key={opt.id}>
            <input
                type='radio'
                value={opt.id}
                onChange={props.handleChange}
                checked={opt.checked}
                name='flag-choice' />
            {opt.name}
        </label>
    ));
    return (
        <form className='flag-form' onSubmit={props.handleSubmit}>
            {inputs}
            <button
                type='submit'
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
                GUESS
            </button>
        </form>
    );
}

export default FlagChoices;