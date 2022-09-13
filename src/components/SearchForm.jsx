
import React from "react";



// TODO : start from one search, then add the second search and other buttons
class SearchForm extends React.Component {
    
    state = {
        searchQuery: ''
    }
    
    handleInput = (event) => {
        this.setState({searchQuery: event.target.value});
    } // handleInput()

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted', this.state.searchQuery);

        this.props.notifyParent(this.state.searchQuery);
    }



    render(){

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleInput} placeholder="from" />
                <br /><br />
                <button>Search Flights</button>
                

            </form>
        );

    } // render()

} // class SearchForm

export default SearchForm;

