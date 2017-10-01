import React, { Component } from 'react'; // means const Component = React.Component;

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
        // return <input onChange={this.onInputChange} />;
        return (
            <div className="search-bar">
                <input
                    value={this.state.term}
                    onChange={(event) => this.onInputChange(event.target.value)}
                />
            </div>
        );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }

}

export default SearchBar;
