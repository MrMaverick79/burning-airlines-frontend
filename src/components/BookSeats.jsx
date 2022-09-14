

import React from 'react';

class BookSeats extends React.Component {

    // state = {
    //     flightNumber: null,
    //     row: null,
    //     column: null,
    //     user: null 
    // }

    // handleSubmit = ( ev ) => {
    //     ev.preventDefault() //stops page from reloading
    //     console.log('Form submitted with: ')
    // }

    //this comonent will send a request to the server to make a reservation

    render(){

        return(

        <div className="chooseSeat">

            {/* <h2>Choose your seat</h2>

                <form onSubmit= {this.handleSubmit }>

                    I'll put two fields here and change this later
                    <input type="text" name='column' placeholder='column(A-E)'/>
                    <input type="text" name='row' placeholder='row(#)'/>
                    <button>Submit</button>

                </form> */}

        </div>

        )


    }


}; 

export default BookSeats 