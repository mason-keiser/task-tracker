import React from 'react';

export default class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitems: null 
        }
        this.complete = this.complete.bind(this);
    }

    componentDidMount(){
        this.complete()
    }

    complete(){
        const userid = parseInt(this.props.user.userId);
        const bool = true;
        fetch('/api/complete/' + userid + '/' + bool, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
          if (response.status === 400 || response.status === 404) {
            null
          } else {
            return response.json();
          }
        })
          .then(result => {
              this.setState({
                  checklistitems: result
              })
          })
      }

    render() {
        return (
            <div className="homepageContainer">
              
            </div>
        );
    }
}