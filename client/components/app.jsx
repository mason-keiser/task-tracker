import React from 'react';
import Header from './header';
import Home from './home';
import Login from './login';
import Mainpage from './mainpage';
import SignUp from './signup';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null,
      isLoading: true,
      view: {
        name: 'home',
        params: {}
      },
      user: {
        firstname: '',
        userId: null
      }
    };
    this.setView = this.setView.bind(this);
    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.addChecklistItem = this.addChecklistItem.bind(this);
  }

  componentDidMount() {
    fetch('/api/health-check')
      .then(res => res.json())
      .then(data => this.setState({ message: data.message || data.error }))
      .catch(err => this.setState({ message: err.message }))
      .finally(() => this.setState({ isLoading: false }));
  }

  setView(names, params) {
    this.setState({
      view: {
        name: names,
        params: params
      }
    });
  }

  login(loginInfo) {
    const email = loginInfo.user_email;
    const password = loginInfo.user_password;
    fetch('/api/login/' + email + '/' + password, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'}
    })
      .then(response => {
        if (response.status === 400 || response.status === 404) {
          console.log('incorrect user_email / user_password combo');
          const e = document.getElementById('user_email');
          e.style.borderColor = 'red';
          const p = document.getElementById('user_password');
          p.style.borderColor = 'red';
        } else {
          return response.json();
        }
      })
      .then(result => {
        this.setState({ user: {
          firstname: result[0].firstname,
          userId: result[0].userid
        }})
        this.setView('main', this.state.user)
      })
  }

  signUp(signupInfo) {
    fetch('/api/signUp/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signupInfo)
    })
      .then(response => {
        if (response.status === 400 || response.status === 404) {
          const e = document.getElementById('user_email');
          e.style.borderColor = 'red';
          const p = document.getElementById('user_password');
          p.style.borderColor = 'red';
          const u = document.getElementById('user_first');
          u.style.borderColor = 'red';
          const f = document.getElementById('user_last');
          f.style.borderColor = 'red';
        } else {
          return response.json();
        }
      })
      .then(result => {
        this.setState({ user: {
          firstname: result.firstname,
          userId: result.userid
        }})
        this.setView('main', this.state.user)
      })
  }

  addChecklistItem(itemInfo) {
    fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemInfo)
    })
      .then(response => {
        if (response.status === 400 || response.status === 404) {
          const e = document.getElementById('checklistitem');
          e.style.borderColor = 'red';
        } else {
          document.getElementById('todo').reset();
        }
      })
  }

  render() {
    const header= (this.state.view.name === 'main')
      ? <Header user={this.state.user} setView={this.setView}/>
      : null

    const view = (this.state.view.name === 'home')
      ? <Home setView = {this.setView}/>
      : (this.state.view.name === 'login')
        ? <Login setView = {this.setView} login={this.login}/>
        : (this.state.view.name ==='signup')
          ? <SignUp setView = {this.setView} signUp={this.signUp}/>
          : (this.state.view.name === 'main')
            ? <Mainpage setView={this.setView} user={this.state.user} addItem={this.addChecklistItem}/>
            : null
    return (
    <div>
      {header}
      {view}
    </div>
    )
  }
}