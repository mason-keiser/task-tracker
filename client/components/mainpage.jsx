import React from 'react';

export default class Mainpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checklistitem: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(callback) {
        event.preventDefault();
        const obj = {
          userid: Number(this.props.user.userId),
          checklistitem: this.state.checklistitem
        };
        callback(obj)
    }
    
    handleChange(event) {
        if (event.target.id === 'checklistitem') {
        this.setState({ checklistitem: event.target.value });
        }
    }

    render() {
        return (
            <div className="homepageContainer">
                <div className="homeTitle">
                    <h1>Add New Checklist Item</h1>
                </div>
                <div >
                    <div className="formContainer mt-3">
                    <form onSubmit={() => this.handleSubmit(this.props.addItem)} id='todo'>
                        <div>
                            <input type="text" placeholder='description' id='checklistitem' onChange={this.handleChange}/>
                        </div>
                        <div>
                        <button type='button' value='submit' className='btn loginButton mt-2'>Submit</button>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        )
    }
}