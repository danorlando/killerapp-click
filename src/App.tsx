import React, { useState } from "react"; 
import {Header} from './components';
import {MusicSuggestor} from './containers';
//theme
import "primereact/resources/themes/luna-blue/theme.css";     
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";  
//primeflex 
import "primeflex/primeflex.css";
//custom css
import "./App.css";
import PrimeReact from 'primereact/api';

PrimeReact.ripple = true;

function App() {
 
  return (
    <div className="App">
      <Header />
      <MusicSuggestor />
    </div>
  );
}

export default App;
