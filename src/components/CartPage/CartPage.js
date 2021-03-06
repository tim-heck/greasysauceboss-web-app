import React, { Component } from 'react';
import { connect } from 'react-redux';
import './CartPage.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
        width: "800px",
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
            display: "inline-block",
        },
        '& .product-details': {
            display: "inline-block",
            verticalAlign: "top",
            paddingLeft: "20px",
            width: "425px",
        },
        '& .product-details:last-child': {
            width: "125px",
        },
        '& div ul': {
            display: "inline-block",
            textAlign: "left",
        },
        '& div ul li': {
            marginBottom: "20px"
        },
    },
    totalPrice: {
        textAlign: "right",
        margin: "5px 0",
        padding: "16px",
        fontWeight: "700",
        fontSize: "24px"
    },
    btnGroup: {
        '& button:last-child': {
            float: "right",
        }
    },
    productQuantity: {
        '& input': {
            width: "30px"
        }
    }
});

class CartPage extends Component {

    // FOR STRIPE -> STRETCH GOAL
    // goToCheckout = () => {
    //     stripe.redirectToCheckout({
    //         // Make the id field from the Checkout Session creation API response
    //         // available to this file, so you can provide it as parameter here
    //         // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    //         sessionId: this.props.reduxStore.checkoutSession.id
    //     }).then(function (result) {
    //         // If `redirectToCheckout` fails due to a browser or network
    //         // error, display the localized error message to your customer
    //         // using `result.error.message`.
    //         console.log(result.error.message);
    //     });

    // }

    // checkSession = () => {
    //     const { classes } = this.props;
    //     if (this.props.reduxStore.checkoutSession.id) {
    //         return (
    //             <Button variant="contained" color="primary" className={classes.button} onClick={this.goToCheckout}>
    //                 Go to Checkout
    //             </Button>
    //         );
    //     }
    // }

    /**
     * Method needed so the value of the quantity input can
     * be modified
     * TODO: Change to anther type of element to avoid an empty method?
     */
    handleChange = (item) => {

    }

    /**
     * Method checks if the cart contains at least one product
     * Displays a message if not and disables the buttons
     */
    checkForProducts = () => {
        const { classes } = this.props;
        if (this.props.reduxStore.cart.length > 0) {
            return (
                <>
                    <div className={classes.btnGroup}>
                        <Button
                            variant="contained" className={classes.button}
                            onClick={this.clearCart}>
                            Clear Entire Cart
                        </Button>
                        {/* <Button
                            variant="contained" className={classes.button}
                            onClick={this.goToReview}>
                            Review Order
                        </Button> */}
                        <Button
                            variant="contained" className={classes.button}
                            onClick={this.payNow}>
                            Pay Now
                        </Button>
                    </div>
                </>
            );
        } else {
            return (
                <>
                    <h3>Your cart is empty! Grease it up with some merch!</h3>
                    <div className={classes.btnGroup}>
                        <Button
                            variant="contained" className={classes.button}
                            onClick={this.clearCart} disabled>
                            Clear Entire Cart
                        </Button>
                        {/* <Button
                            variant="contained" className={classes.button}
                            onClick={this.goToReview} disabled>
                            Review Order
                        </Button> */}
                        <Button
                            variant="contained" className={classes.button}
                            onClick={this.payNow} disabled>
                            Pay Now
                        </Button>
                    </div>
                </>
            );
        }
    }

    // STRETCH GOAL
    // goToReview = () => {
    //     this.props.history.push('/review-order');
    // }

    /**
     * Method that completes the users order process
     * Stores the order and cart in DB for users profile
     */
    payNow = () => {
        // Calculates the total price of the order
        let totalPricePennies = this.calcTotal();
        // Adds order
        this.props.dispatch({
            type: 'ADD_ORDER',
            payload: {
                total_price_pennies: totalPricePennies,
                cart: this.props.reduxStore.cart
            }
        })
        // Clears cart
        this.props.dispatch({ type: 'CLEAR_CART', payload: [] });
    }

    /**
     * Method that removes an item from the cart
     * product: product to remove
     */
    removeCartItem = (product) => {
        this.props.dispatch({ type: 'REMOVE_ITEM', payload: product });
    }

    /**
     * Decrements the quantity of the product
     * product: product to decrement quantity
     */
    decrementQuantity = (product) => {
        this.props.dispatch({ type: 'DECREMENT_QUANTITY', payload: product });
    }

    /**
     * Increments the quantity of the product
     * product: product to increment quantity
     */
    incrementQuantity = (product) => {
        this.props.dispatch({ type: 'INCREMENT_QUANTITY', payload: product });
    }

    /**
     * Empties the cart
     */
    clearCart = () => {
        this.props.dispatch({ type: 'CLEAR_CART', payload: [] });
    }

    /**
     * Method that calculates the total of the cart
     */
    calcTotal = () => {
        let totalPrice = 0;
        this.props.reduxStore.cart.map(item => 
            totalPrice += (item.price_pennies * item.quantity)
        )
        return totalPrice;
    }

    /**
     * Method that renders the calculated total of the cart
     */
    showTotal = () => {
        const { classes } = this.props;
        let totalPrice = this.calcTotal();
        console.log(totalPrice);
        return (
            <div className={classes.totalPrice}>Total: ${(totalPrice / 100).toFixed(2)}</div>
        );
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container cart-page">
                    <h2 className="page-title">Your Cart</h2>
                    <ul>
                        {this.props.reduxStore.cart.map((item, i) =>
                            <Card className={classes.card} key={i}>
                                <CardContent>
                                    <div className={classes.merchInfo}>
                                        <div className={classes.product}>
                                            <img height="150" src={item.image_url} alt={item.title} />
                                            <div className="product-details">
                                                <ul>
                                                    <li>{item.title}</li>
                                                    <li>{item.description}</li>
                                                    <li>${((item.price_pennies / 100) * item.quantity).toFixed(2)}</li>
                                                </ul>
                                            </div>
                                            <div className="product-details">
                                                <label>Quantity:</label>
                                                <div className={classes.productQuantity}>
                                                    <button onClick={() => this.decrementQuantity(item)}>-</button>
                                                    <input type="number" value={item.quantity} onChange={() => this.handleChange(item)} readOnly />
                                                    <button onClick={() => this.incrementQuantity(item)}>+</button>
                                                </div>
                                                <Button
                                                    variant="contained" className={classes.button}
                                                    onClick={() => this.removeCartItem(item)}>
                                                    Remove
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </ul>
                    {this.showTotal()}
                    
                    {/* {this.checkSession()} */}
                    {/* <CheckoutBtn cart={this.state.cart} clearCart={this.clearCart} goToCheckout={this.goToCheckout} /> */}
                    {this.checkForProducts()}
                </div>
            </>
        );
    }
}

// redux state
const stateToProps = (reduxStore) => ({
    reduxStore
})

export default withStyles(styles)(connect(stateToProps)(CartPage));