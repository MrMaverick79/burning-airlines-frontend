
import React from "react";
// import FlightDetails from "./FlightDetails";

import axios from "axios";
import {Route, HashRouter as Router, Link} from 'react-router-dom';

// flights.json url
const AIRLINE_FLIGHT_URL = 'http://localhost:3000/flights.json';

function DesiredFlightResults(props){
    return (
        <li>
            <strong>Date: </strong>{props.info.date}
            <br />
            <strong>Flight: </strong>
            <Link to={"/flights/" + props.info.flight_number}>{props.info.flight_number}</Link>
            <br />
            <strong>From: </strong>{props.info.origin}
            <br />
            <strong>To: </strong>{props.info.destination}
            <br /><br />
            {/* <strong>Plane</strong>{props.info.origin} */}
        </li>
    )
}

class AirlinesSearchResults extends React.Component {

    state = {
        origin: [],
        destination: [],
        desiredFlights: [],
        loading: true,
        error: null
    }

    searchAirlineResult = async (originData, destinationData) => {
        console.log('searchAirlineResult origin()', originData);
        console.log('searchAirlineResult destination()', destinationData);

        try {
            const res =  await axios.get(AIRLINE_FLIGHT_URL);
            console.log('POST response', res.data);

            // decide if the database has that flight
            const desiredFlightsData = [];
            for (let i = 0; i < res.data.length; i++){
                if ((res.data)[i].origin === originData && (res.data)[i].destination === destinationData){
                    desiredFlightsData.push(res.data[i]);
                } else {
                    this.setState({loading: false}) 
                    // return <p>Sorry, we don't have this line recently</p>;
                }
            }
            
            // console.log('desiredFlight', desiredFlightsData)
            // console.log('desiredFlight', desiredFlightsData[0].flight_number)

            // if no matching airline
            // if(desiredFlightsData.length === 0){
            //     return <p>Sorry, we don't have this line recently</p>;
            // }

            this.setState({
                origin: originData,
                destination: destinationData,
                desiredFlights: desiredFlightsData,
                loading: false
            });



        } catch(err){
            console.error('Error saving your desired flight to backend', err)
            this.setState({error: err});
        }
    
    } // searchAirlineResult()
    
    


    componentDidMount() {
        console.log('componentDidMount');
        this.searchAirlineResult(this.props.match.params.queryOrigin, this.props.match.params.queryDestination);
    } // componentDidMount()


    render(){

        // early return when there is an error
        if(this.state.error !== null){
            return <p>Sorry, there was an error loading your results. Try again.</p>;
        }

        if(this.state.desiredFlights.length === 0 && this.state.loading === false ){
            return <p>Sorry, we don't have this line recently</p>;
        }

        return (
            <div>
                    <h3>Flight Search Results</h3>
                    <h3>Start from {this.props.match.params.queryOrigin}</h3>
                    <h3>Arrive to {this.props.match.params.queryDestination}</h3>

                    {
                        this.state.loading
                        ?
                        <p>Loading flights...</p>
                        :
                        <ul>
                            {this.state.desiredFlights.map(s => <DesiredFlightResults key={s.id} info={s} />)}
                        </ul>
                    }

            </div>
        );

    } // render()

} // class AirlinesSearchResults

export default AirlinesSearchResults;


