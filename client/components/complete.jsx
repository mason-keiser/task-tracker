import React from 'react';

export default class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitems: null 
        }
        this.complete = this.complete.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidUpdate() {
      this.complete()
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

      handleClick(id) {
        fetch('/api/isComplete', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            checklistitemid: id
          })    
        })
          .then(response => {
            return response.json()
          })
            .then(result => {
              console.log(result)
              document.getElementById('bool_update').textContent = result.iscomplete
            })
        }  
// Write conditional on render if state is null : not null to render mapped out objects
    render() {
      const tert = (this.state.checklistitems !== null)
        ? 
          this.state.checklistitems.map((item, key) =>
            <div className ='map' key={key}>{item.checklistitem}
              <button id='bool_update' onClick={() => this.handleClick(item.checklistitemid)} className="ml-3 loginButton2">{item.iscomplete.toString()}</button>
            </div>
          )
        : <div>

      </div>
        return (
            <div className="listContainer2">
              <h1> Complete Items</h1>
              <div className='bord'>
                {tert}
              </div>
            </div>
        );
    }
}