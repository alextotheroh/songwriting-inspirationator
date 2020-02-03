import React, { Component } from 'react';
import StartASongRoot from './StartASongRoot.js';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";


class Nav extends Component {

  render() {
    return (

      <div className="Nav-container">
          <Grid container justify="center">
            <Grid item xs={1.5}><Button size="large" className="theme-button-1"><Link to="/generate-a-song-template">generate a song template</Link></Button></Grid>
            <Grid item xs={1.5}><Button size="large" className="theme-button-1"><Link to="/start-a-song">start a song</Link></Button></Grid>
            <Grid item xs={1.5}><Button size="large" className="theme-button-1"><Link to="/find-an-instrument">find an instrument</Link></Button></Grid>
            <Grid item xs={1.5}><Button size="large" className="theme-button-1"><Link to="/generate-a-bassline">generate a bassline</Link></Button></Grid>
          </Grid>
      </div>

    );
  }

}

export default Nav;
