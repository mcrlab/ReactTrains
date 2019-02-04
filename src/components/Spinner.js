import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  active: {
    textAlign: "center",
    paddingTop: 50,
  },
  inactive: {
    display: "none",
  }

};

class Spinner extends React.Component {

  render(){
    const { classes } = this.props;
    let spinner;
    if(this.props.active) {
      spinner = classes.active;
    } else {
      spinner = classes.inactive;
    }

    return (
      <div className={spinner}>
        <CircularProgress />
      </div>
    );
  }
}

export default withStyles(styles)(Spinner);
