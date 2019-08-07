import React, { Component } from 'react';
import { connect } from 'react-redux';

class MerchItemPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'VIEW_PRODUCT', payload: this.props.match.params.id });
    }

    render() {
        const productToView = this.props.reduxStore.merch.viewMerchReducer;
        return (
            <>
                <div>
                    <img height="300" src={productToView.image_url} alt={productToView.title} />
                    <h2>{productToView.title}</h2>
                    <p>{productToView.description}</p>
                    <h4>{productToView.price_pennies}</h4>
                </div>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(MerchItemPage);