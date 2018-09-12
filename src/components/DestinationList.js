import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import Chip from '@material-ui/core/Chip';

let styles = {
  list: {
    width: 250,
  },
  chip: {
    margin: 5,
  },
};

class DestinationList extends React.Component {

  handleDelete(e){
    alert('delete');
  }

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.list}>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Home Stations</ListSubheader>}
        >
          <ListItem>
            {this.props.homeStations.map((item, index) => {
              return (<Chip
                key={index}
                className={classes.chip}
                label={item}
                onDelete={this.handleDelete}
                color="primary"
              />)
            })}
          </ListItem>

        </List>
        <List
          component="nav"
          subheader={<ListSubheader component="div">Work Stations</ListSubheader>}
        >
          <ListItem>
          {this.props.workStations.map((item, index) => {
            return (<Chip
              key={index}
              className={classes.chip}
              label={item}
              color="secondary"
              onDelete={this.handleDelete}
            />)
          })}
          </ListItem>

        </List>
      </div>
    )
  }
}

export default withStyles(styles)(DestinationList);
