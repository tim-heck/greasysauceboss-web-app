import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  textField: {
    width: 200,
    margin: "5px 0 0 0"
  },
  button: {
    fontFamily: "Montserrat, sans-serif",
    backgroundColor: "#1f2833",
    marginTop: "20px",
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
  buttonLogin: {
    marginTop: 0
  },
  form: {
    width: 250,
    textAlign: "center"
  },
  title: {
    fontSize: 30,
    margin: "0 0 10px 0",
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

class RegisterPage extends Component {
  state = {
    username: '',
    password: '',
    firstName: '',
  };

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'REGISTER',
        payload: {
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName
        },
      });
    } else {
      this.props.dispatch({ type: 'REGISTRATION_INPUT_ERROR' });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <form onSubmit={this.registerUser} className={classes.form}>
          <h1 className={classes.title}>Register User</h1>
          {this.props.errors.registrationMessage && (
            <h6 className="alert" role="alert">
              {this.props.errors.registrationMessage}
            </h6>
          )}
          <div>
            <TextField
              label="Username"
              className={classes.textField}
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
              value={this.state.username}
              onChange={this.handleInputChangeFor('username')}
              margin="normal"
              required
            />
          </div>
          <div>
            <TextField
              type="password"
              label="Password"
              className={classes.textField}
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
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
              required
            />
          </div>
          <div>
            <TextField
              label="First Name"
              className={classes.textField}
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
              value={this.state.firstName}
              onChange={this.handleInputChangeFor('firstName')}
              margin="normal"
              required
            />
          </div>
          <br />
          <div>
            <Button
              variant="contained"
              className={classes.button}
              type="submit">
              Register
            </Button>
          </div>
        </form>
        <center>
          <h4>Already have a greasy account? Login now!</h4>
          <Button
            variant="contained" className={`${classes.button} ${classes.buttonLogin}`}
            type="submit" onClick={() => { this.props.dispatch({ type: 'SET_TO_LOGIN_MODE' }) }}>
            Login
          </Button>
          <h4>Don't want to create an account yet? No problem!</h4>
          <Button
            variant="contained" className={`${classes.button} ${classes.buttonLogin}`}
            type="submit" onClick={this.continueAsGuest}>
            Continue as guest
          </Button>
        </center>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(RegisterPage));

