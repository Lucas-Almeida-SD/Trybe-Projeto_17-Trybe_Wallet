import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/Trybe-Projeto_17-Trybe_Wallet"
          render={ (props) => <Login { ...props } /> }
        />
        <Route
          exact
          path="/Trybe-Projeto_17-Trybe_Wallet/carteira"
          render={ (props) => <Wallet { ...props } /> }
        />
      </Switch>
    </div>
  );
}

export default App;
