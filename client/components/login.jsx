import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_email: '',
            user_password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


  handleSubmit(callback) {
    event.preventDefault();
    const obj = {
      user_email: this.state.user_email.toLowerCase(),
      user_password: this.state.user_password
    };
    callback(obj)
  }

  handleChange(event) {
    if (event.target.id === 'user_email') {
      this.setState({ user_email: event.target.value });
    }
    if (event.target.id === 'user_password') {
      this.setState({ user_password: event.target.value });
    }
  }

    render() {
        return (
          <div className='homepageContainer'>
            <div className='backButton' onClick={()=> {this.props.setView('home', {})}}>Back Home</div>
            <div className='greeting '>
              <h2>Welcome Back</h2>
            </div>
            <form className="login-group mt-5" onSubmit={() => this.handleSubmit(this.props.login)}>
              <div className='form-group'>
                <label htmlFor="email" className='pr-2'>Email: </label>
                <input type="text" name='email' id='user_email' className="mr-3 pr-1"  onChange={this.handleChange}/>
              </div>
              <div className='form-group password'>
                <label type="password"htmlFor="password" className="pl-3 ml-4">Pass: </label>
                <input type="password" name='password' className="ml-2 pl-2" id='user_password' onChange={this.handleChange}/>
              </div>
              <div className='form-group'>
                <button type='submit' className='btn loginButton'>Login</button>
              </div>
            </form>
          </div>
        )
    }
}