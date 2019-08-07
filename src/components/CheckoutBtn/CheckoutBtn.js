import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';

// const styles = theme => ({
//     button: {
//         margin: theme.spacing.unit,
//     }
// });

class CheckoutBtn extends Component {

    // checkCart = () => {
    //     const { classes } = this.props;
    //     if (this.props.cart.length > 0) {
    //         return (
    //             <Button variant="contained" color="primary" className={classes.button} onClick={this.props.goToCheckout}>
    //                 View Cart
    //             </Button>
    //         );
    //     } else {
    //         return (
    //             <Button variant="contained" disabled className={classes.button} onClick={this.props.goToCheckout}>
    //                 View Cart
    //             </Button>
    //         );
    //     }
    // }

    render() {
        // const { classes } = this.props;
        return (
            <>
                {/* <Button variant="contained" color="primary" className={classes.button} onClick={this.props.clearCart}>
                    Clear Cart
                </Button> */}
                {/* {this.checkCart()} */}
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(CheckoutBtn);
