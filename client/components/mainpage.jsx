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
          checklistitem: this.state.checklistitem,
          userid: this.props.userid
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
                <div className="formContainer">
                    <form onSubmit={this.handleSubmit} className='mt-5'>
                        <div>
                            <input type="text" placeholder='description' id='checklistitem' onChange={this.handleChange}/>
                        </div>
                        <div>
                        <button type='submit' className='btn loginButton mt-2' style={{ borderRadius: '5%', border: 'none'}}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}