
import React, { Component } from 'react';
import axios from 'axios';
import FullWidthTabs from './components/FullWidthTabs';
import ApplicationHeader from './components/ApplicationHeader';
import TrainList from './components/TrainList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import SideDrawer from './components/SideDrawer';
import moment from 'moment';
const theme = createMuiTheme();



class App extends Component {
  constructor() {
    super();
    this.state = {
      trains: [],
      loading: false,
      homeStations: ["NMC", "NMN"],
      workStations: ["MAN"],
      direction: 0,
      drawer: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  createJourney(origin, destination) {
    return () => {
      return axios.get(`https://trains.mcrlab.co.uk/departures/${origin}/${destination}`);
    }
  }

  loadTrains() {
    this.setState({ loading: true, trains: [] });
    let journeys = [];
    let origins, destinations;

    if(this.state.direction === 0){
      origins = this.state.homeStations;
      destinations = this.state.workStations;
    } else {
      origins = this.state.workStations;
      destinations = this.state.homeStations;
    }

    origins.map((origin, index)=>{
      destinations.map((destination, index)=>{
        journeys.push(this.createJourney(origin, destination)());
      })
    });

    axios.all(journeys)
      .then((results)=>{
        let departures = [].concat.apply([], results.map((r) => r.data['departures']));

        departures.sort((a,b) => {
            let dateA = moment(a.etd, "HH:mm").format("X");
            let dateB = moment(b.etd, "HH:mm").format("X");
            return dateA > dateB;
        });

        this.setState({"trains": departures, loading: false});
      });
  }

  handleChange(e, direction) {
    this.setState({ direction },
      this.loadTrains
    );
  }

  handleClick(state) {
    this.loadTrains();
  }

  toggleDrawer(drawerState){
    this.setState({ 'drawer' : drawerState });
  }

  componentDidMount() {
    this.loadTrains();
  }

  render() {
    let spinner;
    if(this.state.loading){
      spinner = <CircularProgress />
    } else {
      spinner = false
    }

    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ApplicationHeader handleMenu={this.toggleDrawer} handleClick={this.handleClick} />
          <SideDrawer  drawer={this.state.drawer} toggleDrawer={this.toggleDrawer} homeStations={this.state.homeStations} workStations={this.state.workStations}/>
          <FullWidthTabs handleClick={this.handleChange} value={this.state.direction}/>
          <TrainList trains={this.state.trains} />
          {spinner}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
