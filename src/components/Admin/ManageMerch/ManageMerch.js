import React, { Component } from 'react';
import { connect } from 'react-redux';

class ManageMerch extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
    }

    handleClick = (dispatchType, merchToModify) => {
        if (dispatchType === 'edit' || dispatchType === 'add') {
            this.props.history.push('/merch-form');
        } else {
            this.props.dispatch({ type: 'DELETE_MERCH', payload: merchToModify })
        }
    }

    render() {
        return (
            <>
                <h2>Manage Merch</h2>
                <ul>
                    {this.props.reduxStore.merch.map(item =>
                        <li key={item.id}>
                            <img height="150" src={item.image_url} alt="" />
                            <h2>{item.title}</h2>
                            <p>{item.description}</p>
                            <h4>{(item.price_pennies / 100).toFixed(2)}</h4>
                            {/* <button onClick={() => this.handleClick('edit', item)}>Edit</button> */}
                            <button onClick={() => this.handleClick('delete', item)}>Delete</button>
                        </li>
                    )}
                </ul>
                <button onClick={() => this.handleClick('add')}>Add New Merch Item</button>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(ManageMerch);