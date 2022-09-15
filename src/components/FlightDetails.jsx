
import axios from "axios";
import React from "react";
import BookSeats from './BookSeats'
// import ReserveDone from "./ReserveDone";

const RAILS_FLIGHT_BASE_URL = 'http://localhost:3000/flights/'

class FlightDetails extends React.Component {

    state ={
        loading: false,
        flightNumber: "",
        flightDetails: {}
    }

    
    

    componentDidMount() {
        //Grab all the flight details on page load
        console.log('Component did mount() - FlightDetails');

        console.log('this.props on the FlightDetails Page:' , this.props.match.params.queryFlight);

        
        this.setState({
            
            flightNumber: this.props.match.params.queryFlight})

        this.getFlightDetails(this.props.match.params.queryFlight)
        

    }

    getFlightDetails = async(flightNumber) => {
        console.log('We are now requesting flight details for flight#', flightNumber);

        try{ 
            const res = await axios.get(RAILS_FLIGHT_BASE_URL + flightNumber +'.json')
            console.log('Get response', res.data);
            this.setState({
                flightDetails: res.data})

        } catch (err ) {
            console.log('There was an error when trying to find these flight details', err)
        }

    } 

    // for confirmation page
    bookDone = () => {
        this.props.history.push(`/done`)
    }

    
    
   
    render(){



        return (
        <div className="flightContainer">
           
           <p>Flight # { this.state.flightNumber } on  {this.state.flightDetails.date} from {this.state.flightDetails.origin } to {this.state.flightDetails.destination}  </p>


           {/* notifyParentFlight is for confirmation page 
           
           airplane prop allow us to pass props to the seat booker

           some duplication below with flightDetails and airplane 
           
           */}
                <p>Book your seat here</p>
                <BookSeats airplane={this.state.flightDetails.airplane } 
                flightDetails ={this.state.flightDetails} notifyParentFlight={this.bookDone}/>

               
        </div>
        );

    } //render()

};

export default FlightDetails

