import axios from 'axios';
import React from 'react';

const RAILS_RESERVATIONS_BASE_URL = 'http://localhost:3000/reservations/'

class BookSeats extends React.Component {

    state = {
        flightNumber: null,
        row: null,
        column: null,
        user: null 
    }

    postReservation = async( row, col ) => {
        console.log('We are in post Reservation, trying to book ', row, col);
    
        try{
            const res = await axios.post(RAILS_RESERVATIONS_BASE_URL, {row: row, column: col, user_id: 95, flight_id: 79 })
            console.log('Post response', res.data);

            //setState here to show reservation?
        } catch( err ) {
            console.log('There was an error when trying to post a reservation', err);
        }


    
    
    } //end postReservaion

    //Could just do an axios post here.
    handleRow = ( ev ) => {
        this.setState({row: ev.target.value})
    }

    handleCol = ( ev ) => {
        this.setState({column: ev.target.value})
    }

    handleSubmit = ( ev ) => {
        ev.preventDefault() //stops page from reloading
        console.log('Form submitted with: ',this.state.row, this.state.column)
        this.postReservation( this.state.row, this.state.column)
    }

    //this comonent will send a request to the server to make a reservation

    render(){

        return(

        <div className="chooseSeat">

            <h2>Choose your seat</h2>

                <form onSubmit= {this.handleSubmit }>

                    {/* I'll put two fields here and change this later */}
                    <input type="text" name='column' placeholder='column(A-E)' onChange={this.handleCol}/>
                    <input type="text" name='row' placeholder='row(#)'onChange={this.handleRow}/>
                    <button>Submit</button>

                </form>

        </div>

        )


    }


}; 

export default BookSeats 