import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MerchPage.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
    card: {
        maxWidth: 345,
        display: "inline-block",
        width: "300px",
        boxShadow: "none",
        borderRadius: 0,
        margin: "0 5px 20px",
        '&:first-child': {
            backgroundColor: "#000"
        }
    },
    media: {
        height: 300,
    },
    actions: {
        display: "block",
        textAlign: "center",
        padding: 0,
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
        fontWeight: "700",
    }
});

class MerchPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_PRODUCTS' });
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

    // FOR STRIPE -> STRETCH GOAL
    // goToCheckout = () => {
    //     // this.props.dispatch({ type: 'CREATE_SESSION', payload: this.state.cart });
    //     this.props.dispatch({ type: 'ADD_TO_CART', payload: this.state.cart }); // may not need
    //     this.props.history.push('/checkout');
    // }

    viewProduct = (product) => {
        this.props.dispatch({ type: 'VIEW_PRODUCT', payload: product.id });
        let urlTitle = product.title.toLowerCase().replace(/ /g, '-');
        this.props.history.push(`/merch/${product.id}/${urlTitle}`);
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container merch-list">
                    <h2 className="page-title">Merch</h2>
                    {this.props.reduxStore.merch.merchReducer.map(item =>
                        <Card className={classes.card} key={item.id}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={item.image_url}
                                    title={item.title}
                                    onClick={() => this.viewProduct(item)}
                                />
                                <CardContent>
                                    <Typography className={classes.typography}>
                                        {item.title}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.typography}>
                                        ${(item.price_pennies / 100).toFixed(2)}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions className={classes.actions}>
                                <Button variant="contained" className={classes.button} onClick={() => this.addToCart(item)}>
                                    Add to Cart
                                </Button>
                            </CardActions>
                        </Card>
                    )}
                </div>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(MerchPage));