import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import StationList from './StationList';
let styles = {
  list: {
    width: 250,
  },
  chip: {
    margin: 5,
  },
};

class DestinationList extends React.Component {

  handleDeleteHomeStation(index){
    alert(`Delete ${index}`);
  }
  handleDeleteWorkStation(index){
    alert(`Delete ${index}`);
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.list}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Home Stations</ListSubheader>}
        >
          <StationList stations={this.props.homeStations} handleDelete={this.handleDeleteHomeStation} color={"primary"} />

        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Work Stations</ListSubheader>}
        >
          <StationList stations={this.props.workStations} handleDelete={this.props.handleDeleteWorkStation} color={"secondary"} />
          <ListItem>
            <Button>Save</Button>
          </ListItem>
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(DestinationList);
