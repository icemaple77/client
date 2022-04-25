import React from "react";
import HistoryTable from "../component/historyTable";
import { useState,useEffect} from "react";
import HistorySearch from "../component/historySearch";
import "../assets/css/stock.css";
export default function HistoryStock({match}) {

    console.log(match);
    let data = match.params;
    return (
    <div className="custom">
        
    <HistorySearch/>
    <HistoryTable symbol={data.symbol} to={data.from} page="hs"/>
    </div>
    );
   }