import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Login from './signin';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : "",
      recipient : "",
      userList : []
    }

  }
  componentDidMount() {  
    this.client = new W3CWebSocket(`ws://${process.env.REACT_APP_SERVER}?USERID=${process.env.REACT_APP_USERID}&USER=${process.env.REACT_APP_USER}`);
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.client.onmessage = (message) => {
        const msgData = JSON.parse(message.data);
        const { type } = msgData;
        if(type === "USERLIST"){
          this.setState({userList : msgData.users});
        }
        else{
          console.log(msgData);
        }
    };
    this.client.onerror = (err) =>{
      console.log('ONERROR ',err);
    }
    console.log('process',process.env)
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }
  handleSend = () =>{
    if(this.state.text){
  
      this.client.send(JSON.stringify({
          msg: this.state.text,
          userid: process.env.REACT_APP_USERID,
          to:this.state.recipient,
        }));

      this.setState({text: ""});
    }
  }
  render() {
    return (
      <div>
        <h6> SERVER: {process.env.REACT_APP_SERVER}</h6>
        <label>To : </label>
        <input type="text" name="recipient" value={this.state.recipient} onChange={this.handleChange} />
        <label>Message</label>
        <input type="text" name="text" value={this.state.text} onChange={this.handleChange} />
       
        <button onClick={this.handleSend}>Send Message</button>
        <Login />
      </div>
     
    );
  }
}

export default App;