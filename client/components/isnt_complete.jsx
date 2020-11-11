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
      const tert = (this.state.checklistitems !== null)
        ? 
          this.state.checklistitems.map((item, key) =>
            <div className ='map' key={key}>{item.checklistitem}
              <button className="ml-3 loginButton2">{item.iscomplete.toString()}</button>
            </div>
            
          )
        : null
      return(
        <div className="listContainer2">
          <div className="bord">
            {tert}
          </div>
        </div>
      );
    }
}