import React from 'react';

export default class NotComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitems: null 
        }
        this.notComplete = this.notComplete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate() {
      this.notComplete()
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

    handleClick(id) {
      fetch('/api/isComplete', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          checklistitemid: id
        })    
      })
        .then(response => {
          return response.json();
        })
          .then(result => {
            console.log(result);
            document.getElementById('bool_update').textContent = result.iscomplete;
            this.forceUpdate();
          })
      }  

    render() {
      const tert = (this.state.checklistitems !== null)
        ? 
          this.state.checklistitems.map((item, key) =>
            <div className ='map' key={key}>{item.checklistitem}
              <button id='bool_update'onClick={() => this.handleClick(item.checklistitemid)} className="ml-3 loginButton2">{item.iscomplete.toString()}</button>
            </div>
            
          )
        : <div>
          <h1>this is empty </h1>
        </div>
      return(
        <div className="listContainer2">
          <h1>Incomplete Items</h1>
          <div className="bord"> 
            {tert}
          </div>
        </div>
      );
    }
}