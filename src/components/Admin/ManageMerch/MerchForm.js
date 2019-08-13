import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MerchForm.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    textField: {
        width: "100%",
        margin: "5px 0 0 0"
    },
    textFieldTitle: {
        width: 800,
        margin: "0 5px 0 0",
    },
    textFieldDescription: {
        width: 800,
        margin: 0
    },
    textFieldImageUrl: {
        width: 800,
        marginTop: 10
    },
    checkboxLabel: {
        marginTop: "18px",
        width: 100,
    },
    checkbox: {
        margin: 0,
        color: '#1f2833',
    },
    button: {
        fontFamily: "Montserrat, sans-serif",
        backgroundColor: "#1f2833",
        marginTop: "8px",
        color: "#fff",
        padding: "10px 25px",
        letterSpacing: "1.5px",
        fontWeight: "700",
        transition: ".3s",
        '&:hover': {
            backgroundColor: "#fff",
            color: "#1f2833",
            boxShadow: "0px 0px 0px 3px #66fcf1",
        }
    },
    btnGroup: {
        '& button:last-child': {
            float: "right",
        }
    }
});

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
            // this.props.history.push('/manage-merch');
        } else {
            this.props.dispatch({ type: 'UPDATE_PRODUCT', payload: this.state });
            // this.props.history.push('/manage-merch');
        }
        this.props.dispatch({ type: 'EDIT_MODE', payload: { edit: false } });
    }

    checkEditMode = () => {
        const { classes } = this.props;
        if (this.props.reduxStore.editMode.edit) {
            return (
                <Button
                    variant="contained" className={classes.button}
                    type="submit" onClick={(event) => this.handleSubmit(event, 'edit')}>
                    Update
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained" className={classes.button}
                    type="submit" onClick={(event) => this.handleSubmit(event, 'add')}>
                    Submit
                </Button>
            );
        }
    }


    back = () => {
        this.props.history.push('/manage-merch');
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container merch-form-page">
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
                        <label>Local Image URL:</label>
                        <input type="text" value={this.state.image_url} onChange={(event) => this.handleChangeFor(event, 'image_url')} required />
                        {this.checkEditMode()}
                    </form> */}
                    <h2 className="page-title">Merch Form</h2>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            label="Title"
                            className={classes.textFieldTitle}
                            value={this.state.title}
                            onChange={(event) => this.handleChangeFor(event, 'title')}
                            margin="normal"
                            required
                        />
                        <br />
                        <TextField
                            label="Price (in pennies)"
                            className={classes.textFieldPrice}
                            value={this.state.price_pennies}
                            onChange={(event) => this.handleChangeFor(event, 'price_pennies')}
                            margin="normal"
                            required
                        />
                        <br />
                        <TextField
                            label="Description"
                            multiline
                            rows="6"
                            className={classes.textFieldDescription}
                            value={this.state.description}
                            onChange={(event) => this.handleChangeFor(event, 'description')}
                            margin="normal"
                            required
                        />
                        <br/>
                        <TextField
                            label="Image URL"
                            className={classes.textFieldImageUrl}
                            value={this.state.image_url}
                            onChange={(event) => this.handleChangeFor(event, 'image_url')}
                            margin="normal"
                            required
                        />
                        <br />
                        <div className={classes.btnGroup}>
                            <Button
                                variant="contained" className={classes.button}
                                onClick={this.back}>
                                Back to Manage Merch
                            </Button>
                            {this.checkEditMode()}
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(MerchForm));