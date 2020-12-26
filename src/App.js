import { Component } from 'react';
import './styles/App.scss';
import { Route, Switch } from "react-router-dom";
import QuestionnaireComponent from './components/QuestionnaireComponent'
import ResultComponent from './components/ResultComponent'
class App extends Component {
  render() {
    return (
      <div className='App'>
        <Switch>
          <Route path="/" exact component={QuestionnaireComponent} />
          <Route path="/test" exact component={QuestionnaireComponent} />
          <Route path="/result" component={ResultComponent} />
        </Switch>
      </div>
    );
  }
}

export default App;
