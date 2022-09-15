
import React from "react";

class ReserveDone extends React.Component {

    componentDidMount(){
        console.log('ReserveDone Componentdidmount', this.props)
    }
    
    
    
    
    
    render(){

        return (
            <div>
                Congratulations! You booked the ticket successfully!

                some flight details ....
            </div>
        );
    } // render()
};

export default ReserveDone

