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
                            <li key={item.id}>
                                <label>Order #: <span>{item.id}</span></label>
                                <br/>
                                <label>Products Ordered: </label>
                                    <ul>
                                        <li></li>
                                    </ul>
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