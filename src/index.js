import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import AppRouter from './router/AppRouter';
// import './scenes/sign/index';

ReactDOM.render(<AppRouter />, document.getElementById('root'));
registerServiceWorker();
