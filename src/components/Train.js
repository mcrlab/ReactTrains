import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import red from '@material-ui/core/colors/red';
import ArrowForward from '@material-ui/icons/ArrowForward';
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
  },
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  to: {
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
  },
  item: {
    margin: 'auto',
    width: '40%'
  }
};

class Train extends React.Component {

  calculateStatus() {

  }

  render() {
    const { classes } = this.props;
    const train = this.props.train;
    let trainClass;
    let departureDelay, arrivalDelay;
    if(train.isCancelled || train.origin.etd === "Delayed"){
      trainClass = classes.cancelled;
      if(train.origin.etd === "Delayed"){
        departureDelay = <span className={classes.plusTime}>Delayed</span>
      }

    } else if((train.origin.etd !== train.origin.std) || (train.destination.eta !== train.destination.sta)) {
      trainClass = classes.delayed;
      let etd = moment(train.origin.etd, "HH:mm").format("X");
      let std = moment(train.origin.std, "HH:mm").format("X");
      let eta = moment(train.destination.eta, "HH:mm").format("X");
      let sta = moment(train.destination.sta, "HH:mm").format("X");

      let delayInSeconds = (etd - std);
      let seconds = delayInSeconds % 60;
      let minutes = (delayInSeconds - seconds) / 60;

      departureDelay = <span className={classes.plusTime}>+{minutes}m</span>

      delayInSeconds = (eta - sta);
      seconds = delayInSeconds % 60;
      minutes = (delayInSeconds - seconds) / 60;
      if(minutes > 0) {
        arrivalDelay = <span className={classes.plusTime}>+{minutes}m</span>
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
         <div className={classes.container}>
         <div className={classes.item}>
          <Typography variant='subheading'>
           {train.origin.std}
           {departureDelay}
          </Typography>
          <Typography variant='caption'>
            <span>{train.origin.name}</span>
          </Typography>
          </div>
          <div className={classes.to}>
            <ArrowForward />
          </div>
          <div className={classes.item}>
           {train.destination.sta}
           {arrivalDelay}
          <Typography variant='caption'>
            <span>{train.destination.name}</span>
          </Typography>
          </div>
          </div>
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
