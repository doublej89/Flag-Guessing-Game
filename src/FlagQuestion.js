import React, {Component} from 'react';

const QuestionStates = {
    QUESTION: 1,
    ANSWER_WRONG: 2,
    ANSWER_CORRECT: 3
  };

class FlagQuestion extends Component {
  static defaultProps = {
    options: []
  }

  constructor(props) {
    super(props);
    this.state = {userChoice: undefined};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({userChoice: Number(e.target.value)});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onGuess(this.state.userChoice);
  }

  render() {
    const {answerText, onNext, options, questionState, flag} = this.props;
    const {userChoice} = this.state;
    let opts = options.map(opt => {
      return {...opt, checked: userChoice === opt.id};
    });
    let output = questionState === QuestionStates.QUESTION ?
      (<FlagChoices handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    options={opts}/>) :
      (<FlagAnswer correct={questionState === QuestionStates.ANSWER_CORRECT}
                   countryName={answerText}
                   onNext={onNext} />);
    return (
      <div>
        {output}
        <img src={flag} className="flag-img" alt="Guess the flag"/>
      </div>
    );
  }
}

export default FlagQuestion;
export {QuestionStates};