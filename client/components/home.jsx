import React from 'react';

export default class Home extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
      return (
        <div className="homepageContainer">
          <div className="homeTitle">
            <h1>Daily Planner</h1>
          </div>
          <div className="homeButtons">
              <div onClick={() => this.props.setView('login', {})}>Login</div>
              <div onClick={() => this.props.setView('signup', {})}>Signup</div>
            
          </div>
        </div>
      )
    }
}
