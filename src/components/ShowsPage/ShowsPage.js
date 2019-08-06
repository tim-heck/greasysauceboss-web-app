import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowsPage extends Component {

    checkTickets = (show) => {
        if (show.ticket) {
            <a href={show.ticket_url}>Tickets</a>
        }
    }

    render() {
        return (
            <>
                <h2>Upcoming Shows</h2>
                <ul>
                    {this.props.reduxStore.showsReducer.map(item =>
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
})

export default connect(stateToProps)(ShowsPage);