import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { storeParks } from '../../actions';
import { connect } from 'react-redux';
import Home from '../Home/Home';
import ParksContainer from '../../components/ParksContainer/ParksContainer';
import Park from '../Park/Park';
import './App.css';

import { key } from './key.js';
import TempParkData from '../App/TempData';

export class App extends Component {
  constructor() {
    super()
    this.state = {
      parks: TempParkData,
      error: "",
      isLoading: true
    }
  }

  componentDidMount() {
    // Comment in fetch and remove temp data, reassign state to array
    // fetch(`https://developer.nps.gov/api/v1/parks?api_key=${key.nps_api_key}`)
    // .then(res => res.json())
    // .then(data => this.setState({parks: data.data}))
    // .then(() => this.setState({isLoading: false}))
    // .catch(error => this.setState({error: error.message}))
    storeParks(TempParkData)
    this.props.storeParks
  }

  render() {
    const natlParks = this.state.parks.filter(park => park.designation === "National Park");
    natlParks.map(park => park.type = "parks")
    natlParks.map((park, index) => park.id = index)
    const natlMonts = this.state.parks.filter(park => park.designation === "National Monument");
    natlMonts.map((park, index) => park.type = "monuments")
    const natlOthers = this.state.parks.filter(park => park.designation !== "National Park" && park.designation !== "National Monument");
    natlOthers.map((park, index) => park.type = "others")

    return (
      <main className="App">
        <header className="App-header">
          <NavLink to="/" className="NavText">Home</NavLink>
          <NavLink to="/parks" className="NavText">National Parks</NavLink>
          <NavLink to="/monuments" className="NavText">National Monuments</NavLink>
          <NavLink to="/others" className="NavText">Other Sites</NavLink>
        </header>
        <Route exact path='/' component={Home} />
        <Route exact path='/parks' render={ () => <ParksContainer parks={natlParks}/>} />
        <Route exact path='/monuments' render={() => <ParksContainer parks={natlMonts} />} />
        <Route exact path='/others' render={() => <ParksContainer parks={natlOthers} />} />

        <Route path='/parks/:parkCode' render={({ match }) => {
          const { parkCode } = match.params;
          const park = this.state.parks.find(park => park.parkCode === parkCode);
          return <Park park={park}/>
        }} />
        <Route path='/monuments/:parkCode' render={({ match }) => {
          const { parkCode } = match.params;
          const park = this.state.parks.find(park => park.parkCode === parkCode);
          return <Park park={park} />
        }} />
        <Route path='/others/:parkCode' render={({ match }) => {
          const { parkCode } = match.params;
          const park = this.state.parks.find(park => park.parkCode === parkCode);
          return <Park park={{...park}} />
        }} />
      </main>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  storeParks: parks => dispatch(storeParks(parks))
});

export default connect(null, mapDispatchToProps)(App);