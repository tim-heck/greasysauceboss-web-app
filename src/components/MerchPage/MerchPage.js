import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
    }

    viewProduct = (product) => {
        this.props.dispatch({type: 'VIEW_PRODUCT', payload: product.id});
        let urlTitle = product.title.toLowerCase().replace(/ /g, '-');
        this.props.history.push(`/merch/${product.id}/${urlTitle}`);
    }

    render() {
        return (
            <>
                {/* <h2>Upcoming Shows</h2> */}
                <ul>
                    {this.props.reduxStore.merch.merchReducer.map(item =>
                        <li key={item.id}>
                            <img height="150" src={item.image_url} alt="" onClick={() => this.viewProduct(item)}/>
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h4>{(item.price_pennies / 100).toFixed(2)}</h4>
                            {/* <Button variant="contained" className={classes.button} onClick={() => this.addToCart(item)}>
                                Add to Cart
                            </Button> */}
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