import React from 'react';

export default class NotComplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitems: null 
        }
        this.notComplete = this.notComplete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.deleteId = this.deleteId.bind(this)
    }

    componentDidUpdate() {
      if (this.state.checklistitems !== null){
        this.notComplete()
      }
    }

    componentDidMount(){
        this.notComplete()
    }

    notComplete(){
        const userid = parseInt(this.props.user.userId);
        if (userid == NaN) {
          return null;
        }
        const bool = false;
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
        .then(result => {
          console.log(result)
        }) 
    }

    render() {
      const tert = (this.state.checklistitems !== null)
        ? 
          this.state.checklistitems.map((item, key) =>
          <div>
            <div className ='map' key={key}>
              <div className='itemTitle'>{item.checklistitem}</div>
              <div id={item.checklistitemid} onClick={() => this.deleteId(item.checklistitemid)} className="fa-trash-fill deleteButton mt-1 mb-1">Delete</div>
              <button id='bool_update' onClick={() => this.handleClick(item.checklistitemid)} className="mt-1 mb-1 loginButton2">Mark Inactive</button>
            </div>
          
        </div>
            
          )
        : <div className='hompageContainer'>
        </div>
      return(
        <div className="listContainer2">
          <h1>Active Items</h1>
          <div className="bord"> 
            {tert}
          </div>
        </div>
      );
    }
}