import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class ApplicationHeader extends React.Component {

  render(){
    const { classes } = this.props;
    return (
      <AppBar position="static" color="primary">
         <Toolbar>
         <IconButton className={classes.menuButton} color="inherit" onClick={this.props.handleMenu} aria-label="Menu">
          <MenuIcon />
        </IconButton>
           <Typography variant="title" color="inherit"  className={classes.grow}>
             Trains
           </Typography>
          <IconButton onClick={this.props.handleClick} color="inherit">
            <Refresh />
          </IconButton>
         </Toolbar>
       </AppBar>
    )
  }
}


export default withStyles(styles)(ApplicationHeader)
