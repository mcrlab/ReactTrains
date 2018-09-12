import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import DestinationList from './DestinationList';

const styles = {};

class SideDrawer extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <Drawer
        open={this.props.drawer}
        tabIndex={0}
        role="button"
        onClick={()=> this.props.toggleDrawer(false)}
        onKeyDown={()=> this.props.toggleDrawer(false)}
        >
        <div>
          <DestinationList homeStations={this.props.homeStations} workStations={this.props.workStations}/>
        </div>
      </Drawer>
    )
  }
}

export default withStyles(styles)(SideDrawer);
