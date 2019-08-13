import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShowsForm.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    textField: {
        width: "100%",
        margin: "5px 0 0 0"
    },
    textFieldDate: {
        width: 200,
        margin: "0 5px 0 0",
        // color: 'red',
        // '& label': {
        //     color: 'red',
        //     '&.Mui-focused': {
        //         color: "#66fcf1",
        //         borderBottom: "#66fcf1"
        //     },
        // }
    },
    textFieldLocation: {
        width: 595,
        margin: 0
    },
    textFieldTicketUrl: {
        width: 695,
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

class ShowsForm extends Component {

    state = {
        date: '',
        location: '',
        ticket: false,
        ticket_url: ''
    }

    componentDidMount() {
        let ticketUrl = '';
        if (this.props.reduxStore.shows.editShowReducer.ticket_url !== null) {
            ticketUrl = this.props.reduxStore.shows.editShowReducer.ticket_url;
        }
        if (this.props.reduxStore.editMode.edit) {
            this.setState({
                id: this.props.reduxStore.shows.editShowReducer.id,
                date: this.props.reduxStore.shows.editShowReducer.show_date,
                location: this.props.reduxStore.shows.editShowReducer.location,
                ticket: this.props.reduxStore.shows.editShowReducer.ticket,
                ticket_url: ticketUrl
            })
        }
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
            // this.props.history.push('/manage-shows');
        } else {
            this.props.dispatch({ type: 'UPDATE_SHOW', payload: this.state });
            // this.props.history.push('/manage-shows');

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
        this.props.history.push('/manage-shows');
    }

    cancel = () => {
        this.setState({
            date: '',
            location: '',
            ticket: false,
            ticket_url: ''
        })
        this.props.history.push('/manage-shows');
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container show-form-page">
                    <h2 className="page-title">Show Form</h2>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            label="Show Date"
                            className={classes.textFieldDate}
                            value={this.state.date}
                            onChange={(event) => this.handleChangeFor(event, 'date')}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Location"
                            className={classes.textFieldLocation}
                            value={this.state.location}
                            onChange={(event) => this.handleChangeFor(event, 'location')}
                            margin="normal"
                            required
                        />
                        <br />
                        <FormControlLabel className={classes.checkboxLabel}
                            control={
                                <Checkbox
                                    className={classes.checkbox} checked={this.state.ticket}
                                    onChange={(event) => this.handleChangeFor(event, 'ticket')}
                                    value="ticket"
                                    color="default"
                                />
                            }
                            label="Tickets?"
                        />
                        <TextField
                            label="Tickets URL"
                            className={classes.textFieldTicketUrl}
                            value={this.state.ticket_url}
                            onChange={(event) => this.handleChangeFor(event, 'ticket_url')}
                            margin="normal"
                        />
                        <br />
                        <div className={classes.btnGroup}>
                            <Button
                                variant="contained" className={classes.button}
                                onClick={this.back}>
                                Back to Manage Shows
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

export default withStyles(styles)(connect(stateToProps)(ShowsForm));