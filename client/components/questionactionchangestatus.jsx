import React from 'react';


export default class QuestionActionChangeStatus extends React.Component {
  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    const newStatus = e.target.dataset.status;
    this.props.updateQuestionStatus(this.props.questionId, newStatus);
  }

  render() {
      return (
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
          <div className="btn-group" role="group">
            <button onClick={this.handleClick} data-status={3} type="button" className="btn btn-danger">Decline</button>
          </div>
          <div className="btn-group" role="group">
            <button  onClick={this.handleClick} data-status={4} type="button" className="btn btn-primary">Accept</button>
          </div>
        </div>
      );
    }
}

