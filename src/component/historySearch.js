import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Search from "./search";
import { Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../assets/css/stock.css";

export default function HistorySearch() {
  const [symbol, setSymbol] = useState("");
  const [rowData, setRowData] = useState([]);
  const [to, setTo] = useState(new Date());
  const history = useHistory();

  let onClickHandler = (event) => {
    history.push(`/history/${symbol}/${to}`);
  };

  let titles = [];
  const API_KEY = "eb6d9149d9e4183108ab835be6a1bfac";

  useEffect(() => {
    fetch(
      `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${API_KEY}`
    )
      .then((res) => res.json())

      .then((data) =>
        data.map((stock) => {
          return {
            symbol: stock.symbol,
          };
        })
      )
      .then((stock) => setRowData(stock));
  }, []);

  rowData.map((stock) => titles.push(stock.symbol));

  return (
    <div className="container">
      <h1>Stock History</h1>
      <p></p>

      <Row>
        <p>Symbol Search:data good</p>
        <Search allTitles={titles} onSubmit={setSymbol} />
        <DatePicker selected={to} onChange={(date) => setTo(date)} />
        <Button onClick={onClickHandler}>Search Date</Button>
      </Row>
    </div>
  );
}
