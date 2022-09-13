
import React from "react";

import axios from "axios";

// TODO: just trail version, need to change
const AIRLINE_FLIGHT_URL = 'http://localhost:3000/secrets';

function DesiredFlightResults(props){
    return (
        <li>
            <strong>{props.info.content}</strong>
            <br />
            <em>Posted: {props.info.created_at}</em>
        </li>
    )
}

class AirlinesSearchResults extends React.Component {

    state = {
        resultFlights: [],
        loading: true,
        error: null
    }

    searchAirlineResult = async (text) => {
        console.log('postAirline()', text);

        try {
            const res =  await axios.get(AIRLINE_FLIGHT_URL);
            console.log('POST response', res.data);

            // decide if the database has that flight
            const desiredFlights = [];
            for (let i = 0; i < res.data.length; i++){
                if ((res.data)[i].content.includes(text)){
                    desiredFlights.push(res.data[i]);
                }
            }

            // if type the place not exist, return Sorry, there was an error loading your results.
            if(desiredFlights.length === 0){
                return this.setState({error: 1});
            }

            this.setState({
                resultFlights: desiredFlights,
                loading: false
            });



        } catch(err){
            console.error('Error saving your desired flight to backend', err)
            this.setState({error: err});
        }
    
    } // postAirline()
    
    


    componentDidMount() {
        console.log('componentDidMount');
        this.searchAirlineResult(this.props.match.params.query);
    } // componentDidMount()

    render(){

        // early return when there is an error
        if(this.state.error !== null){
            return <p>Sorry, there was an error loading your results. Try again.</p>;
        }

        return (
            <div>
                <h3>Results of start from {this.props.match.params.query}</h3>

                {
                    this.state.loading
                    ?
                    <p>Loading flights...</p>
                    :
                    <ul>
                        {this.state.resultFlights.map(s => <DesiredFlightResults key={s.id} info={s} />)}
                    </ul>
                }

            </div>
        );

    } // render()

} // class AirlinesSearchResults

export default AirlinesSearchResults;


