import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MerchForm.css';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    textField: {
        width: "100%",
        margin: "5px 0 0 0"
    },
    textFieldTitle: {
        width: 800,
        margin: "0 5px 0 0",
    },
    textFieldDescription: {
        width: 800,
        margin: 0
    },
    textFieldImageUrl: {
        width: 800,
        marginTop: 10
    },
    checkboxLabel: {
        marginTop: "18px",
        width: 100,
    },
    checkbox: {
        margin: 0,
        color: '#1f2833',
    },
    button: {
        fontFamily: "Montserrat, sans-serif",
        backgroundColor: "#1f2833",
        marginTop: "8px",
        color: "#fff",
        padding: "10px 25px",
        letterSpacing: "1.5px",
        fontWeight: "700",
        transition: ".3s",
        '&:hover': {
            backgroundColor: "#fff",
            color: "#1f2833",
            boxShadow: "0px 0px 0px 3px #66fcf1",
        }
    },
    btnGroup: {
        '& button:last-child': {
            float: "right",
        }
    },
    cssLabel: {
        '&$cssFocused': {
            color: "#1f2833",
        },
    },
    cssFocused: {},
    cssUnderline: {
        '&:after': {
            borderBottomColor: "#1f2833",
        },
    },
});

class MerchForm extends Component {

    state = {
        product: {
            title: '',
            description: '',
            price_pennies: 0,
            image_url: '',
            hide: false,
        },
        titleError: null,
        priceError: null,
        descriptionError: null,
        urlError: null,
    }

    /**
     * Method runs when the component is ready
     * If edit mode is on, sets the state with the product information to edit
     */
    componentDidMount() {
        if (this.props.reduxStore.editMode.edit) {
            this.setState({
                product: {
                    id: this.props.reduxStore.merch.editMerchReducer.id,
                    title: this.props.reduxStore.merch.editMerchReducer.title,
                    description: this.props.reduxStore.merch.editMerchReducer.description,
                    price_pennies: this.props.reduxStore.merch.editMerchReducer.price_pennies,
                    image_url: this.props.reduxStore.merch.editMerchReducer.image_url
                }
            })
        }
    }

    /**
     * Method that handles an input changes
     * event: the change that occurs
     * propToChange: the state property being changed
     * errorToChange: the states error property to change
     */
    handleChangeFor = (event, propToChange, errorToChange) => {
        this.setState({
            product: {
                ...this.state.product,
                [propToChange]: event.target.value
            },
            [errorToChange]: false
        });

        // Checks if the input values are empty and less than 0 in the case of price
        if (event.target.value === '' || (propToChange === 'price_pennies' && event.target.value < 0)) {
            this.setState({
                [errorToChange]: true
            });
        }
    }

    /**
     * Method that handles the form submission
     * Checks for errors for each input, changes state properties accordingly
     * event: submitting the form
     * addOrEdit: checks if the user is adding a new product or editing an existing one
     */
    handleSubmit = (event, addOrEdit) => {
        event.preventDefault();

        if (this.state.product.title === '') {
            this.setState({
                titleError: true
            })
        } else {
            this.setState({
                titleError: false
            })
        }

        if (this.state.product.description === '') {
            this.setState({
                descriptionError: true
            })
        } else {
            this.setState({
                descriptionError: false
            })
        }

        if (this.state.product.price_pennies < 0 || this.state.product.price_pennies === '') {
            this.setState({
                priceError: true
            })
        } else {
            this.setState({
                priceError: false
            })
        }

        if (this.state.product.image_url === '') {
            this.setState({
                urlError: true
            })
        } else {
            this.setState({
                urlError: false
            })
        }

        if (this.state.titleError === false && this.state.priceError === false && this.state.descriptionError === false && this.state.urlError === false) {
            if (addOrEdit === 'add') {
                // Adds product to DB
                this.props.dispatch({ type: 'ADD_PRODUCT', payload: this.state.product });
            } else {
                // Updates product in DB
                this.props.dispatch({ type: 'UPDATE_PRODUCT', payload: this.state.product });
            }
        }
    }

    /**
     * Method conditionally renders a submission button based on if the user
     * is in edit mode or not
     */
    checkEditMode = () => {
        const { classes } = this.props;
        if (this.props.reduxStore.editMode.edit) {
            return (
                <Button
                    variant="contained" className={classes.button}
                    type="submit" onClick={(event) => this.handleSubmit(event, 'edit')}>
                    Update
                </Button>
            );
        } else {
            return (
                <Button
                    variant="contained" className={classes.button}
                    type="submit" onClick={(event) => this.handleSubmit(event, 'add')}>
                    Submit
                </Button>
            );
        }
    }

    // Sends the user back to the manage-merch page
    back = () => {
        this.props.history.push('/manage-merch');
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className="container merch-form-page">
                    <h2 className="page-title">Merch Form</h2>
                    <form className={classes.form} noValidate autoComplete="off">
                        <TextField
                            label="Title"
                            className={classes.textFieldTitle}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                    underline: classes.cssUnderline,
                                },
                            }}
                            value={this.state.product.title}
                            onChange={(event) => this.handleChangeFor(event, 'title', 'titleError')}
                            margin="normal"
                            required
                            error={this.state.titleError}
                        />
                        <br />
                        <TextField
                            label="Price (in pennies)"
                            className={classes.textFieldPrice}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                    underline: classes.cssUnderline,
                                },
                            }}
                            value={this.state.product.price_pennies}
                            onChange={(event) => this.handleChangeFor(event, 'price_pennies', 'priceError')}
                            margin="normal"
                            required
                            type="number"
                            error={this.state.priceError}
                        />
                        <br />
                        <TextField
                            label="Description"
                            multiline
                            rows="6"
                            className={classes.textFieldDescription}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                    underline: classes.cssUnderline,
                                },
                            }}
                            value={this.state.product.description}
                            onChange={(event) => this.handleChangeFor(event, 'description', 'descriptionError')}
                            margin="normal"
                            required
                            error={this.state.descriptionError}
                        />
                        <br />
                        <TextField
                            label="Image URL"
                            className={classes.textFieldImageUrl}
                            InputLabelProps={{
                                classes: {
                                    root: classes.cssLabel,
                                    focused: classes.cssFocused,
                                },
                            }}
                            InputProps={{
                                classes: {
                                    focused: classes.cssFocused,
                                    underline: classes.cssUnderline,
                                },
                            }}
                            value={this.state.product.image_url}
                            onChange={(event) => this.handleChangeFor(event, 'image_url', 'urlError')}
                            margin="normal"
                            required
                            error={this.state.urlError}
                        />
                        <br />
                        <div className={classes.btnGroup}>
                            <Button
                                variant="contained" className={classes.button}
                                onClick={this.back}>
                                Back to Manage Merch
                            </Button>
                            {this.checkEditMode()}
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

// Redux state
const stateToProps = (reduxStore) => ({
    reduxStore
});

export default withStyles(styles)(connect(stateToProps)(MerchForm));