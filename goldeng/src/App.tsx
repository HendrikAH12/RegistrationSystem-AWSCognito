import React from 'react';
import Amplify from 'aws-amplify';
import amplify_config from './amplify-config';

import './App.css';
import Routes from './routes'

Amplify.configure(amplify_config);

function App() {
    return (
      <Routes />
  )
}

export default App;
