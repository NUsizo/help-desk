import React from 'react';
import QuestionActionResponse from './questionactionresponse.jsx';
import QuestionActionChangeStatus from './questionactionchangestatus.jsx';


export default class QuestionAction extends React.Component {
  constructor(props) {
      super(props);
  }

  handleClick(e) {
    e.preventDefault();
  }

  render() {
    const status = parseInt(this.props.status);
    let actionComponent = null;
    console.log('status', status);
    if (status === 1 || status === 3) {
        console.log('1 or 3');
        actionComponent = <QuestionActionResponse mainState={this.props.mainState} handleResponsePost={this.props.handleResponsePost} questionId={this.props.questionId}  />;
    }
    if (status === 2) {
        console.log('2');
        actionComponent = <QuestionActionChangeStatus updateQuestionStatus={this.props.updateQuestionStatus} questionId={this.props.questionId} />;
    }
    return (
      <div>
        { actionComponent }
      </div>
    );
  }
}
