import React, { Component } from 'react';
import { connect } from 'react-redux';

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

    // state = {
    //     quantity: 1
    // }

    handleChange = (item) => {
        
    }

    checkForProducts = () => {
        if (this.props.reduxStore.cart.length > 0) {
            return (
                <button onClick={this.goToReview}>Review Order</button>
            );
        } else {
            return (
                <>
                    <h3>Your cart is empty! Grease it up with some merch!</h3>
                    <button onClick={this.goToReview} disabled>Review Order</button>
                </>
            );
        }
    }

    goToReview = () => {
        this.props.history.push('/review-order');
    }

    removeCartItem = (product) => {
        this.props.dispatch({ type: 'REMOVE_ITEM', payload: product });
    }

    decrementQuantity = (product) => {
        this.props.dispatch({ type: 'DECREMENT_QUANTITY', payload: product });
    }

    incrementQuantity = (product) => {
        this.props.dispatch({ type: 'INCREMENT_QUANTITY', payload: product });
    }

    clearCart = () => {
        this.props.dispatch({ type: 'CLEAR_CART', payload: [] });
    }

    render() {
        return (
            <>
                <h2>Your Cart</h2>
                <ul>
                    {this.props.reduxStore.cart.map((item, i) =>
                        <li key={i}>
                            <img src={item.image_url} height="150" alt="" />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h4>{item.price_pennies}</h4>
                            <div>
                                <button onClick={() => this.decrementQuantity(item)}>-</button>
                                <input type="number" value={item.quantity} onChange={() => this.handleChange(item)} readOnly/>
                                <button onClick={() => this.incrementQuantity(item)}>+</button>
                            </div>
                            <button onClick={() => this.removeCartItem(item)}>Remove</button>
                        </li>
                    )}
                </ul>
                {/* {this.checkSession()} */}
                {/* <CheckoutBtn cart={this.state.cart} clearCart={this.clearCart} goToCheckout={this.goToCheckout} /> */}
                {this.checkForProducts()}
                <button onClick={this.clearCart}>Clear Entire Cart</button>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(CartPage);