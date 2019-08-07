import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchPage extends Component {

    state = {
        cart: []
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
    }

    addToCart = (product) => {
        this.setState({
            cart: [
                ...this.state.cart,
                {
                    title: product.title,
                    description: product.description,
                    price: product.price_pennies,
                    image_url: product.image_url
                }
            ]
        });
    }

    goToCheckout = () => {
        // FOR STRIPE -> STRETCH GOAL
        // this.props.dispatch({ type: 'CREATE_SESSION', payload: this.state.cart });
        this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.cart }); // may not need
        this.props.history.push('/checkout');
    }

    clearCart = () => {
        this.props.dispatch({ type: 'CLEAR_CART', payload: [] });
        this.setState({
            cart: []
        })
    }

    render() {
        return (
            <>
                <h2>Merch</h2>
                <ul>
                    {this.props.reduxStore.merch.merchReducer.map(item =>
                        <li key={item.id}>
                            <img height="150" src={item.image_url} alt="" />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h4>{(item.price_pennies / 100).toFixed(2)}</h4>
                            <button onClick={() => this.addToCart(item)}>Add to Cart</button>
                            {/* <Button variant="contained" className={classes.button} onClick={() => this.addToCart(item)}>
                                Add to Cart
                            </Button> */}
                        </li>
                    )}
                </ul>
                {/* <CheckoutBtn cart={this.state.cart} clearCart={this.clearCart} goToCheckout={this.goToCheckout} /> */}
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(MerchPage);