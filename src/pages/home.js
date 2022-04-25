import React from "react";
import image from "../assets/images/logo.jpg"
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/css/stock.css";

export default function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={image} alt="logo" width="400" height="300" />
        <h2>Stock Market</h2>
        <p className="stock_intro">
          Welcome to the Stock Market Portal. You may click on stocks to view all the available companies or Quote
          to get the latest price information by stock symbol, or choose History to search sample from the most recent one hundred days
          of information for a particular stock.
          <p></p>
          <p>API: https://financialmodelingprep.com</p>
        </p>
      </header>
    </div>
  );
}

