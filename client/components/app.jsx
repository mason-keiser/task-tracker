import React from 'react';
import Home from './home';
import Login from './login';
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
      }
    };
    this.setView = this.setView.bind(this);
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

  render() {
    const view = (this.state.view.name === 'home')
      ? <Home setView = {this.setView}/>
      : (this.state.view.name === 'login')
        ? <Login setView = {this.setView}/>
        : (this.state.view.name ==='signup')
          ? <SignUp setView = {this.setView}/>
          : null
    return (
    <div>
      {view}
    </div>
    )
  }
}