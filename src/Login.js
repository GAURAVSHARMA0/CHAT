import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import UserInfo from './Config/loginConf.json';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Haye - Live Chat
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(6, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      userId:"",
      password:"",
      userData : UserInfo,
    }
  }
  handleChange = e =>{
    this.setState({[e.target.name] : e.target.value});
  }
  loginHandle = e =>{

    if(this.state.userId && this.state.password){
      // this.props.loginHandler();
      console.log(this.state.userData, 'UD');
      const findUserIndex = this.state.userData.findIndex(user => user.userId.toLowerCase() === this.state.userId.toLowerCase())
      if(findUserIndex !== -1){
          if(this.state.password === this.state.userData[findUserIndex].password){
            localStorage.setItem("user",JSON.stringify(this.state.userData[findUserIndex]));
            this.props.loginHandler(this.state.userData[findUserIndex]);
          }
          else{
            this.setState({password: ""});
            alert("Your have entered wrong password !");
          }
      }
      else{
        this.setState({userId: "", password: ""});
        alert("Your user id is not found in our system !");
      }
    }
  }
  render(){
    const { classes } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={5} md={8} className={classes.image} />
        <Grid item xs={12} sm={7} md={4} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Welcome on Haye
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="standard"
                margin="dense"
                required
                fullWidth
                value={this.state.userId}
                onChange={this.handleChange}
                id="text"
                placeholder="Enter Your userId"
                color="secondary"
                label="UserID"
                name="userId"
                autoFocus
              />
              <TextField
                variant="standard"
                margin="dense"
                required
                value={this.state.password}
                fullWidth
                onChange={this.handleChange}
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="Enter Your password"
                color="secondary"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                onClick={this.loginHandle}
                color="secondary"
                className={classes.submit}
              >
                Login
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    );

  }
  
}
export default withStyles(useStyles)(Login);