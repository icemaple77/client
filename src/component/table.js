import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect } from "react";
import { Button, Badge } from "reactstrap";
import Search from "./search";
import { useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/stock.css";

export function Compare(rowData, searchKey, contents) {
  let result = [];
  for (let i = 0; i < rowData.length; ++i) {
    if (contents === "sector") {
      if (rowData[i].sector === searchKey) {
        result.push(rowData[i]);
      }
    }
    if (contents === "symbol") {
      if (rowData[i].symbol === searchKey) {
        result.push(rowData[i]);
      }
    }
  }
  return result;
}

export default function Table() {
  const [symbol, setSymbol] = useState("");
  const [sector, setSector] = useState("");
  const [rowData, setRowData] = useState([]);
  const history = useHistory();
  let finalData;
  const columns = [
    { headerName: "Symbol", field: "symbol" },
    { headerName: "Name", field: "name" },
    { headerName: "Sector", field: "sector" },
  ];
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
            name: stock.name,
            sector: stock.sector,
          };
        })
      )
      .then((stock) => setRowData(stock));
  }, []);

  if (symbol === "" && sector === "") {
    finalData = rowData;
  } else if (symbol !== "") {
    finalData = Compare(rowData, symbol, "symbol");
  } else if (sector !== "") {
    finalData = Compare(rowData, sector, "sector");
  }

  let titles = [];
  let industries = [];

  rowData.map(
    (stock) => (titles.push(stock.symbol), industries.push(stock.sector))
  );
  let industry = [...new Set(industries)];

  return (
    <div className="container">
      <h2>All Stocks</h2>
      <p>
        <Badge colour="success">{rowData.length}</Badge>
        Stocks published
      </p>
      <Row>
        <p style={{ marginRight: "2em" }}>Symbol Search:</p>
        <div style={{ marginRight: "2em" }}>
          <Search allTitles={titles} onSubmit={setSymbol} />
        </div>

        <p>Industry Search: &nbsp; </p>
        <Search allTitles={industry} onSubmit={setSector} />
      </Row>
      <p className="reminder">
        Please click the row to view the historical detail information about the
        stock!
      </p>

      <div
        className="ag-theme-balham"
        style={{
          height: "500px",
          width: "650px",
        }}
      >
        <AgGridReact
          columnDefs={columns}
          rowData={finalData}
          pagination={true}
          paginationPageSize={15}
          onRowClicked={(e) => {
            history.push(`/history/${e.data.symbol}`);
          }}
        />
      </div>
    </div>
  );
}
