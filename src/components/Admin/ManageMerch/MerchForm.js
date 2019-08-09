import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import $ from 'jquery';

class MerchForm extends Component {

    state = {
        title: '',
        description: '',
        price_pennies: 0,
        image_url: '',
        selectedFile: null,
        selectedFiles: null
    }

    componentDidMount() {
        if (this.props.reduxStore.editMode.edit) {
            this.setState({
                ...this.state,
                id: this.props.reduxStore.merch.editMerchReducer.id,
                title: this.props.reduxStore.merch.editMerchReducer.title,
                description: this.props.reduxStore.merch.editMerchReducer.description,
                price_pennies: this.props.reduxStore.merch.editMerchReducer.price_pennies,
                image_url: this.props.reduxStore.merch.editMerchReducer.image_url
            })
        }
    }

    singleFileChangedHandler = (event) => {
        this.setState({
            ...this.state,
            selectedFile: event.target.files[0]
        });
    };

    singleFileUploadHandler = () => {
        const data = new FormData();
        // If file selected
        if (this.state.selectedFile) {
            data.append('merchImage', this.state.selectedFile, this.state.selectedFile.name);
            this.props.dispatch({ type: 'UPLOAD_SINGLE', payload: data })
        } else {
            // if file not selected throw error
            alert('Please upload file');
        }
    };

    multipleFileUploadHandler = () => {
        const data = new FormData();
        let selectedFiles = this.state.selectedFiles;
        // If file selected
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
            }
            this.props.dispatch({ type: 'UPLOAD_MULTIPLE', payload: data })
        } else {
            // if file not selected throw error
            alert('Please upload file');
        }
    };

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
        console.log(this.state);
        return (

            <>
                <h2>Merch Form</h2>
                <form>
                    <label>Local Image URL:</label>
                    <input type="file" onChange={this.singleFileChangedHandler} />
                    <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload</button>
                </form>
                <form>
                    <label>Title:</label>
                    <input type="text" value={this.state.title} onChange={(event) => this.handleChangeFor(event, 'title')} required />
                    <br />
                    <label>Description:</label>
                    <textarea type="text" value={this.state.description} onChange={(event) => this.handleChangeFor(event, 'description')} required ></textarea>
                    <br />
                    <label>Price (in pennies):</label>
                    <input type="number" value={this.state.price_pennies} onChange={(event) => this.handleChangeFor(event, 'price_pennies')} required />
                    <br />
                    {/* <label>Local Image URL:</label>
                    <input type="text" value={this.state.image_url} onChange={(event) => this.handleChangeFor(event, 'image_url')} required /> */}
                    <br />

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