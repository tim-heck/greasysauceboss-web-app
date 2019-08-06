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

    handleSubmit = () => {
        this.props.dispatch({type: 'ADD_SHOW', payload: this.state});
    }

    render() {
        console.log(this.state);
        return (
            <>
                <h2>Show Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Show Date:</label>
                    <input type="text" value={this.state.date} onChange={(event) => this.handleChangeFor(event, 'date')} required />
                    <label>Location:</label>
                    <input type="text" value={this.state.location} onChange={(event) => this.handleChangeFor(event, 'location')} required />
                    <br/>
                    <label>Tickets?:</label>
                    <input type="checkbox" onChange={(event) => this.handleChangeFor(event, 'ticket')}/>
                    <label>Tickets URL:</label>
                    <input type="text" value={this.state.ticket_url} onChange={(event) => this.handleChangeFor(event, 'ticket_url')}/>
                    <button type="submit">Submit</button>
                </form>
            </>
        );
    }
}

export default connect()(ShowsForm);