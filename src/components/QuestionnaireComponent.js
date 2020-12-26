import React, {Component} from 'react'
import {withRouter} from 'react-router-dom';

class QuestionnaireComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      showResult: false,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/questions', { mode: 'cors' })
      .then((response) => response.json())
      .then((res) => this.setState({ questions: res }));
  }

  onSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formEntries = formData.entries()
    const formValues = []
    let userEmail = null

    for (let [questionFieldName, value] of formEntries) {
        if(questionFieldName !== 'email') {
          formValues.push([questionFieldName, value])
        } else {
          userEmail = value
        }
    }

    fetch('http://localhost:3001/submit', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: userEmail, formValues})
    })
    .then((response) => response.json())
    .then((result) => {
      this.props.history.push({
        pathname: '/result',
        state: {
          'hello': 'world',
          result
        }
      });
    });
  }

  render () {
    const { questions } = this.state;
    const areQuestionsLoading = questions.length === 0

    return (
      <div>
        <div id='intro-wrapper'>
          <div id='intro-header'>
            Discover your perspective
          </div>
          <div id='intro-body'>
            Complete the 7 min test and get a detailed report of your lenses on the world.
          </div>
        </div>

        <form onSubmit={this.onSubmit}>
        <div id='form-body-wrapper'>
          {areQuestionsLoading &&
            <div>
              Loading questions ...
            </div>
          }
          {!areQuestionsLoading && questions.map(({ question }, questionIndex) => {
            return (
              <div key={questionIndex} className='question-wrapper'>
                <div className='question'>{question}</div>
                <div className='answers-wrapper'>
                  <span className='disagree-text'>Disagree</span>
                  <input type='radio' name={questionIndex + 1} value={1} required/>
                  <input type='radio' name={questionIndex + 1} value={2} required/>
                  <input type='radio' name={questionIndex + 1} value={3} required/>
                  <input type='radio' name={questionIndex + 1} value={4} required/>
                  <input type='radio' name={questionIndex + 1} value={5} required/>
                  <input type='radio' name={questionIndex + 1} value={6} required/>
                  <input type='radio' name={questionIndex + 1} value={7} required/>
                  <span className='agree-text'>Agree</span>
                </div>
              </div>
            );
          })}
          {!areQuestionsLoading &&
            <div className='question-wrapper'>
              <div className='question'>Your Email</div>
              <div className='answers-wrapper'>
                <input type="email" name="email" required placeholder='you@example.com'/>
              </div>
            </div>
          }
        </div>

        {!areQuestionsLoading &&
          <div id='submit-wrapper'>
            <button type="submit">Save & Continue</button>
          </div>
        }
        </form>
      </div>
    )
  }
}

export default withRouter(QuestionnaireComponent)
