import React, { Component } from 'react';
import Header from './Header';
import GenerateASongTemplateRoot from './GenerateASongTemplateRoot';
import Footer from './Footer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  HashRouter,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import * as services from '../backend/Services';
import StartASongRoot from '../components/StartASongRoot';
import FindAnInstrumentRoot from '../components/FindAnInstrumentRoot';
import GenerateABasslineRoot from '../components/GenerateABasslineRoot';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#000000',
      main: '#76E5FC',
      dark: '#65c2d4',
      contrastText: '#274060'
    },
    secondary: {
      light: '#000000',
      main: '#5C2751',
      dark: '#000000',
      contrastText: '#000000'
    }
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {

  componentWillMount(props) {
    services.init();
  }

  render() {
    console.log('app render called')
    return (
      <HashRouter>

        <MuiThemeProvider theme={theme}>
          <Header />

          <Switch>
            <Route path="/start-a-song">
              <StartASongRoot />
            </Route>
            <Route path="/find-an-instrument">
              <FindAnInstrumentRoot />
            </Route>
            <Route path="/generate-a-bassline">
              <GenerateABasslineRoot />
            </Route>
            <Route path="/generate-a-song-template">
              <GenerateASongTemplateRoot />
            </Route>
            <Route path="/">
              <Redirect to="/generate-a-song-template" />
            </Route>
          </Switch>

          <Footer />
        </MuiThemeProvider>

      </HashRouter>
    );
  }
}

export default App;
