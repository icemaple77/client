import React from "react";
import Home from "../pages/home"
import History from "../pages/history"
import Stock from "../pages/stock"
import Quote from "../pages/quote"
import HistorySearch from "./historySearch"
import HistoryStock from "../pages/historyStock"
import { Navbar, NavItem } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

const activeStyle = {
    fontWeight: "bold",
    color: "white"
};

export default function Navi() {
    return (
        <Router>
            <div>

                <Navbar bg="light" variant="dark" expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <NavItem>   <Link className="nav-link" exact to="/" activeStyle={activeStyle}>Home</Link> </NavItem>
                        <NavItem>   <Link className="nav-link" exact to="/stock" activeStyle={activeStyle}>Stock</Link> </NavItem>
                        <NavItem>   <Link className="nav-link" exact to="/quote" activeStyle={activeStyle}>Quote</Link> </NavItem>
                        <NavItem>   <Link className="nav-link" exact to="/history" activeStyle={activeStyle}>History</Link> </NavItem>
                    </Navbar.Collapse>

                </Navbar>


                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/stock">
                        <Stock />
                    </Route>
                    <Route path="/quote">
                        <Quote />
                    </Route>
                    <Route exact path="/history">
                        <HistorySearch />
                    </Route>
                    <Route exact path="/history/:symbol" component={History} />
                    <Route exact path="/history/:symbol/:from" component={HistoryStock} />

                </Switch>
            </div>
        </Router>
    );
}



