import React from 'react';
import { withRouter } from 'react-router-dom';

function ResultComponent(props) {
  const {
    result: { score },
  } = props.location.state;

  const scoreSummary = Object.keys(score)
    .map((scoreGroup) => {
      return score[scoreGroup] <= 4 ? scoreGroup[0] : scoreGroup[1];
    })
    .join('');

  return (
    <>
      <div id='result-container'>
        <div id='heading'>
          <div>Your perspective</div>
          <div id='score-summary'>
            Your perspective type is : {scoreSummary}
          </div>
        </div>

        <div id='visualizing-container'>
          <div className='behaviour-type'>
            <div>Extraversion(E)</div>
            <div className='tilt'>
              <div className={'tilt-fill ' + (score.EI > 4 && ' right')}></div>
            </div>
            <div>Introversion(I)</div>
          </div>

          <div className='behaviour-type'>
            <div>Sensing(S)</div>
            <div className='tilt'>
              <div className={'tilt-fill ' + (score.SN > 4 && ' right')}></div>
            </div>
            <div>Intuition(N)</div>
          </div>

          <div className='behaviour-type'>
            <div>Thinking(T)</div>
            <div className='tilt'>
              <div className={'tilt-fill ' + (score.TF > 4 && ' right')}></div>
            </div>
            <div>Feeling(F)</div>
          </div>

          <div className='behaviour-type'>
            <div>Judging(J)</div>
            <div className='tilt'>
              <div className={'tilt-fill ' + (score.JP > 4 && ' right')}></div>
            </div>
            <div>Perceving(P)</div>
          </div>
        </div>
      </div>

      <div className='redirect-container'>
        <button
          className='redirect-test'
          onClick={() => {
            props.history.push('/test');
          }}
        >
          Go back to test
        </button>
      </div>
    </>
  );
}

export default withRouter(ResultComponent);
