import React, { Component } from 'react';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Header />
        <Body />
        <Footer />
      </MuiThemeProvider>
    );
  }
}

export default App;
