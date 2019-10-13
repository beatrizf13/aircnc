import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles';
import logo from '~/assets/img/logo.svg';

function App() {
  return (
    <div className="container">
      <img src={logo} alt="AirCnC" />
      <div className="content">
        <GlobalStyle />
        <Routes />
      </div>
    </div>
  );
}

export default App;
