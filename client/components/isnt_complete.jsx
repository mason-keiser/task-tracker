import React from 'react';

export default class NotComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitems: null 
        }
        this.notComplete = this.notComplete.bind(this);
    }

    componentDidMount(){
        this.notComplete()
    }

    notComplete(){
        const userid = parseInt(this.props.user.userId);
        const bool = false;
        fetch('/api/complete/' + userid + '/' + bool, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
           return response.json();
        })
          .then(result => {
              this.setState({
                  checklistitems: result
              })
          })
      }

    render() {
      return(
        <div className="homepageContainer">
              
        </div>
      );
    }
}