import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MerchItemPage.css';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { notify } from 'react-notify-toast';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        backgroundColor: "#1f2833",
        color: "#fff",
        padding: "10px 25px",
        letterSpacing: "1.5px",
        transition: ".3s",
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
        '&:hover': {
            backgroundColor: "#fff",
            color: "#1f2833",
            boxShadow: "0px 0px 0px 3px #66fcf1",
        }
    },
});

class MerchItemPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'VIEW_PRODUCT', payload: this.props.match.params.id });
    }

    addToCart = (product) => {
        try {
            this.props.dispatch({ type: 'ADD_TO_CART', payload: product });
            notify.show(`${product.title} added to the cart!`, "success", 3000);
        } catch (err) {
            notify.show(
                `Something went wrong! That's not greasy... Try again later!`,
                "error",
                3000
            );
        }
    }

    back = () => {
        this.props.history.push('/merch')
    }

    render() {
        const { classes } = this.props;
        const productToView = this.props.reduxStore.merch.viewMerchReducer;
        return (
            <>
                <div className="container merch-item">
                    <div className="merch-item_left">
                        <img height="300" src={productToView.image_url} alt={productToView.title} />
                    </div>
                    <div className="merch-item_right">
                        <h2>{productToView.title}</h2>
                        <p>{productToView.description}</p>
                        <h4>${(productToView.price_pennies / 100).toFixed(2)}</h4>
                        <div className="btn-group">
                            <Button variant="contained" className={classes.button} onClick={this.back}>
                                Back to Merch
                        </Button>
                            <Button variant="contained" className={classes.button} onClick={() => this.addToCart(productToView)}>
                                Add to Cart
                        </Button>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(MerchItemPage));