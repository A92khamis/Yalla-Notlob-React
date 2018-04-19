import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import TimeAgo from 'javascript-time-ago'
 
// Load locale-specific relative date/time formatting rules.
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'
 
// Add locale-specific relative date/time formatting rules.
TimeAgo.locale(en)
TimeAgo.locale(ru)
// import './scenes/sign/index';

ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();
