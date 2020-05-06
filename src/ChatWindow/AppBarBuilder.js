import React from 'react';
//Material UI
import {makeStyles, AppBar, Toolbar, LinearProgress,Typography} from "../theme/muiComponents";


const styles = makeStyles(theme => ({
    
    headerTitle:{
        color:"#fff",
      },
    menuIcon : {
      color : theme.palette.common.white
    },
    headerIcon:{
        color : "#fff"
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        background: 'linear-gradient(15deg, #921aff, #9ea5ff)',
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        textAlign:"center"
      },
      moreButton:{
        color:"#Faffff",
      },

}));

const AppBarBuilder = (props) => {
  const classes = styles();

  //Getting props
  const HeaderIcon = props.headerIcon;
  //Loader 
    let Loader = props.IS_LOADING ? (
      <LinearProgress color="secondary" />
    ) : null;
  return (
    <AppBar
    position="static"
    className={classes.appBar} >
      <Toolbar style={{paddingLeft: "10px",}}>
          <span style={{ flexGrow: 0.01 }} />
          <Typography className={classes.headerTitle} variant="h6" noWrap>
            {props.headerTitle}
          </Typography>
          <HeaderIcon fontSize="small"  style={{ flexGrow: 0.02 }} className={classes.headerIcon} />
         <span style={{ flexGrow: 1 }} />
           {props.headerButton}
         <span style={{ flexGrow: 0.04 }} />
     </Toolbar>
    {Loader}
  </AppBar>
  );
}

export default AppBarBuilder;