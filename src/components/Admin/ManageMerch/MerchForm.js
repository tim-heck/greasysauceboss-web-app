import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchForm extends Component {

    state = {
        title: '',
        description: '',
        price_pennies: 0,
        image_url: ''
    }

    handleChangeFor = (event, propToChange) => {
        this.setState({
            ...this.state,
            [propToChange]: event.target.value
        })
    }

    render() {
        console.log(this.state);
        return (
            <>
                <h2>Merch Form</h2>
                <form onSubmit={this.handleSubmit}>
                    <label>Title:</label>
                    <input type="text" value={this.state.title} onChange={(event) => this.handleChangeFor(event, 'title')} required />
                    <br />
                    <label>Description:</label>
                    <textarea type="text" value={this.state.description} onChange={(event) => this.handleChangeFor(event, 'description')} required ></textarea>
                    <br />
                    <label>Price (in pennies):</label>
                    <input type="number" value={this.state.price_pennies} onChange={(event) => this.handleChangeFor(event, 'price_pennies')} required />
                    <label>Local Image URL:</label>
                    <input type="text" value={this.state.image_url} onChange={(event) => this.handleChangeFor(event, 'image_url')} required />
                </form>
            </>
        );
    }
}

export default connect()(MerchForm);