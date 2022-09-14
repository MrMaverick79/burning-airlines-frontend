
import React from "react";
import '../App.css';

import Home from "./Home";
import AirlinesSearch from "./AirlinesSearch";

import {Route, HashRouter as Router, Link} from 'react-router-dom';
import AirlinesSearchResults from "./AirlinesSearchResults";

class Main extends React.Component {

    render(){

        return (
            <div className="App">
                <Router>

                    <header>
                        <h1>Virgin Airlines</h1>
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
                    <Route exact path="/flights/:query" component={ FlightDetails } />

                </Router>
            </div>
        );

    } // render()

} // class Main

export default Main
