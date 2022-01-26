import logo from './logo.svg';
import './App.css';
import React from 'react';
import Cronometro from './Cronometro'
import PartDown from './PartDown'


class App extends React.Component{
  render(){
    return (
      <main>
        <div className="section-up">
          <h3>Session</h3>
          <Cronometro />
        </div>
        <div>
          <PartDown />
        </div>

      </main>
    )
  }
}
export default App;
