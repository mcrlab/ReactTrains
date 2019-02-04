import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

let styles = {
  list: {
    width: 250,
  },
  chip: {
    margin: 5,
  },
};

class StationList extends React.Component {

  render() {
    const { classes } = this.props;
    return(
      <div className={classes.list}>
          <ListItem>
            {this.props.stations.map((item, index) => {
              return (<Chip
                key={index}
                className={classes.chip}
                label={item}
                onDelete={()=> { this.props.handleDelete(index) } }
                color={this.props.color}
              />)
            })}
          </ListItem>
      </div>
    )
  }
}

export default withStyles(styles)(StationList);
