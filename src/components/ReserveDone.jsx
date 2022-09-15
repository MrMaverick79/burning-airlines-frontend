
import React from "react";
import axios from "axios";

const RAILS_RESERVATION_LAST_URL = 'http://localhost:3000/reservations/lastreservation.json'

class ReserveDone extends React.Component {

    state = {
        row: "",
        column: "",
        user: {},
        flight: {},
        loading: true,
        error: null
    }

    componentDidMount(){
        // console.log('ReserveDone Componentdidmount', this.props)
        // wait the data to load
        setTimeout(this.getReserveFlight, 50)
    }

    getReserveFlight = async() => {

        try {
            const res = await axios.get (RAILS_RESERVATION_LAST_URL);
            console.log('POST response ReserveDone', res.data);

            this.setState({
                row: res.data.row,
                column: res.data.column,
                user: res.data.user,
                flight: res.data.flight,
                loading: false
            })

            console.log(res.data.user)


        } catch (err) {
            console.log('There was an error when trying to find these flight details', err)
        }

    }
    
    
    
    
    
    render(){

        return (
            <div>
                <p>Congratulations! You booked the ticket successfully!</p>
                <p>Please confirm your details</p>

                <p><strong>Name: </strong> {this.state.user.name}</p>

                <p><strong>Email: </strong>  {this.state.user.email}</p>

                <p><strong>Date: </strong> {this.state.flight.date}</p>
                <p><strong>Fly From: </strong> {this.state.flight.origin}</p>
                <p><strong>Fly To: </strong> {this.state.flight.destination}</p>

                <p><strong>Flight Number: </strong> {this.state.flight.flight_number}</p>
                <p><strong>Row: </strong> {this.state.row}</p>
                <p><strong>Column: </strong> {this.state.column}</p>



            </div>
        );
    } // render()
};

export default ReserveDone

