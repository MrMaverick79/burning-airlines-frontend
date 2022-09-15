import axios from 'axios';
import React from 'react';
import '../App.css'


const RAILS_RESERVATIONS_BASE_URL = 'http://localhost:3000/reservations'

const RAILS_USER_BASE_URL = 'http://localhost:3000/find/'

class BookSeats extends React.Component {

    state = {
        flightNumber: null,
        flightId: 0,
        columnList: [], //hope to generate a column List
        rowSize: 0,  //this is the amount of rows to generate
        row: 0,
        column: '',
        user: 'Kris', 
        total_seats: null,
        user_id: 144, //hardcoded
        reservedSeats: {} 
    }

    //TODO - find user details from anopther axios request and setState for the user_id &&deal with the FlightId in the smae way. Are these in the AirlinesSearchResult parent?
    
    getCurrentReservations = () =>{
        const reserveObj = {} 
        
        console.log('The reservations on this flight are ', this.props.flightDetails.reservations);
        const reservations = this.props.flightDetails.reservations;
        console.log('Here is reservations array:', reservations);

        reservations.forEach( e =>{ 
            reserveObj[e.row] = e.column
        })
        console.log('The testObject is ', reserveObj);

        this.setState({
            reservedSeats:{...reserveObj}
        })
        
    }

    generateRowModel = () => {
        //this should take the rows, columns, or number of seats and generate a form??
        const alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]
        console.log('Seats ', this.props.airplane.total_seats); 
        const newArray = []
        console.log('Columns ', this.props.airplane.column); 
        console.log('Rows ', typeof parseInt(this.props.airplane.row)); 

        const rows = parseInt(this.props.airplane.row);

        // Add to the column list (Letters) by iterating and pushing (...) until you hit the this.props.airplane.column . updtateState
        for (let i = 0; i < alpha.length; i++) {
            const element = alpha[i];
            if (element != this.props.airplane.column){
               newArray.push(element)
               
                    
            } else{
                
                newArray.push(element);
                console.log(newArray);
                return newArray
            }
            this.setState({
                columnList: newArray,
                total_seats: this.props.airplane.total_seats, 
                rowSize: rows
            })
        }
        
               
        
        

    } //generate row Model

    generateSeatModel = () =>{
        let seatList= []
        for (let i = 1; i < this.state.rowSize +1; i++) {
            seatList.push(
            <div className='column_header'>
                <p>Row: {i}</p>
            </div>  )

            //test whether the row exists in rerved seats
            

            for (let j = 0; j < this.state.columnList.length; j++) {
                
                if(this.state.reservedSeats[i] === this.state.columnList[j]){
                    console.log('I have found a reserved seat', this.state.reservedSeats[i], 'and', this.state.columnList[j]);
                    seatList.push(

                        <label>Seat Reserved</label>
                    )
                } else {

                    seatList.push( 
                        <label> {this.state.columnList[j]} 
                          <input type="checkbox" row={i} col={this.state.columnList[j]}  onChange={this.handleClick}></input>
                         </label>
      
                       )
                    

                }

              
                
                
            }
            seatList.push(<br/> )
        }
        return seatList
        
    }

    getUserId = async() => {

        try{
            const nameRes = await axios.get(RAILS_USER_BASE_URL + this.state.user + '.json')
            console.log('The results for the user search were', nameRes.data);
            console.log('Here is the userID from  the user search:', nameRes.data.id);
            this.setState({
                user_id: nameRes.data.id
            }) 


        } catch (err){
            console.log('There has been an error trying to find this user', err);

        }


       

    }

    componentDidMount(){
       
        console.log('ComponentDidMount()');

        

        console.log('The new flightDetails props are ', this.props.flightDetails);

        this.setState({
            flightId: this.props.flightDetails.id,
           
        })
        
        this.getUserId()

        setTimeout(this.generateRowModel, 1000)
        
         //below. This runs when the page is loaded, so that you don't have tro wait for the setInterval to run 
         setTimeout(this.generateSeatModel, 2000)
         
         setTimeout(this.getCurrentReservations, 2000)


        //Poll the server every 2 seconds to get any secrets that were added to the server (form other users, for example) since the page last poll. 
        //This is the 'old school' way of checking whether the Server has been updated.
        // It requires the server to send all of the secrets each time.

        // setInterval(this.fetchSecrets, 2000) //this is now running every two seconds 

    }

    postReservation = async(  ) => {
        console.log('We are in post Reservation, trying to book ', this.state.row, this.state.column);
        console.log('We are in post Reservation, withFlightId ', this.props.flightDetails.id);
    
        try{
            
            const res = await axios.post(RAILS_RESERVATIONS_BASE_URL, {row: this.state.row, column: this.state.column, user_id: this.state.user_id, flight_id: this.props.flightDetails.id })
            console.log('Post response', res.data);

            
        } catch( err ) {
            console.log('There was an error when trying to post a reservation', err);
        }


    
    
    } //end postReservaion

    //Could just do an axios post here.
    handleClick = ( ev ) => {
        
        this.setState({
            //gets the Row and the Column from the boxes
            row: ev.target.attributes[1].nodeValue,
            column: ev.target.attributes[2].nodeValue
            
        })
    }

    handleCol = ( ev ) => {
        this.setState({column: ev.target.value})
    }

    handleSubmit = ( ev ) => {
        ev.preventDefault() //stops page from reloading
        console.log('Form submitted with: ',this.state.row, this.state.column)
        //Book a seat in the backend
        this.postReservation()

        // for confirmation page
        this.props.notifyParentFlight()
    }

    //this comonent will send a request to the server to make a reservation
    


    render(){

       
        
        
        return(

        <div className="chooseSeat">
            

            <h2>Hi {this.state.user}! Please choose your seat</h2>

                <form onSubmit= {this.handleSubmit }>
                <div className="seats">
                    <this.generateSeatModel/>
                    {/* I'll put two fields here and change this later */}
                    {/* <label >Select your row:
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
                    </label> */}

                                              
                 
                    <button>Submit</button>
                 </div>       
                </form>

        </div>

        )


    }


}; 

export default BookSeats 