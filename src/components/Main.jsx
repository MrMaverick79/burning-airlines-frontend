
import React from "react";
import '../App.css';
import {Route, HashRouter as Router, Link} from 'react-router-dom';

import Home from "./Home";
import AirlinesSearch from "./AirlinesSearch";
import AirlinesSearchResults from "./AirlinesSearchResults";
// import BookSeats from "./BookSeats";

import FlightDetails from "./FlightDetails";
import ReserveDone from "./ReserveDone"




class Main extends React.Component {

    render(){

        return (
            <div className="App">
                <Router>

                    <header>
                        <h1>B U R N I N G Airlines</h1>
                        <nav>
                            <Link to="/">Home</Link>
                            {' '}|{' '}
                            <Link to="/search">Search</Link>
                    
                        </nav>
                        <hr />

                    </header>

                    <Route exact path="/" component={Home} />
                    <Route exact path="/search" component={AirlinesSearch} />
                    <Route exact path="/search/:queryOrigin/:queryDestination" component={AirlinesSearchResults} />
                    <Route exact path="/flights/:queryFlight" component={ FlightDetails } />
                    <Route exact path="/done" component={ ReserveDone } />                    

                </Router>

            </div>
        );

    } // render()

} // class Main

export default Main
