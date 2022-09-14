
import React from "react";



// TODO : start from one search, then add the second search and other buttons
class SearchForm extends React.Component {
    
    state = {
        searchQueryOrigin: '',
        searchQueryDestination: ''
    }
    
    handleInputOrigin = (event) => {
        this.setState({searchQueryOrigin: event.target.value.toUpperCase()});
    } // handleInput()

    handleInputDestination = (event) => {
        this.setState({searchQueryDestination: event.target.value.toUpperCase()});
    } // handleInput()

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form submitted Origin', this.state.searchQueryOrigin);
        console.log('Form submitted Destination', this.state.searchQueryDestination);

        this.props.notifyParent(this.state.searchQueryOrigin, this.state.searchQueryDestination);
    }



    render(){

        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" onChange={this.handleInputOrigin} placeholder="from" />
                <br />
                <input type="text" onChange={this.handleInputDestination} placeholder="to" />
                <br /><br />
                <button>Search Flights</button>
            </form>
        );

    } // render()

} // class SearchForm

export default SearchForm;

