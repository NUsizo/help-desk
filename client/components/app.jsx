import React from 'react';
import Login from './login.jsx';
import Signup from './signup.jsx';
import Dashboard from './dashboard.jsx';
import Navbar from './navbar.jsx';
import $ from 'jquery';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
} from 'react-router';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      userName: null,
      profile: null,
      questions: {},
      questionsStatus: [
        {id: 1, name: 'Opened'},
        {id: 2, name: 'Pending'},
        {id: 3, name: 'Waiting'},
        {id: 4, name: 'Closed'},
      ]
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.postQuestion = this.postQuestion.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.handleResponsePost = this.handleResponsePost.bind(this);
    this.updateQuestionStatus = this.updateQuestionStatus.bind(this);
  }

  handleLogIn(e) {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    $.ajax({ 
      url: '/login/',
      type: 'POST',
      data: JSON.stringify({ username, password }),
      contentType: "application/json; charset=utf-8",
    })
    .done((data) => {
      if (data.id) {
        this.setState({
          userId: data.id,
          userName: data.username,
        }, () => {
          browserHistory.push('/dashboard');
        });
      } else {
        alert('Invalid credentials!');
      }
    })
    .fail(function() {
      alert("error");
    })
  };

  handleSignUp (dataObj) {
    console.log('in handle signup');
    console.log(dataObj);
    $.ajax({
      url: '/signup/',
      type: 'POST',
      data: JSON.stringify(dataObj),
      contentType: 'application/json; charset=utf-8',
    })
    .done((data) => {
      console.log('done with ajax call', data);
      let username = this.state.username;
      let password = this.state.password;
      let profile = this.state.profile;
      this.setState({ username, password, profile }, () => {
        browserHistory.push('/dashboard');
      });
    })
    .fail(function() {
      alert('error with the sign up request');
    })
  };

  getQuestions() {
    $.ajax({ 
      url: '/questions',
      type: 'GET',
      contentType: "application/json; charset=utf-8",
    })
    .done((data) => {
      const newState = {questions : {}};
      data.forEach((question) => {
        newState.questions[question.id] = question;
      })
      this.setState(newState);
    });
  }

  postQuestion(dataObj) {
    $.ajax({
      url: '/questions/',
      type: 'POST',
      data: JSON.stringify(dataObj),
      contentType: 'application/json; charset=utf-8',
    })
    .done((data) => {
      let questions = this.state.questions;
      questions[data.id] = data;
      this.setState(questions, () => {
        console.log('State updated...');
        browserHistory.push('/dashboard');
      });
    })
    .fail(function() {
      alert('error');
    })
  };

  updateQuestionStatus(questionId, newStatus) {
    console.log(questionId, newStatus);
    let questions = this.state.questions;
    questions[questionId].questionStatusId = newStatus;
    console.log(this.state);
    this.setState(questions, () => {
      console.log('State updated...');
    });
  }

  handleResponsePost(dataObj) {
    $.ajax({
      url: '/responses/',
      type: 'POST',
      data: JSON.stringify(dataObj),
      contentType: 'application/json; charset=utf-8',
    })
    .done((data) => {
      const questionId = dataObj.questionId;
      let questions = this.state.questions;
      if (questions[questionId].responses) {
        questions[questionId].responses.push(dataObj);
      } else {
        questions[questionId].responses = [dataObj];
      }
      questions[questionId].questionStatusId = dataObj.questionStatusId;
      
      this.setState(questions, () => {
        console.log('State updated...');
      });
    })
    .fail(function() {
      alert('error with the ajax post request');
    })
  }

  render() {
    return (
      <div>
        <Navbar userName={this.state.userName} />
        {React.cloneElement(this.props.children, {
          mainState: this.state,
          getQuestions: this.getQuestions,
          updateQuestionStatus: this.updateQuestionStatus,
          postQuestion: this.postQuestion,
          handleLogIn: this.handleLogIn,
          handleResponsePost: this.handleResponsePost,
          handleSignUp: this.handleSignUp,
        })}
      </div>
    );
  }
}
