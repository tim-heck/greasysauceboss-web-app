import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShowsForm.css';
import Moment from 'moment';
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
    },
    cssLabel: {
        '&$cssFocused': {
            color: "#1f2833",
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#1f2833",
        },
    },
});

class ShowsForm extends Component {

    state = {
        show: {
            date: '',
            location: '',
            ticket: false,
            ticket_url: '',
        },
        dateError: null,
        locationError: null,
        ticketError: false,
    }

    /**
     * Method runs when the component is ready
     * If edit mode is on, sets the state with the show information to edit
     */
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' })
        let ticketUrl = '';
        if (this.props.reduxStore.shows.editShowReducer.ticket_url !== null) {
            ticketUrl = this.props.reduxStore.shows.editShowReducer.ticket_url;
        }
        if (this.props.reduxStore.editMode.edit) {
            this.setState({
                show: {
                    id: this.props.reduxStore.shows.editShowReducer.id,
                    date: Moment(this.props.reduxStore.shows.editShowReducer.show_date).format('YYYY-MM-DD'),
                    location: this.props.reduxStore.shows.editShowReducer.location,
                    ticket: this.props.reduxStore.shows.editShowReducer.ticket,
                    ticket_url: ticketUrl
                },
                dateError: false,
                locationError: false,
            })
        }
    }

    /**
     * Method that handles an input changes
     * event: the change that occurs
     * propToChange: the state property being changed
     * errorToChange: the states error property to change
     */
    handleChangeFor = (event, propToChange, errorToChange) => {
        // The ticket value is handle differently since it is a checkbox
        if (propToChange === 'ticket') {
            if ((event.target.checked && this.state.show.ticket_url === '') || (!event.target.checked && this.state.show.ticket_url !== '')) {
                this.setState({
                    show: {
                        ...this.state.show,
                        [propToChange]: event.target.checked
                    },
                    [errorToChange]: true
                });
            } else {
                this.setState({
                    show: {
                        ...this.state.show,
                        [propToChange]: event.target.checked
                    },
                    [errorToChange]: false
                });
            }
        } else if (propToChange === 'ticket_url') {
            if ((event.target.value === '' && this.state.show.ticket) || (event.target.value !== '' && !this.state.show.ticket)) {
                this.setState({
                    show: {
                        ...this.state.show,
                        [propToChange]: event.target.value
                    },
                    [errorToChange]: true
                });
            } else {
                this.setState({
                    show: {
                        ...this.state.show,
                        [propToChange]: event.target.value
                    },
                    [errorToChange]: false
                });
            }
        } else {
            this.setState({
                show: {
                    ...this.state.show,
                    [propToChange]: event.target.value
                },
                [errorToChange]: false
            });
        }
        // if (event.target.checked === true && this.state.show.ticket_url !== '') {
        //     this.setState({
        //         show: {
        //             ...this.state.show,
        //             [propToChange]: event.target.checked
        //         },
        //         [errorToChange]: false
        //     })
        // } else if (event.target.checked === false && this.state.show.ticket_url === '') {
        //     this.setState({
        //         show: {
        //             ...this.state.show,
        //             [propToChange]: event.target.checked
        //         },
        //         [errorToChange]: true
        //     })
        // }


        // Checks if the input values are empty
        // if (event.target.value === '') {
        //     this.setState({
        //         [errorToChange]: true
        //     });
        // }
    }

    /**
     * Method that handles the form submission
     * Checks for errors for each input, changes state properties accordingly
     * event: submitting the form
     * addOrEdit: checks if the user is adding a new product or editing an existing one
     */
    handleSubmit = (event, addOrEdit) => {
        event.preventDefault();

        if (this.state.show.date === '') {
            this.setState({
                dateError: true
            })
        } else {
            this.setState({
                dateError: false
            })
        }

        if (this.state.show.location === '') {
            this.setState({
                locationError: true
            })
        } else {
            this.setState({
                locationError: false
            })
        }

        if ((this.state.show.ticket === true && this.state.show.ticket_url === '') || (this.state.show.ticket === false && this.state.show.ticket_url !== '')) {
            this.setState({
                ticketError: true
            })
        } else {
            this.setState({
                ticketError: false
            })
        }

        if (this.state.dateError === false && this.state.locationError === false && this.state.ticketError === false) {
            if (addOrEdit === 'add') {
                // add show to DB
                this.props.dispatch({ type: 'ADD_SHOW', payload: this.state.show });
            } else {
                // updates show in DB
                this.props.dispatch({ type: 'UPDATE_SHOW', payload: this.state.show });

            }
        }
    }

    /**
     * Method conditionally renders a submission button based on if the user
     * is in edit mode or not
     */
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

    // Sends the user back to the manage-merch page
    back = () => {
        this.props.history.push('/manage-shows');
    }

    fillDummyData = () => {
        this.setState({
            show: {
                date: Moment('12-25-2019').format('YYYY-MM-DD'),
                location: `The Garage`,
                ticket: true,
                ticket_url: 'https://www.thegaragemn.com/'
            },
            dateError: false,
            locationError: false,
            ticketError: false,
        })
    }

    render() {
        const { classes } = this.props;
        if (this.props.reduxStore.user.admin === true) {
            return (
                <>
                    <div className="container show-form-page">
                        <h2 className="page-title" onClick={this.fillDummyData}>Show Form</h2>
                        <form className={classes.form} noValidate autoComplete="off">
                            <TextField
                                id="date"
                                type="date"
                                value={this.state.show.date}
                                className={classes.textFieldDate}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                    shrink: true,
                                }}
                                InputProps={{
                                    classes: {
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                label="Show Date"
                                onChange={(event) => this.handleChangeFor(event, 'date', 'dateError')}
                                margin="normal"
                                required
                                error={this.state.dateError}
                            />
                            <TextField
                                label="Location"
                                className={classes.textFieldLocation}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                value={this.state.show.location}
                                onChange={(event) => this.handleChangeFor(event, 'location', 'locationError')}
                                margin="normal"
                                required
                                error={this.state.locationError}
                            />
                            <br />
                            <FormControlLabel className={classes.checkboxLabel}
                                control={
                                    <Checkbox
                                        className={classes.checkbox} checked={this.state.show.ticket}
                                        onChange={(event) => this.handleChangeFor(event, 'ticket', 'ticketError')}
                                        value="ticket"
                                        color="default"
                                    />
                                }
                                label="Tickets?"
                            />
                            <TextField
                                label="Tickets URL"
                                className={classes.textFieldTicketUrl}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.cssLabel,
                                        focused: classes.cssFocused,
                                    },
                                }}
                                InputProps={{
                                    classes: {
                                        focused: classes.cssFocused,
                                        underline: classes.cssUnderline,
                                    },
                                }}
                                value={this.state.show.ticket_url}
                                onChange={(event) => this.handleChangeFor(event, 'ticket_url', 'ticketError')}
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
        } else {
            return (
                <div className="container merch-list">
                    <h2 className="page-title center">Error: 404</h2>
                    <h2 className="page-title center">Oh no! This very greasy page does not exist!</h2>
                    <h2 className="page-title center">Try again later, and remember, stay greasy!</h2>
                </div>
            );
        }
    }
}

// redux state
const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(ShowsForm));