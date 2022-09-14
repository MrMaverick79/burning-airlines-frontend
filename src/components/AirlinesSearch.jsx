
import React from "react";
import SearchForm from "./SearchForm";

// import {Route, HashRouter as Router, Link} from 'react-router-dom';




class AirlinesSearch extends React.Component {
    
    // This method will be given as a prop to the child component
    searchAirline = (origin, destination) => {
        console.log('searchAirline orgin()', origin);
        console.log('searchAirline destination()', destination);
        // go to the url like /search/SYD/MEL
        this.props.history.push(`/search/${origin}/${destination}`);
    } // postAirline()


    render(){

        return (
            <div>

                <SearchForm notifyParent={this.searchAirline} />

            </div>
        );

    } // render()

} // class AirlinesSearch

export default AirlinesSearch


