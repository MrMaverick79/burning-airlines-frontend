
import React from "react";
import BookSeats from './BookSeats'

class FlightDetails extends React.Component {



    
    render(){

        return (
        <div className="container">
            <p> Flight details (#, date, etc)</p>

                <p>Book your seat here</p>
                <BookSeats />

               
        </div>
        )


    }

};

export default FlightDetails

