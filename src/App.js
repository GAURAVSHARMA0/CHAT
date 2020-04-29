import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import Login from './signin';
const client = new W3CWebSocket('ws://10.42.0.198:8000');

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : ""
    }

  }
  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      console.log(JSON.parse(message.data));
    };
  }
  handleChange = (e) => {
    this.setState({text: e.target.value});
  }
  handleSend = () =>{
    if(this.state.text){
      client.send(JSON.stringify({
        msg: this.state.text,
        type: "message user"
      }));
      this.setState({text: ""});
    }
  }
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.handleChange} />
        <button onClick={this.handleSend}>Send Message</button>
        <Login />
      </div>
     
    );
  }
}

export default App;