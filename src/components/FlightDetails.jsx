
import React from "react";
import BookSeats from './BookSeats'

import axios from "axios";

const AIRLINE_FLIGHT_URL = 'http://localhost:3000/flights.json';

class FlightDetails extends React.Component {

    state = {
        flightsDetails: [],
        loading: true,
        error: null
    }

    AirlineResultDetails = async (flightNumber) => {

        console.log('AirlineResultDetails()', flightNumber);

        try {
            const res = await axios.get(AIRLINE_FLIGHT_URL);
            console.log('POST response FlightDetails', res.data)

            const FlightsDetailsData = []
            for (let i = 0; i < res.data.length; i++){
                if ((res.data)[i].flight_number === parseInt(flightNumber)){
                    FlightsDetailsData.push((res.data)[i]);
                    // FlightsDetailsData=(res.data)[i];
                }
            }

            console.log('FlightsDetailsData()', FlightsDetailsData);

            this.setState({
                flightsDetails: FlightsDetailsData[0],
                loading: false
            })

        } catch(err){
            console.error('Error saving your desired flight to backend', err)
            this.setState({error: err});
        }
        
    } // AirlineResultDetails()


    componentDidMount() {
        console.log('componentDidMount');
        this.AirlineResultDetails(this.props.match.params.queryFlight);
    }
    








    render(){

        // early return when there is an error
        if(this.state.error !== null){
            return <p>Sorry, there was an error loading your results. Try again.</p>;
        }

        return (
        <div className="flightContainer">
            <p> Flight details</p>
            <p> {this.state.flightsDetails.date}</p>









                <p>Book your seat here</p>
                <BookSeats />

               
        </div>
        );

    } //render()

};

export default FlightDetails

