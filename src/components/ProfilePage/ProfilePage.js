import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProfilePage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USERS_ORDERS', payload: this.props.reduxStore.user.id});
    }

    render() {
        return (
            <>
                <h2>What's up, {this.props.reduxStore.user.username}?!</h2>
                <div>
                    <h2>Past Orders</h2>
                    <ul>
                        {this.props.reduxStore.order.userOrders.map((item, i) => 
                            <li key={i}>
                                <label>Order #: <span>{item.order_id}</span></label>
                                <br/>
                                <label>Order Date: <span>{item.order_date}</span></label>
                                <br/>
                                <label>Products Ordered: </label>
                                    <ul>
                                        <li><img height="100" src={item.image_url} alt={item.title} /></li>
                                        <li>Quantity: {item.quantity}</li>
                                        <li>{item.title}</li>
                                        <li><p>{item.description}</p></li>
                                        <li><h4>{item.price_pennies}</h4></li>
                                    </ul>
                                <h4>Total Price: {item.total_price_pennies}</h4>
                            </li>
                        )}
                    </ul>
                </div>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(ProfilePage);