import React from 'react';
import Train from './Train';
import List from '@material-ui/core/List';

class TrainList extends React.Component {
  render() {
    return (
      <List>
        {this.props.trains.map((item, index) => {
           return (
             <Train key={item.id} train={item} />
           )
        })}
      </List>
    )
  }
}

export default TrainList;
