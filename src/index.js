import React from 'react';
import ReactDOM from 'react-dom';
import muiTheme from "./theme/muiTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import Login from './Login';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
class Routing extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      loggedIn : false,
      user: null,
    }
  }
  componentWillMount(){
    if(localStorage.getItem("user")){
      this.setLoggedIn(JSON.parse(localStorage.getItem("user")));
    }
  }
  setLoggedIn = user =>{
    this.setState({loggedIn : !this.state.loggedIn, user : user});
  }
  render(){
    return(
      <Router>
        <MuiThemeProvider theme={muiTheme}>
          <Route exact path="/">
          {(this.state.loggedIn && this.state.user !== null) ?
          <App loginHandler={this.setLoggedIn} data={this.state.user} />
          : 
          <Login loginHandler={this.setLoggedIn} />}
          </Route>
          </MuiThemeProvider>
      </Router>
    );
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
