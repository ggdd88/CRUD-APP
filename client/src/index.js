import React from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import Routes from './routes';
import { createBrowserHistory } from "history";

import {BrowserRouter as Router} from "react-router-dom";

const customHistory = createBrowserHistory();

ReactDOM.render(  

<React.StrictMode>
    <Router history={customHistory}>
      <Routes />
    </Router>
  </React.StrictMode>, document.getElementById('root')
  );


