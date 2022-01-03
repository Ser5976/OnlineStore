import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import AuthContainer from '../pages/AuthContainer';
import Content from '../pages/Content';
import AddDevicesContainer from '../pages/AddDevicesContainer';
import ProfileDevice from '../pages/ProfileDevice';
import ProfileType from '../pages/ProfileType';
import Footer from '../components/Footer';
import DeleteContainer from '../pages/DeleteContainer';
import SearchPage from '../pages/SearchPage';

const MyRouter: React.FC = () => {
  return (
    <Grid container direction="column">
      <Header />
      <Switch>
        <Route component={Content} path="/" exact />
        <Route component={DeleteContainer} path="/deleteContainer" exact />
        <Route component={SearchPage} path="/searchPage" exact />
        <Route component={AuthContainer} path="/login" exact />
        <Route component={AuthContainer} path="/registration" exact />
        <Route
          component={AddDevicesContainer}
          path="/addDevicesContainer"
          exact
        />
        <Route component={ProfileDevice} path="/profileDevice/:id" />
        <Route component={ProfileType} path="/profileType/:id" />
      </Switch>
      <Footer />
    </Grid>
  );
};

export default MyRouter;
