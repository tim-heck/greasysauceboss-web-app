import React, { Component } from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import './ProfilePage.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
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
    card: {
        width: "700px",
        boxShadow: "none",
        borderRadius: 0,
        margin: "0 auto",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
    },
    actions: {
        display: "block",
        textAlign: "center",
        padding: 0,
    },
    product: {
        margin: "0 0 20px 0",
        '& img': {
            // width: "100px",
            display: "inline-block",
        },
        '& div': {
            display: "inline-block",
            verticalAlign: "top",
            width: "568px",
        },
        '& div ul': {
            display: "inline-block",
            textAlign: "left",
            width: "50%",
        },
        '& div ul li': {
            textAlign: "center"
        },
        '& div ul li:first-child': {
            marginBottom: "20px"
        },
    },
    merchInfo: {
        textAlign: "left",
        margin: "5px 0"
    },
    merchInfoUl: {
        textAlign: "left",
        margin: "5px 0",
        '& li': {
            width: "50%",
            display: "inline-block"
        }
    },
    form: {
        width: 250,
        textAlign: "center"
    },
});

class ProfilePage extends Component {

    /**
     * Method runs when the component is ready
     * Fetches the users orders based on the users id
     */
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
        this.props.dispatch({ type: 'FETCH_USERS_ORDERS', payload: this.props.reduxStore.user.id });
    }

    state = {
        username: '',
        password: '',
        firstName: '',
    };

    registerUser = (event) => {
        event.preventDefault();
        this.props.dispatch({ type: 'LOGOUT' });
        if (this.state.username && this.state.password) {
            this.props.dispatch({
                type: 'REGISTER',
                payload: {
                    username: this.state.username,
                    password: this.state.password,
                    firstName: this.state.firstName
                },
            });
        } else {
            this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
        }
    } // end registerUser

    handleInputChangeFor = propertyName => (event) => {
        this.setState({
            [propertyName]: event.target.value,
        });
    }

    render() {
        const { classes } = this.props;
        if (this.props.reduxStore.user.username !== 'guest') {
            return (
                <>
                    <div className="container profile-page">
                        <h2 className="page-title">What's up, {this.props.reduxStore.user.name}?!</h2>
                        <h2 className="page-title">Past Orders</h2>
                        {this.props.reduxStore.order.userOrders.map((item, i) =>
                            <Card className={classes.card} key={i}>
                                <CardContent>
                                    <ul className={classes.merchInfoUl}>
                                        <li>Order #: {item.order_id}</li>
                                        <li>Order Date: {Moment(item.order_date).format('L')}</li>
                                    </ul>
                                    <div className={classes.merchInfo}>
                                        <h4>Products Ordered:</h4>
                                        <div className={classes.product}>
                                            <img height="100" src={item.image_url} alt={item.title} />
                                            <div>
                                                <ul>
                                                    <li>Item: {item.title}</li>
                                                    <li>{item.description}</li>
                                                </ul>
                                                <ul>
                                                    <li>Quantity: {item.quantity}</li>
                                                    <li>${(item.price_pennies / 100).toFixed(2)}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={classes.merchInfo}>Total Order Price: ${(item.total_price_pennies / 100).toFixed(2)}</div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </>
            );
        } else {
            return (
                <div className="container merch-list">
                    <h2 className="page-title center">Create an account to view your profile</h2>
                    <form onSubmit={this.registerUser} className={classes.form}>
                        <h1 className={classes.title}>Register User</h1>
                        {this.props.reduxStore.errors.registrationMessage && (
                            <h6 className="alert" role="alert">
                                {this.props.reduxStore.errors.registrationMessage}
                            </h6>
                        )}
                        <div>
                            <TextField
                                label="Username"
                                className={classes.textField}
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
                                value={this.state.username}
                                onChange={this.handleInputChangeFor('username')}
                                margin="normal"
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                type="password"
                                label="Password"
                                className={classes.textField}
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
                                value={this.state.password}
                                onChange={this.handleInputChangeFor('password')}
                                margin="normal"
                                required
                            />
                        </div>
                        <div>
                            <TextField
                                label="First Name"
                                className={classes.textField}
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
                                value={this.state.firstName}
                                onChange={this.handleInputChangeFor('firstName')}
                                margin="normal"
                                required
                            />
                        </div>
                        <br />
                        <div>
                            <Button
                                variant="contained"
                                className={classes.button}
                                type="submit">
                                Register
                            </Button>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

// redux state
const stateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(stateToProps)(ProfilePage));