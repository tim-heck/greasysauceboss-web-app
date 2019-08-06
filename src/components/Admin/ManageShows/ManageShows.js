import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageShows extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SHOWS' });
    }

    handleClick = (showToModify, dispatchType) => {
        if (dispatchType === 'edit') {
            this.props.history.push('/shows-form');
        } else {
            this.props.dispatch({ type: 'DELETE_SHOW', payload: showToModify })
        }
    }

    render() {
        return (
            <>
                <h2>Manage Shows</h2>
                <ul>
                    {this.props.reduxStore.shows.map(item => 
                        <li key={item.id}>
                            <h3>{item.show_date}</h3>
                            <p>{item.location}</p>
                            <button onClick={() => this.handleClick(item, 'edit')}>Edit</button>
                            <button onClick={() => this.handleClick(item, 'delete')}>Delete</button>
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

export default connect(stateToProps)(ManageShows);