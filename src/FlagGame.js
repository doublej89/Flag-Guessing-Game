import React, {Component} from 'react';
import FlagQuestion, {QuestionStates} from './FlagQuestion.js';
import shuffle from 'shuffle-array';

class FlagGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: [],
            options: [],
            correctOption: undefined,
            questionState: undefined
        };

        this.nextQuestion = this.nextQuestion.bind(this);
        this.onGuess = this.onGuess.bind(this);
    }

    componentDidMount() {
        fetch("https://restcountries.eu/rest/v2/all")
            .then(response => response.json())
            .then(countries => {
                const correctOption = Math.floor(Math.random() * countries.length);
                const options = this._getOptions(countries, correctOption);
                this.setState({countries, options, correctOption, questionState: QuestionStates.QUESTION});
            })
            .catch(console.warn);
    }

    _getOptions(countries, correctOption) {
        let options = [correctOption];
        let tries = 0;
        while (options.length < 4 && tries < 15) {
            let option = Math.floor(Math.random() * countries.length);
            if (options.indexOf(option) === -1) {
                options.push(option);
            } else {
                tries++;
            }
        }
        return shuffle(options);
    }

    onGuess(answer) {
        const {correctOption} = this.state;
        let questionState = answer === correctOption ? 
                                        QuestionStates.ANSWER_CORRECT : QuestionStates.ANSWER_WRONG;
        this.setState({questionState});
    }

    nextQuestion() {
        let {countries} = this.state;
        const correctOption = Math.floor(Math.random() * countries.length);
        let options = this._getOptions(countries, correctOption);
        this.setState({options, correctOption, questionState: QuestionStates.QUESTION});
    }

    render() {
        let {countries, options, correctOption, questionState} = this.state;
        let output = <div>...Loading</div>
        if (correctOption !== undefined) {
            const {flag, name} = countries[correctOption];
            let opts = options.map(opt => {
                return {id: opt, name: countries[opt].name};
            });
            output = (
                <FlagQuestion
                    answerText={name}
                    onGuess={this.onGuess}
                    onNext={this.nextQuestion}
                    options={opts}
                    questionState={questionState}
                    flag={flag}/>
            );
        }

        return (
            <div style={{marginTop: '15px'}}>
                {output}
            </div>
        );    
    }
}

export default FlagGame;