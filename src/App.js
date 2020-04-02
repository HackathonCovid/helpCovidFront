import React from 'react';
import { Redirect, Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Home from './components/Home/Home';
import About from './components/Home/About';
import Profile from './components/Profil/Profile';
import Missions from './components/Missions/Missions';
import AddMission from './components/Missions/AddMission';
import UpdateMission from './components/Missions/UpdateMission';
import MesMissions from './components/Missions/MesMissions';
import FicheMission from './components/Missions/FicheMission';


import history from './history.js';

const NonProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={() => {
      return (
          <React.Fragment>
            <Navbar />
            <Component />
            <Footer />
          </React.Fragment>
      );
    }} />
);

const HomeRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={() => {
      return (
          <React.Fragment>
            <Navbar />
            <Component />
            <About />
            <Footer />
          </React.Fragment>
      );
    }} />
);

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={() => {
      if(localStorage.getItem('user')) {
        return (
            <React.Fragment>
              <Navbar />
              <Component />
              <Footer />
            </React.Fragment>
        );
      } else {
        return (
            <Redirect to='/' />
        );
      }
    }} />
);

export default function App() {
  return (
      <Router history={history}>
        <HomeRoute path="/" component={Home} exact />
        <NonProtectedRoute path="/register/:benevole" component={Register} />
        <NonProtectedRoute path="/login" component={Login} />
        <NonProtectedRoute path="/missions" component={Missions} exact />
        <ProtectedRoute path="/mission/add" component={AddMission} />
        <ProtectedRoute path="/Mesmissions" component={MesMissions} />
        <ProtectedRoute path="/mission/update" component={UpdateMission} />
        <ProtectedRoute path="/profil" component={Profile} />
        <ProtectedRoute path="/mission/fiche/:id" component={FicheMission} />
      </Router>
  );
}
