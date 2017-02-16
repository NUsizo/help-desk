import React from 'react';

export default class QuestionActionResponse extends React.Component {
  constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
      e.preventDefault();
      const questionId = e.target.questionId.value;
      const response = e.target.response.value;
      const dataToSend = {
          userId: this.props.mainState.userId,
          questionId: questionId,
          questionStatusId: 2,
          response: response,
      }
      e.target.response.value = '';
      this.props.handleResponsePost(dataToSend);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="hidden" name="questionId" value={this.props.questionId} />
          <input name="response" id="response" type="response" className="form-control" />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Answer</button>
          </span>
        </div>
      </form>
    );
  }
}
