import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
    }

    addToCart = (product) => {
        this.props.dispatch({ type: 'ADD_TO_CART', payload: product });
    }

    // goToCheckout = () => {
    //     // FOR STRIPE -> STRETCH GOAL
    //     // this.props.dispatch({ type: 'CREATE_SESSION', payload: this.state.cart });
    //     this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.cart }); // may not need
    //     this.props.history.push('/checkout');
    // }

    // clearCart = () => {
    //     this.props.dispatch({ type: 'CLEAR_CART', payload: [] });
    //     this.setState({
    //         cart: []
    //     })
    // }

    viewProduct = (product) => {
        this.props.dispatch({type: 'VIEW_PRODUCT', payload: product.id});
        let urlTitle = product.title.toLowerCase().replace(/ /g, '-');
        this.props.history.push(`/merch/${product.id}/${urlTitle}`);
    }

    render() {
        console.log('Cart',this.props.reduxStore.cart);
        return (
            <>
                <h2>Merch</h2>
                <ul>
                    {this.props.reduxStore.merch.merchReducer.map(item =>
                        <li key={item.id}>
                            <img height="150" src={item.image_url} alt="" onClick={() => this.viewProduct(item)}/>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h4>{(item.price_pennies / 100).toFixed(2)}</h4>
                            <button onClick={() => this.addToCart(item)}>Add to Cart</button>
                        </li>
                    )}
                </ul>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(MerchPage);