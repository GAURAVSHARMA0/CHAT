import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";

import CHAT from './ChatWindow/Chat';
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
    this.client = new W3CWebSocket(`ws://${process.env.REACT_APP_SERVER}?USERID=${this.props.data.userId}&USER=${this.props.data.name}`);
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
  handleSend = (text, id) =>{
    if(text){
      this.client.send(JSON.stringify({
          msg: text,
          from: this.props.data.userId,
          to: id,
        }));

      this.setState({text: ""});
    }
  }
  render() {
    return (
        <CHAT user={this.state.userList} sendMsg={this.handleSend} />
    );
  }
}

export default App;