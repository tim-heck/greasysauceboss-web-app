import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageShows extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SHOWS' });
    }

    handleClick = (dispatchType, showToModify) => {
        if (dispatchType === 'add') {
            this.props.history.push('/shows-form');
        } else if (dispatchType === 'edit') {
            this.props.dispatch({ type: 'EDIT_SHOW', payload: showToModify });
            // this.props.dispatch({ type: 'EDIT_MODE', payload: {edit: true} });
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
                    {this.props.reduxStore.shows.showsReducer.map(item => 
                        <li key={item.id}>
                            <h3>{item.show_date}</h3>
                            <p>{item.location}</p>
                            <button onClick={() => this.handleClick('edit', item)}>Edit</button>
                            <button onClick={() => this.handleClick('delete', item)}>Delete</button>
                        </li>
                    )}
                </ul>
                <button onClick={() => this.handleClick('add')}>Add New Show</button>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(ManageShows);