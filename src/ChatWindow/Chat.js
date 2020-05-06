import React, { Component } from 'react';
import NoDataBuilder from './NoData';

//Material UI
import {withStyles,fade, Grid, Card, CardHeader, CardContent, List, ListItem, ListItemAvatar, Avatar, ListItemText, Typography,Divider,Paper,InputBase,IconButton} from "../theme/muiComponents";
//Icons Material UI
import { SendIcon, SearchIcon, ClearIcon, TelegramIcon} from "../theme/muiIcons";
import AppBarBuilder from './AppBarBuilder';
//CSS Styles
const styles = theme => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        border: "1px solid #fdabbe",
        boxShadow: "unset"
        
      },
      datacount: {
        margin:"auto"
      },
      card :{
        marginTop: "5px",
        textAlign:"left",
      },
      collapse:{
        width: 'calc(100% - 588px)',
        position:"absolute",
        zIndex: "1",
      },
      input: {
        marginLeft: 8,
        flex: 1,
      },
      iconButton: {
        padding: 10,
      },
      divider: {
        height: 28,
        margin: 4,
      },
    rootDiv: {
      width: "100%",
    },
    cardRoot:{
      boxShadow: "unset",
    },
    primaryRoot:{
      display: "flex"
    },
    badgeRoot: {
      flexGrow: 1,
      marginRight: "5px",
      alignSelf: "flex-end"
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3),
    },
    cardContentRoot:{
      padding:"unset",
    },
    listRoot:{
      padding:"unset",
    },
    gridContainerTop:{
      maxWidth: "1050px",

    },
    gridContainer:{
      Width: "100%",
      backgroundColor : "white",
      border: "1px solid lightgrey",
      minHeight: "470.835px"
    },
    borderRight:{
      borderRight: "1px solid lightgrey"
    },
    borderBottom:{
      borderBottom: "1px solid lightgrey",
    },
    chatListHeader:{
      borderBottom: "1px solid lightgrey",
    },
    selectTemp:{
      width :"130px",
      margin: "5px 0px",
    },
    selectInput:{
      padding : "2px 0px 2px 10px",
      fontSize: "13px",
      color: "grey"
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(90deg)',
    },
    toggle: {
      marginLeft: '5px',
      marginRight: "8px"
    },
    inlineMsg:{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
        display: "inline-block",
        width: "240px"
    },
    selectedHeader:{
      color: "#f32958",
      padding: "12px 16px"
    },
    customAvatar:{
      backgroundColor : "#fff",
      color : "black"
    },
    sendCardFooter:{
      borderTop: "1px solid lightgrey",
      padding: "2px 8px"
    },
    send: {
      position: 'relative',
      borderRadius: "16px",
      color: "#f32958",
      backgroundColor: fade('#c1c1c1', 0.15),
      '&:hover': {
        backgroundColor: fade('#c1c1c1', 0.20),
      },       
      marginLeft: 0,
      width: '100%',
   
    },
    sendIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sendRoot: {
      color: 'inherit',
    },
    sendInput: {
      padding: theme.spacing(2, 7, 2, 2),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    search: {
      position: 'relative',
      borderRadius: "16px",
      color: "#9a7afd",
      backgroundColor: fade('#c1c1c1', 0.15),
      '&:hover': {
        backgroundColor: fade('#c1c1c1', 0.25),
      },
      
      marginLeft: 0,
      width: '100%',
   
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: 200,
      },
    },
    sliderCustom: {
      overflowY: "auto",
      padding:"16px 0px 40px 20px",
      borderTop:"1px solid lightgrey",
      height:"300px",
      overflowX: "hidden",
      "&::-webkit-scrollbar": {
        width: "5px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-track": {
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "5px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "5px",
        webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
        backgroundColor: "#7d7d7d"
      }
    } 

});

