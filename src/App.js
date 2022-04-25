import './App.css';
import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import Navi from "./component/navi"



function App() {
  return (
    <div className="App">
      <Navi/>
    </div>
  );
}


export default App;
