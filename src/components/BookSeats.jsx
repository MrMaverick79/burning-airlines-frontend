import axios from 'axios';
import React from 'react';

const RAILS_RESERVATIONS_BASE_URL = 'http://localhost:3000/reservations/'

class BookSeats extends React.Component {

    state = {
        flightNumber: null,
        columnList: ["A", "B", "C", "D", 'E'], //hope to generate a row List
        rowList: [1,2,3,4,5,6,7,8,9,10], //hope to generate a column list
        row: null,
        column: null,
        user: null, 
        total_seats: null,
        user_id: null 
    }

    componentDidMount(){
        //We want to load the list of Secrets from the backend as soon as the frontent loads,
        //so our AJAX request 
        //should be initiated from componentDidMount()
        console.log('ComponentDidMount()');
        
         //below. This runs when the page is loaded, so that you don't have tro wait for the setInterval to run 
        
        

         //A seperate axios request for 

        //Poll the server every 2 seconds to get any secrets that were added to the server (form other users, for example) since the page last poll. 
        //This is the 'old school' way of checking whether the Server has been updated.
        // It requires the server to send all of the secrets each time.

        // setInterval(this.fetchSecrets, 2000) //this is now running every two seconds 

    }

    postReservation = async( row, col ) => {
        console.log('We are in post Reservation, trying to book ', row, col);
    
        try{
            const res = await axios.post(RAILS_RESERVATIONS_BASE_URL, {row: row, column: col, user_id: 105, flight_id: 89 })
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

        
        
        const rowLength = this.state.rowList.length;
        return(

        <div className="chooseSeat">

            <h2>Choose your seat</h2>

                <form onSubmit= {this.handleSubmit }>

                    {/* I'll put two fields here and change this later */}
                    <label >Select your row:
                        <select value={this.state.row} onChange={this.handleRow}>     
                            {this.state.rowList.map((row, i)=> {
                                return <option key={i} value={row} >{row}</option>
                            })}
                        </select>
                    </label>

                    <label >Select your column:
                        <select value={this.state.column} onChange={this.handleCol}>  
                        {this.state.columnList.map((col, i)=> {
                                return <option key={i} value={col} >{col}</option>
                            })}          
                            
                        </select>
                    </label>

                                              
                 
                    <button>Submit</button>

                </form>

        </div>

        )


    }


}; 

export default BookSeats 