class CHAT extends Component {
  constructor(props){
    super(props);
    this.state = {
      searchText : "",
      text:"",
      selectedId: null,
    }

  }
  handleSearchInput = (event) => {
    this.setState({searchText: event.target.value});
  }
  handleSend = (event) =>{
      event.preventDefault();
    if(this.state.text){
        this.props.sendMsg(this.state.text, this.state.selectedId);
        this.setState({text : ""});
    }
  }
  handleChange = (e) =>{
      this.setState({text : e.target.value});
  }
  handleClear = () =>{
    this.setState({text : ""});
 }
  handleSelected = (selected) =>{
    this.setState({selectedId: selected});
  }
  render() {
    const { classes } = this.props;
    const filteredData = this.props.user.filter(item =>{
        const serachBase = item; // for make serach on which basis
        return serachBase.toLowerCase().includes(this.state.searchText.toLowerCase());
    });
    const listData = filteredData.map((chatObj, index) => { 
        let AvatarData = <Avatar>{chatObj.toString().charAt(0)}</Avatar>;
        return (<React.Fragment key={index}>
            <ListItem alignItems="flex-start" onClick={() => this.handleSelected(chatObj)} button>
            <ListItemAvatar>
              {AvatarData}
            </ListItemAvatar>
            <ListItemText
            
            primary={
              <div className={classes.primaryRoot}>
              <Typography >
              {chatObj}
              </Typography>
              </div>
              }
            secondary={
            <React.Fragment>
            <Typography
            component="span"
            variant="caption"
            color="textSecondary"
            className={classes.inlineMsg}
            >
            {"Click to start Chat"}
            </Typography>
            </React.Fragment>
            }
            />
            </ListItem>
            <Divider variant="fullWidth" component="li"/>
        </React.Fragment>
        );
    });
    return (<>
            <AppBarBuilder
              IS_LOADING={this.props.processing}
              headerTitle={"Haye"} 
              headerIcon={TelegramIcon}
            />
            <Grid 
            container 
            direction="row"
            justify="center"
            spacing={0}
            className={classes.gridContainer}
            >
            <Grid item xs={4} className={classes.borderRight}> 
                    <Card className={classes.cardRoot}>
                    <CardHeader
                    className={classes.chatListHeader}
                    title={
                        <div className={classes.search}>
                        <div className={classes.searchIcon}>
                        <SearchIcon />
                        </div>
                        <InputBase
                        placeholder="Search…"
                        value={this.state.searchText}
                        onChange={this.handleSearchInput}
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    }
                    />
                    <CardContent classes={{root: classes.cardContentRoot}}>
                        <List classes={{root: classes.listRoot}}>
                        {listData}
                        </List>
                        <NoDataBuilder
                        isRendor={(!this.props.user.length === 0 && filteredData.length === 0)}
                        title={"No Matching Contact Found"}
                        description={""}
                        type={"search"}
                        />
                        <NoDataBuilder
                        isRendor={(this.props.user.length === 0 && filteredData.length === 0)}
                        title={"Currently no users active"}
                        description={""}
                        type={"info"}
                        />
                    </CardContent>
                    </Card>
            </Grid>
            <Grid item xs={8} className={classes.borderRight}> 
            {this.state.selectedId ? <>
                <form onSubmit={(event) => this.handleSend(event)}>
                    <Paper className={classes.root}>
                    <InputBase
                        className={classes.input}
                        placeholder={"Type a message..."}
                        value={this.state.text}
                        onChange={this.handleChange}
                        inputProps={{ 'aria-label': `${this.props.placeholder}` }}
                    />
                    {this.state.text && <IconButton onClick={this.handleClear} className={classes.iconButton} aria-label="search">
                        <ClearIcon size="small" />
                    </IconButton>}
                    <Divider className={classes.divider} orientation="vertical" />
                    <IconButton
                        color="secondary"
                        onClick={this.handleSend}
                        aria-label="expandclick">
                        <SendIcon />
                    </IconButton>
                    </Paper>
                    </form>
            </>
            :
            <NoDataBuilder
            isRendor={!(this.state.selectedId)}
            title={this.props.user.length ? "No Contact Selected" : "Currently no users active."}
            description={""}
            type={"intial"}
            />}
            </Grid>
            </Grid>
            </>);
  }
}

export default withStyles(styles)(CHAT);