import React from "react";
import HistoryTable from "../component/historyTable";
import { useState, useEffect } from "react";


export default function History({ match }) {

    console.log(match);
    let data = match.params;

    return (
        <div>
            <h1>Stock History</h1>
            <p>
                Stocks history for last 100 days.
            </p>
            <p>selected symbol:{data.symbol} </p>
            <HistoryTable symbol={data.symbol} to={new Date()} />
        </div>
    );
}