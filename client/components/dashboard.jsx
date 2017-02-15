import React from 'react';
import Question from './question.jsx';
import Navbar from './navbar.jsx';
import NewQuestion from './newquestion.jsx';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const filtered1 = Object.values(this.props.getQuestions()).filter((question) => {
      return question.status.id === 1;
    });
    const filtered2 = Object.values(this.props.getQuestions()).filter((question) => {
      return question.status.id === 2;
    });
    const filtered3 = Object.values(this.props.getQuestions()).filter((question) => {
      return question.status.id === 3;
    });
    const filtered4 = Object.values(this.props.getQuestions()).filter((question) => {
      return question.status.id === 4;
    });

    let arr1 = [];
    let arr2 = [];
    let arr3 = [];
    let arr4 = [];

    filtered1.forEach((question, idx) => {
      arr1.push(<Question key={question.id} status={1} data={question} />);
    });
    filtered2.forEach((question, idx) => {
      arr2.push(<Question key={question.id} status={2} data={question} />);
    });
    filtered3.forEach((question, idx) => {
      arr3.push(<Question key={question.id} status={3} data={question} />);
    });
    filtered4.forEach((question, idx) => {
      arr4.push(<Question key={question.id} status={4} data={question} />);
    });

    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <NewQuestion mainState={this.props.mainState} postQuestion={this.props.postQuestion} />         
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="panel panel-primary">
                <div className="panel-heading text-center">
                  <h3 className="panel-title">Opened</h3>
                </div>
              </div>
              {arr1}
            </div>
            <div className="col-lg-3">
              <div className="panel panel-warning">
                <div className="panel-heading text-center">
                  <h3 className="panel-title">Answered</h3>
                </div>
              </div>
              {arr2}
            </div>
            <div className="col-lg-3">
              <div className="panel panel-danger">
                <div className="panel-heading text-center">
                  <h3 className="panel-title">Declined</h3>
                </div>
              </div>
              {arr3}
            </div>
            <div className="col-lg-3">
              <div className="panel panel-success">
                <div className="panel-heading text-center">
                  <h3 className="panel-title">Closed</h3>
                </div>
              </div>
              {arr4}
            </div>
          </div>
        </div>
      </div>        
    );
  }
}