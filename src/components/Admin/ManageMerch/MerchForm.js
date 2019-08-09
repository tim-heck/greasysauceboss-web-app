import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
// import $ from 'jquery';

class MerchForm extends Component {

    state = {
        selectedFile: null,
        // selectedFiles: null
    }

    singleFileChangedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        });
    };

    // multipleFileChangedHandler = (event) => {
    //     this.setState({
    //         selectedFiles: event.target.files
    //     });
    //     console.log(event.target.files);
    // };

    singleFileUploadHandler = () => {
        const data = new FormData();
        // If file selected
        if (this.state.selectedFile) {
            data.append('merchImage', this.state.selectedFile, this.state.selectedFile.name);
            this.props.dispatch({ type: 'UPLOAD_SINGLE', payload: data })
            // axios.post('/api/profile/profile-img-upload', data, {
            //     headers: {
            //         'accept': 'application/json',
            //         'Accept-Language': 'en-US,en;q=0.8',
            //         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
            //     }
            // }).then((response) => {
            //         if (200 === response.status) {
            //             // If file size is larger than expected.
            //             if (response.data.error) {
            //                 if ('LIMIT_FILE_SIZE' === response.data.error.code) {
            //                     this.ocShowAlert('Max size: 2MB', 'red');
            //                 } else {
            //                     console.log(response.data);
            //                     // If not the given file type
            //                     this.ocShowAlert(response.data.error, 'red');
            //                 }
            //             } else {
            //                 // Success
            //                 let fileName = response.data;
            //                 console.log('fileName', fileName);
            //                 this.ocShowAlert('File Uploaded', '#3089cf');
            //             }
            //         }
            //     }).catch((error) => {
            //         // If another error
            //         this.ocShowAlert(error, 'red');
            //     });
        } else {
            // if file not selected throw error
            alert('Please upload file');
        }
    };

    // multipleFileUploadHandler = () => {
    //     const data = new FormData();
    //     let selectedFiles = this.state.selectedFiles;
    //     // If file selected
    //     if (selectedFiles) {
    //         for (let i = 0; i < selectedFiles.length; i++) {
    //             data.append('galleryImage', selectedFiles[i], selectedFiles[i].name);
    //         }
    //         this.props.dispatch({ type: 'UPLOAD_MULTIPLE', payload: data })
    //         // axios.post('/api/profile/multiple-file-upload', data, {
    //         //     headers: {
    //         //         'accept': 'application/json',
    //         //         'Accept-Language': 'en-US,en;q=0.8',
    //         //         'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
    //         //     }
    //         // }).then((response) => {
    //         //         console.log('res', response);
    //         //         if (200 === response.status) {
    //         //             // If file size is larger than expected.
    //         //             if (response.data.error) {
    //         //                 if ('LIMIT_FILE_SIZE' === response.data.error.code) {
    //         //                     this.ocShowAlert('Max size: 2MB', 'red');
    //         //                 } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
    //         //                     this.ocShowAlert('Max 4 images allowed', 'red');
    //         //                 } else {
    //         //                     // If not the given ile type
    //         //                     this.ocShowAlert(response.data.error, 'red');
    //         //                 }
    //         //             } else {
    //         //                 // Success
    //         //                 let fileName = response.data;
    //         //                 console.log('fileName', fileName);
    //         //                 this.ocShowAlert('File Uploaded', '#3089cf');
    //         //             }
    //         //         }
    //         //     }).catch((error) => {
    //         //         // If another error
    //         //         this.ocShowAlert(error, 'red');
    //         //     });
    //     } else {
    //         // if file not selected throw error
    //         alert('Please upload file');
    //     }
    // };

    // ShowAlert Function
    // ocShowAlert = (message, background = '#3089cf') => {
    //     let alertContainer = document.querySelector('#oc-alert-container'),
    //         alertEl = document.createElement('div'),
    //         textNode = document.createTextNode(message);
    //     alertEl.setAttribute('class', 'oc-alert-pop-up');
    //     $(alertEl).css('background', background);
    //     alertEl.appendChild(textNode);
    //     alertContainer.appendChild(alertEl);
    //     setTimeout(function () {
    //         $(alertEl).fadeOut('slow');
    //         $(alertEl).remove();
    //     }, 3000);
    // };

    // state = {
    //     title: '',
    //     description: '',
    //     price_pennies: 0,
    //     image_url: ''
    // }

    // componentDidMount() {
    //     if (this.props.reduxStore.editMode.edit) {
    //         this.setState({
    //             id: this.props.reduxStore.merch.editMerchReducer.id,
    //             title: this.props.reduxStore.merch.editMerchReducer.title,
    //             description: this.props.reduxStore.merch.editMerchReducer.description,
    //             price_pennies: this.props.reduxStore.merch.editMerchReducer.price_pennies,
    //             image_url: this.props.reduxStore.merch.editMerchReducer.image_url
    //         })
    //     }
    // }

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
                {/* <h2>Merch Form</h2>
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
                    <label>Local Image URL:</label>
                    <input type="text" value={this.state.image_url} onChange={(event) => this.handleChangeFor(event, 'image_url')} required />
                    <br />
                    {this.checkEditMode()}
                </form> */}

                <div>
                    <div className="container">
                        {/* For Alert box*/}
                        <div id="oc-alert-container"></div>
                        {/* Single File Upload*/}
                        <div className="card border-light mb-3 mt-5" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
                            <div className="card-header">
                                <h3 style={{ color: '#555', marginLeft: '12px' }}>Single Image Upload</h3>
                                <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 250px x 250px ( Max 2MB )</p>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Please upload an image for your profile</p>
                                <input type="file" onChange={this.singleFileChangedHandler} />
                                <div className="mt-5">
                                    <button className="btn btn-info" onClick={this.singleFileUploadHandler}>Upload!</button>
                                </div>
                            </div>
                        </div>
                        {/* Multiple File Upload */}
                        {/* <div className="card border-light mb-3" style={{ boxShadow: '0 5px 10px 2px rgba(195,192,192,.5)' }}>
                            <div className="card-header">
                                <h3 style={{ color: '#555', marginLeft: '12px' }}>Upload Muliple Images</h3>
                                <p className="text-muted" style={{ marginLeft: '12px' }}>Upload Size: 400px x 400px ( Max 2MB )</p>
                            </div>
                            <div className="card-body">
                                <p className="card-text">Please upload the Gallery Images for your gallery</p>
                                <input type="file" multiple onChange={this.multipleFileChangedHandler} />
                                <div className="mt-5">
                                    <button className="btn btn-info" onClick={this.multipleFileUploadHandler}>Upload!</button>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(MerchForm);