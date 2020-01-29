import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import './styles/App.scss';
import './styles/Header.scss';
import './styles/Body.scss';
import './styles/Footer.scss';
import './styles/SongAttribute.scss';
import './styles/GeneratedTemplate.scss';
import './styles/InstrumentsList.scss';
import './styles/ImportConfigDialog.scss';
import './styles/Nav.scss';
import './styles/base_shit.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
