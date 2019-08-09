import React, { Component } from 'react';
import { connect } from 'react-redux';

class ReviewPage extends Component {

    componentDidMount() {
        this.props.dispatch({type: 'FETCH_ORDERS'})
    }

    completeOrder = () => {
        let totalPricePennies = 0;
        let cart = this.props.reduxStore.cart;
        for (let i = 0; i < cart.length; i++) {
            totalPricePennies += cart[i].price_pennies * cart[i].quantity;
        }
        this.props.dispatch({
            type: 'ADD_ORDER', 
            payload: {
                total_price_pennies: totalPricePennies,
                cart: this.props.reduxStore.cart
            }
        })
    }

    checkForProducts = () => {
        if (this.props.reduxStore.cart.length > 0) {
            return (
                <button onClick={this.completeOrder}>Pay Now</button>
            );
        } else {
            return (
                <>
                    <h3>Your cart is empty! Grease it up with some merch!</h3>
                    <button onClick={this.completeOrder} disabled>Pay Now</button>
                </>
            );
        }
    }

    render() {
        return (
            <>
                <h2>Review Your Order</h2>
                <ul>
                    {this.props.reduxStore.cart.map((item, i) =>
                        <li key={i}>
                            <img src={item.image_url} height="150" alt="" />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h4>{item.price_pennies}</h4>
                        </li>
                    )}
                </ul>
                {this.checkForProducts()}
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(ReviewPage);