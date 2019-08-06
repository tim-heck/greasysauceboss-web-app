import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import AdminNav from '../Admin/AdminNav/AdminNav';

const Nav = (props) => (
  <>
    <div className="nav">
      <Link to="/news">
        <img className="logo" src="images/greasysauceboss-logo-w.svg" alt="GreasySauceBoss" />
      </Link>
      <div className="nav-right">
        <Link className="nav-link" to="/news">
          News
        </Link>
        <Link className="nav-link" to="/shows">
          Shows
        </Link>
        <Link className="nav-link" to="/merch">
          Merch
        </Link>
        <Link className="nav-link" to="/band">
          Band
        </Link>
        <Link className="nav-link" to="/releases">
          Releases
        </Link>
        <Link className="nav-link" to="/cart">
          Your Cart
        </Link>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.user.id && (
          <>
            <LogOutButton className="nav-link nav-link-button" />
          </>
        )}
      </div>
    </div>
    {props.user.id && props.user.admin === true && (
      <>
        <AdminNav /> 
      </>
    )}
  </>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
