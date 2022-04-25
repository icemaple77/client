import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { useState, useEffect } from "react";
import { Button, Badge } from "reactstrap";
import Chart from "./chart";
import { useHistory } from "react-router-dom";


export default function HistoryTable(props) {
    const [rowData, setRowData] = useState([]);
    const history = useHistory();
    const columns =
        [
            { headerName: "Date", field: "date" },
            { headerName: "Open", field: "open" },
            { headerName: "High", field: "high" },
            { headerName: "Low", field: "low" },
            { headerName: "Close", field: "close" },
            { headerName: "Volumes", field: "volume" }
        ]

    let to = newDateFormat(props.to);
    console.log(to);
    let tmp = newDateFormat(new Date());
    let url = "";
    const API_KEY="eb6d9149d9e4183108ab835be6a1bfac";

    if (props.page === "hs") {

        url = `https://financialmodelingprep.com/api/v3/historical-price-full/${props.symbol}?from=${to}&to=${newDateFormat(new Date)}&apikey=${API_KEY}`

    } else {
        url = `https://financialmodelingprep.com/api/v3/historical-price-full/${props.symbol}?timeseries=100&apikey=${API_KEY}`
    }

    console.log(url);
    useEffect(() => {
        fetch(url)
            .catch(error => console.log(error))
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length > 1) {
                    console.log(Object.keys(data).length)
                    data.historical.map(stock => {
                        return {
                            date: stock.date,
                            open: stock.open,
                            high: stock.high,
                            low: stock.low,
                            close: stock.close,
                            volume: stock.volume
                        };
                    })
                    setRowData(data.historical)
                } else {
                    setRowData("")
                }
            }
            )
    }, [props]);
    console.log(rowData);

    if (rowData===""){
        return(<p>The selected date is invalid, please pick anther valid date.</p>)
    }else{

    return (
        <div className="container">
            <div
                className="ag-theme-balham"
                style={{
                    height: "500px",
                    width: "1200px"
                }}
            >
                <AgGridReact

                    columnDefs={columns}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={15}


                />
                <Chart data={rowData} />
            </div>
        </div>
    );
}}

export function newDateFormat(date) {
    var newDate = new Date(date),
        month = '' + (newDate.getMonth() + 1),
        day = '' + (newDate.getDate()),
        year = newDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}