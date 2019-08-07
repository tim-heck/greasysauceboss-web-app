import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutBtn from '../CheckoutBtn/CheckoutBtn';

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

    state = {
        quantity: 1
    }

    handleChange = (event) => {
        this.setState({
            quantity: event.target.value
        })
    }

    reviewOrder = () => {
        if (this.props.reduxStore.cart.length > 0) {
            return (
                <button onClick={this.goToReview}>Review Order</button>
            );
        } else {
            return (
                <button onClick={this.goToReview} disabled>Review Order</button>
            );
        }
    }

    goToReview = () => {
        this.props.history.push('/review-order');
    }

    removeCartItem = (product) => {
        console.log(product)
        this.props.dispatch({ type: 'REMOVE_ITEM', payload: product });
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
                                <button onClick={this.decrementQuantity}>-</button>
                                <input type="number" defaultValue={item.quantity} onChange={this.handleChange} />
                                <button onClick={this.incrementQuantity}>+</button>
                            </div>
                            <button onClick={() => this.removeCartItem(item)}>Remove</button>
                        </li>
                    )}
                </ul>
                {/* {this.checkSession()} */}
                {/* <CheckoutBtn cart={this.state.cart} clearCart={this.clearCart} goToCheckout={this.goToCheckout} /> */}
                {this.reviewOrder()}
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(CartPage);