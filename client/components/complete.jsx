import React from 'react';

export default class Complete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitems: null 
        }
        this.complete = this.complete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteId = this.deleteId.bind(this);
    }

    componentDidUpdate() {
      if (this.state.checklistitems !== null){
        this.complete()
      }
    }

    componentDidMount(){
        this.complete()
    }

    complete(){
        const userid = parseInt(this.props.user.userId);
        if (userid == NaN){ 
          return null;
        } else {
        const bool = true;
        fetch('/api/complete/' + userid + '/' + bool, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json'}
        })
        .then(response => {
          if (response.status === 400 || response.status === 404 || response.status === 500) {
            return null
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
        }
        
        deleteId(id) {
          fetch('/api/delete', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
              checklistitemid: id
            })
          })
          .then(response => {
            return response.json();
          })
        }  

    render() {
      const tert = (this.state.checklistitems !== null)
        ? 
          this.state.checklistitems.map((item, index) =>
          <div>
            <div className ='map' key={index}>
              <div className='itemTitle'>{item.checklistitem}</div>
              <div onClick={() => this.deleteId(item.checklistitemid)} className="mt-1 mb-1 fa-trash-fill deleteButton">Delete</div>
              <button id='bool_update' onClick={() => this.handleClick(item.checklistitemid)} className="mt-1 mb-1 loginButton2">Mark Active</button>
            </div>
          </div>
            
          )
        : <div>

      </div>
        return (
            <div className="listContainer2">
              <h1> Inactive Items</h1>
              <div className='bord'>
                {tert}
              </div>
            </div>
        );
    }
}