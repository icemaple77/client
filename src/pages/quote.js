import React from "react";
import { useState,useEffect} from "react";
import Search from "../component/search"
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Quote() {
    const [symbol, setSymbol] = useState("");
    const [rowData, setRowData] = useState([]);
    const {loading ,quote, error} = useSymbol(symbol);

    let titles = [];
    
    const columns =
    [
        { headerName: "Symbol", field: "symbol" },
        { headerName: "Price", field: "price" },
        { headerName: "Daylow", field: "dayLow" },
        { headerName: "DayHigh", field: "dayHigh" },
        { headerName: "Volume", field: "volume" },
        { headerName: "Previousclose", field: "previousClose" }
    ]
    
    
    useEffect(() => {
        fetch("https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=c748883a8230d19c778dcce9d71ec69d")
            .then(res => res.json())
            .then(data =>
                data.map(stock => {
                    return {
                        symbol: stock.symbol
                    };
                })
            )
            .then(stock => setRowData(stock));
    }, []);

    
    rowData.map((stock) => (
        titles.push(stock.symbol)
    ));

    return (
        <div className="container">
        <h1>Stock Quotes</h1>
        
    <Row>
    <p>Symbol Search:</p>
    <Search
            allTitles={titles}
            onSubmit={setSymbol} />

    </Row>
       
        <div
            className="ag-theme-balham"
            style={{
                height: "200px",
                width: "1200px"
            }}
        >
            <AgGridReact

                columnDefs={columns}
                rowData={quote}
                pagination={true}
                paginationPageSize={15}

            />
        </div>
    </div>
    );
   }

function useSymbol(symbol) {
    const [loading, setLoading] = useState(true);
    const [quote, setQuoteData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                setQuoteData(await getQuote(symbol));
                setLoading(false);
            } catch (err) {
                setError(error);
                setLoading(false);
            }
        })();
    }, [symbol]);
    return {
        loading,
        quote,
        error: null
    };
}


async function getQuote(symbol) {
    if (symbol !== "") {
        const url = `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=c748883a8230d19c778dcce9d71ec69d`;       
        let res = await fetch(url);
        let data = await res.json();

        return data.map((quote) => ({
            symbol: quote.symbol,
            price: quote.price,
            dayHigh: quote.dayHigh,
            dayLow: quote.dayLow,
            volume: quote.volume,
            previousClose: quote.previousClose,
        }));
    }else{
        return ""
    }
  
}
      