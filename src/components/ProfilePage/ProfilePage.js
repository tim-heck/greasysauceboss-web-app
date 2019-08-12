import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfilePage.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

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
});

class ProfilePage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USERS_ORDERS', payload: this.props.reduxStore.user.id });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container profile-page">
                    <h2 className="page-title">What's up, {this.props.reduxStore.user.username}?!</h2>
                    <h2 className="page-title">Past Orders</h2>
                    {this.props.reduxStore.order.userOrders.map((item, i) =>
                        <Card className={classes.card} key={i}>
                            <CardContent>
                                <ul className={classes.merchInfoUl}>
                                    <li>Order #: {item.order_id}</li>
                                    <li>Order Date: {item.order_date}</li>
                                </ul>
                                <div className={classes.merchInfo}>
                                    <h4>Products Ordered:</h4>
                                    <div className={classes.product}>
                                        {/* <div> */}
                                            <img height="100" src={item.image_url} alt={item.title} />
                                        {/* </div> */}
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
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(stateToProps)(ProfilePage));