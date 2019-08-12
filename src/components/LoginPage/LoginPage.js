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
  buttonRegister: {
    marginTop: 0
  },
  form: {
    width: 250,
    textAlign: "center"
  },
  title: {
    fontSize: 30,
    margin: "0 0 10px 0",
  }
});

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
  };

  login = (event) => {
    event.preventDefault();

    if (this.state.username && this.state.password) {
      this.props.dispatch({
        type: 'LOGIN',
        payload: {
          username: this.state.username,
          password: this.state.password,
        },
      });
    } else {
      this.props.dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  } // end login

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <>
        {this.props.errors.loginMessage && (
          <h2
            className="alert"
            role="alert"
          >
            {this.props.errors.loginMessage}
          </h2>
        )}
        <form onSubmit={this.login} className={classes.form}>
          <h2 className={classes.title}>Login</h2>
          <div>
            <TextField
              label="Username"
              className={classes.textField}
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
              value={this.state.password}
              onChange={this.handleInputChangeFor('password')}
              margin="normal"
              required
            />
          </div>
          <br/>
          <div>
            <Button
              variant="contained" 
              className={classes.button}
              type="submit">
              Login
            </Button>
          </div>
        </form>
        <center>
          <h4>Haven't made a greasy account yet? Register now!</h4>
          <Button
            variant="contained" className={`${classes.button} ${classes.buttonRegister}`}
            type="submit" onClick={() => {this.props.dispatch({ type: 'SET_TO_REGISTER_MODE' })}}>
            Register
          </Button>
        </center>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the error messages.
// if you wanted you could write this code like this:
// const mapStateToProps = ({errors}) => ({ errors });
const mapStateToProps = state => ({
  errors: state.errors,
});

export default withStyles(styles)(connect(mapStateToProps)(LoginPage));
