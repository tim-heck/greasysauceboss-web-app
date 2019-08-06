import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowsPage extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_SHOWS'});
    }

    checkTickets = (show) => {
        if (show.ticket) {
            return (
                <a href={show.ticket_url}>Tickets</a>
            );
        }
    }

    render() {
        return (
            <>
                <h2>Upcoming Shows</h2>
                <ul>
                    {this.props.reduxStore.shows.map(item =>
                        <li key={item.id}>
                            <h3>{item.show_date}</h3>
                            <p>{item.location}</p>
                            {this.checkTickets(item)}
                        </li>
                    )}
                </ul>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(ShowsPage);