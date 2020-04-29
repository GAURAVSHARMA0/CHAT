import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      text : ""
    }

  }
  componentDidMount() {  
    this.client = new W3CWebSocket(`ws://${process.env.REACT_APP_SERVER}`);
    this.client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    this.client.onmessage = (message) => {
      console.log(JSON.parse(message.data));
    };
    this.client.onerror = (err) =>{
      console.log('ONERROR ',err);
    }
    console.log('process',process.env)
  }
  handleChange = (e) => {
    this.setState({text: e.target.value});
  }
  handleSend = () =>{
    if(this.state.text){
  
      this.client.send(JSON.stringify({
          msg: this.state.text,
          user: process.env.REACT_APP_USER,
          userid: process.env.REACT_APP_USERID
        }));

      this.setState({text: ""});
    }
  }
  render() {
    return (
      <div>
        <h6> SERVER: {process.env.REACT_APP_SERVER}</h6>
        <input type="text" value={this.state.text} onChange={this.handleChange} />
        <button onClick={this.handleSend}>Send Message</button>
      </div>
     
    );
  }
}

export default App;