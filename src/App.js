
import React, { Component } from 'react';
import axios from 'axios';
import FullWidthTabs from './components/FullWidthTabs';
import ApplicationHeader from './components/ApplicationHeader';
import TrainList from './components/TrainList';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from 'moment';
import Spinner from './components/Spinner';
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
  }

  createJourney(origin, destination) {
    return () => {
      return axios.get(`https://trains.mcrlab.co.uk/next/${origin}/${destination}`);
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
        return null;
      })
      return null;
    });

    axios.all(journeys)
      .then((results)=>{
        let departures = [].concat.apply([], results.map((r) => r.data['departures']));
        departures.sort((a,b) => {
            let dateA = moment(a.origin.estimated, "HH:mm").format("X");
            let dateB = moment(b.origin.estimated, "HH:mm").format("X");
            return dateA - dateB;
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

  componentDidMount() {
    let currentHour = moment().format("HH");
    let direction = (currentHour < 12)? 0:1;
      this.setState({
        direction
      },
      this.loadTrains);
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <ApplicationHeader handleClick={this.handleClick} />
          <FullWidthTabs handleClick={this.handleChange} value={this.state.direction}/>
          <TrainList trains={this.state.trains} />
          <Spinner active={this.state.loading}/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
