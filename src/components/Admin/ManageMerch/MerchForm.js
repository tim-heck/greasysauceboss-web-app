import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchForm extends Component {

    state = {
        title: '',
        description: '',
        price_pennies: 0,
        image_url: ''
    }

    componentDidMount() {
        if (this.props.reduxStore.editMode.edit) {
            this.setState({
                id: this.props.reduxStore.merch.editMerchReducer.id,
                title: this.props.reduxStore.merch.editMerchReducer.title,
                description: this.props.reduxStore.merch.editMerchReducer.description,
                price_pennies: this.props.reduxStore.merch.editMerchReducer.price_pennies,
                image_url: this.props.reduxStore.merch.editMerchReducer.image_url
            })
        }
    }

    handleChangeFor = (event, propToChange) => {
        this.setState({
            ...this.state,
            [propToChange]: event.target.value
        })
    }

    handleSubmit = (event, addOrEdit) => {
        event.preventDefault();
        if (addOrEdit === 'add') {
            this.props.dispatch({ type: 'ADD_PRODUCT', payload: this.state });
            this.props.history.push('/manage-merch');
        } else {
            this.props.dispatch({ type: 'UPDATE_PRODUCT', payload: this.state });
            this.props.history.push('/manage-merch');
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
        return (
            <>
                <h2>Merch Form</h2>
                <form>
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
                    {this.checkEditMode()}
                </form>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(MerchForm);