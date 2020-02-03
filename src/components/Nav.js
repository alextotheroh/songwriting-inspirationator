import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";


class Nav extends Component {

  getClassForNavTab = (subappRoute) => {
    if (this.props.currentUrl.includes(subappRoute)) {
      return "Nav-selected-tab";
    }
    return "";
  }

  render() {
    console.log(this.props.currentUrl);
    return (

      <div className="Nav-container">
          <Grid container justify="center">
            <Grid item xs={1.5} className={this.getClassForNavTab("generate-a-song-template")}><Button size="large" className="theme-button-1">
              <Link to="/generate-a-song-template">generate a song template</Link></Button></Grid>
            <Grid item xs={1.5} className={this.getClassForNavTab("start-a-song")}><Button size="large" className="theme-button-1">
              <Link to="/start-a-song">start a song</Link></Button></Grid>
            <Grid item xs={1.5} className={this.getClassForNavTab("find-an-instrument")}><Button size="large" className="theme-button-1">
              <Link to="/find-an-instrument">find an instrument</Link></Button></Grid>
            <Grid item xs={1.5} className={this.getClassForNavTab("generate-a-bassline")}><Button size="large" className="theme-button-1">
              <Link to="/generate-a-bassline">generate a bassline</Link></Button></Grid>
          </Grid>
      </div>

    );
  }

}

export default Nav;
