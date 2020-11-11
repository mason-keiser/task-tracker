import React from 'react';

export default class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_first: '',
            user_last: '',
            user_email: '',
            user_password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


  handleSubmit(callback) {
    event.preventDefault();
    const obj = {
      firstname: this.state.user_first,
      lastname: this.state.user_last,
      email: this.state.user_email.toLowerCase(),
      password: this.state.user_password
    };
    callback(obj)
  }

  handleChange(event) {
    if (event.target.id === 'user_first') {
      this.setState({ user_first: event.target.value });
    }
    if (event.target.id === 'user_last') {
      this.setState({ user_last: event.target.value})
    }
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
            <div className='greeting'>
              <h2>Welcome</h2>
            </div>
            <form className="login-group mt-5" onSubmit={() => this.handleSubmit(this.props.signUp)}>
              <div className='form-group'>
                <label htmlFor="username" className='pr-3'>First: </label>
                <input type="text" name='firstname' className="" id='user_first' onChange={this.handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor="username" className='pr-3'>Last: </label>
                <input type="text" name='lastname' className="" id='user_last' onChange={this.handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor="email" className="pl-2 pr-3">Email:  </label>
                <input type="text" className="mr-3" name='email' id='user_email' onChange={this.handleChange}/>
              </div>
              <div className='form-group'>
                <label htmlFor="password" className='pr-3'>Pass: </label>
                <input type="text" name='password' className="" id='user_password' onChange={this.handleChange}/>
              </div>
              <div className='form-group'>
                <button type='submit' className='btn loginButton mt-2' style={{ borderRadius: '5%', border: 'none'}}>Sign Up</button>
              </div>
            </form>
          </div>
        )
    }
}