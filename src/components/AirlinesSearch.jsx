
import React from "react";
import SearchForm from "./SearchForm";

// import {Route, HashRouter as Router, Link} from 'react-router-dom';




class AirlinesSearch extends React.Component {
    
    // This method will be given as a prop to the child component
    // TODO: just trail version, need to change variables
    searchAirline = (text) => {
        console.log('postAirline()', text);
        this.props.history.push(`/search/${text}`);
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


