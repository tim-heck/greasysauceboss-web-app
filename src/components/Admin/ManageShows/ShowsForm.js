import React, { Component } from 'react';
import { connect } from 'react-redux';

class ShowsForm extends Component {

    state = {
        date: '',
        location: '',
        ticket: false,
        ticket_url: ''
    }

    handleChangeFor = (event, propToChange) => {
        if (propToChange === 'ticket') {
            this.setState({
                ...this.state,
                [propToChange]: !this.state.ticket
            })
        } else {
            this.setState({
                ...this.state,
                [propToChange]: event.target.value
            })
        }
    }

    handleSubmit = (event, addOrEdit) => {
        event.preventDefault();
        if (addOrEdit === 'add') {
            this.props.dispatch({ type: 'ADD_SHOW', payload: this.state });
        } else {
            this.props.dispatch({ type: 'UPDATE_SHOW', payload: this.state });
        }
        this.props.dispatch({ type: 'EDIT_MODE', payload: { edit: false } });
    }

    checkEditMode = () => {
        if (this.props.reduxStore.editMode.edit) {
            return (
                <button type="submit" onClick={(event) => this.handleSubmit(event, 'edit')}>Update</button>
            );
        } else {
            return (
                <button type="submit" onClick={(event) => this.handleSubmit(event, 'add')}>Submit</button>
            );
        }
    }

    render() {
        console.log(this.state);
        return (
            <>
                <h2>Show Form</h2>
                <form>
                    <label>Show Date:</label>
                    <input type="text" value={this.state.date} onChange={(event) => this.handleChangeFor(event, 'date')} required />
                    <label>Location:</label>
                    <input type="text" value={this.state.location} onChange={(event) => this.handleChangeFor(event, 'location')} required />
                    <br/>
                    <label>Tickets?:</label>
                    <input type="checkbox" onChange={(event) => this.handleChangeFor(event, 'ticket')}/>
                    <label>Tickets URL:</label>
                    <input type="text" value={this.state.ticket_url} onChange={(event) => this.handleChangeFor(event, 'ticket_url')}/>
                    {this.checkEditMode()}
                </form>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(ShowsForm);