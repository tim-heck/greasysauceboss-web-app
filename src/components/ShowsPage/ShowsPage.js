import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ShowsPage.css';
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
    },
    input: {
        display: 'none',
    },
});

class ShowsPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_SHOWS' });
    }

    checkTickets = (show) => {
        const { classes } = this.props;
        if (show.ticket) {
            return (
                <Button variant="contained" href={show.ticket_url} className={classes.button} target="_blank">
                    Tickets
                </Button>
            );
        }
    }

    
    render() {
        return (
            <>
                <div className="shows-list">
                    <h2 className="page-title">Upcoming Shows</h2>
                    <ul>
                        {this.props.reduxStore.shows.showsReducer.map(item =>
                            <li key={item.id}>
                                <h3 className="show-item show-date">{item.show_date}</h3>
                                <div className="show-item location">{item.location}</div>
                                <div className="show-item ticket">{this.checkTickets(item)}</div>
                            </li>
                        )}
                    </ul>
                </div>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(ShowsPage));