import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        fontFamily: "Montserrat, sans-serif",
        margin: theme.spacing.unit,
        backgroundColor: "#1f2833",
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
    }
});

class ManageShows extends Component {

    /**
     * Method runs when the component is ready
     * Gets all shows from the database
     * Sets edit mode to false if it was true onload
     */
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SHOWS' });
        this.props.dispatch({ type: 'EDIT_MODE', payload: { edit: false } });
    }

    /**
     * Handles all click events
     * dispatchType: dictates what action to take
     * showToModify: Show to use for action
     */
    handleClick = (dispatchType, showToModify) => {
        if (dispatchType === 'add') {
            // Redirects to shows form
            this.props.history.push('/shows-form');
        } else if (dispatchType === 'edit') {
            // sends show to editShowReducer
            this.props.dispatch({ type: 'EDIT_SHOW', payload: showToModify });
            // Flips editMode on
            this.props.dispatch({ type: 'EDIT_MODE', payload: { edit: true } });
            // Redirects to shows form
            this.props.history.push('/shows-form');
        } else {
            // Deletes show
            this.props.dispatch({ type: 'DELETE_SHOW', payload: showToModify })
        }
    }

    /**
     * Method checks if the show has tickets for purchase
     * show: show to check
     */
    checkTickets = (show) => {
        const { classes } = this.props;
        if (show.ticket) {
            return (
                <Button variant="contained" href={show.ticket_url} className={classes.button} target="_blank">Tickets</Button>
            );
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container shows-list">
                    <h2 className="page-title">Manage Shows</h2>
                    <ul>
                        {this.props.reduxStore.shows.showsReducer.map(item =>
                            <li key={item.id}>
                                <h3 className="show-item show-date">{Moment(item.show_date).format('L')}</h3>
                                <div className="show-item location">{item.location}</div>
                                <div className="show-item ticket">{this.checkTickets(item)}</div>
                                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('edit', item)}>Edit</Button>
                                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('delete', item)}>Delete</Button>
                            </li>
                        )}
                    </ul>
                    <br />
                    <Button variant="contained" className={classes.button} onClick={() => this.handleClick('add')}>Add New Show</Button>
                </div>
            </>
        );
    }
}

// Redux State
const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(ManageShows));