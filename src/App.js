import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Header from './Component/Header/Header';
import Home from './Component/Home/Home';
import Tour from './Component/Tours/Tour';
import NoMatch from './NoMatch/NoMatch';
import TourDetails from './Component/TourDetails/TourDetails';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import Login from './Component/Login/Login';
import Booking from './Component/Booking/Booking';
import 'bootstrap/dist/css/bootstrap.min.css';


export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
      <h3>email: {loggedInUser.email}</h3>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/hotels/:title">
            <TourDetails />
          </Route>
          <PrivateRoute path="/booking/:title">
            <Booking />
          </PrivateRoute>
          <Route path="/tour">
            <Tour />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>

    </UserContext.Provider >
  );
}

export default App;
