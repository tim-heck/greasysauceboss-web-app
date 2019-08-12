import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import './App.css';

import HomePage from '../HomePage/HomePage';
import BandPage from '../BandPage/BandPage';
import ShowsPage from '../ShowsPage/ShowsPage';
import ReleasesPage from '../ReleasesPage/ReleasesPage';
import CartPage from '../CartPage/CartPage';
import ManageMerch from '../Admin/ManageMerch/ManageMerch';
import ManageShows from '../Admin/ManageShows/ManageShows';
import MerchForm from '../Admin/ManageMerch/MerchForm';
import ShowsForm from '../Admin/ManageShows/ShowsForm';
import MerchPage from '../MerchPage/MerchPage';
// import ReviewPage from '../ReviewPage/ReviewPage';
import MerchItemPage from '../MerchPage/MerchItemPage';
import ProfilePage from '../ProfilePage/ProfilePage';

class App extends Component {
  // componentDidMount () {
  //   this.props.dispatch({type: 'FETCH_USER'})
  // }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/news" />
            {/* Any user can see all Routes, but not all ProtectedRoutes*/}
            <Route
              exact
              path="/news"
              component={HomePage}
            />
            <Route
              exact
              path="/shows"
              component={ShowsPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/merch will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/merch"
              component={MerchPage}
            />
            <ProtectedRoute
              exact
              path="/merch/:id/:title"
              component={MerchItemPage}
            />
            <Route
              exact
              path="/band"
              component={BandPage}
            />
            <Route
              exact
              path="/releases"
              component={ReleasesPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/cart"
              component={CartPage}
            />
            {/* STRETCH GOAL - Review page would be added with STRIPE */}
            {/* <ProtectedRoute
              exact
              path="/review-order"
              component={ReviewPage}
            /> */}
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfilePage}
            />
            <ProtectedRoute
              exact
              path="/manage-shows"
              component={ManageShows}
            />
            <ProtectedRoute
              exact
              path="/manage-merch"
              component={ManageMerch}
            />
            <ProtectedRoute
              exact
              path="/merch-form"
              component={MerchForm}
            />
            <ProtectedRoute
              exact
              path="/shows-form"
              component={ShowsForm}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
