import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './AdminNav.css';

const AdminNav = (props) => (
    <div className="nav admin-nav">
        <div className="nav-right">
            <Link className="nav-link admin-nav-link" to="/manage-shows">
                Manage Shows
            </Link>
            <Link className="nav-link admin-nav-link" to="/manage-merch">
                Manage Merch
            </Link>
        </div>
    </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(AdminNav);
