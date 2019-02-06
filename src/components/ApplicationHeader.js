import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Refresh from '@material-ui/icons/Refresh';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

class ApplicationHeader extends React.Component {

  render(){
    const { classes } = this.props;
    return (
      <AppBar position="static" color="primary">
         <Toolbar>
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
