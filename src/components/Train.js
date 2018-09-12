import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';

const styles = {
  ontime: {
    color: '#fff',
    backgroundColor: green[500],
  },
  delayed: {
    color: '#fff',
    backgroundColor: amber[500],
  },
  cancelled: {
    color: '#fff',
    backgroundColor: red[500],
  },
  plusTime: {
    padding: 5,
    color: red[500]
  }
};

class Train extends React.Component {
  render() {
    const { classes } = this.props;
    const train = this.props.train;
    let trainClass;
    let delay;
    if(train.cancelled){
      trainClass = classes.cancelled;
    } else if(train.etd === "Delayed" || train.etd !== train.std) {
      trainClass = classes.delayed;
      if(train.etd === "Delayed"){
        delay = <span className={classes.plusTime}>DELAYED</span>
      } else {
        let etd = moment(train.etd, "HH:mm").format("X");
        let std = moment(train.std, "HH:mm").format("X");
        let delayInSeconds = (etd - std);
        let seconds = delayInSeconds % 60;
        let minutes = (delayInSeconds - seconds) / 60;
        delay = <span className={classes.plusTime}>+{minutes}m</span>
      }
    } else {
      trainClass = classes.ontime;
    }

    return(
      <div>
        <ListItem>
         <Avatar className={trainClass}>
           <p>{train.platform}</p>
         </Avatar>
         <ListItemText>
          <Typography variant='subheading'>
           {train.std}
           {delay}
          </Typography>
          <Typography variant='caption'>
            <span>{train.origin.name}</span>
            <strong> to </strong>
            <span>{train.destination.name}</span>
          </Typography>
         </ListItemText>
        </ListItem>
        <li>
           <Divider  />
         </li>
       </div>
    )
  }
}

export default withStyles(styles)(Train);
