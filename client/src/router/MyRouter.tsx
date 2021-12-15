import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import AuthContainer from '../pages/AuthContainer';
import Content from '../pages/Content';
import AddDevicesContainer from '../pages/AddDevicesContainer';
import ProfileDevice from '../pages/ProfileDevice';

const MyRouter: React.FC = () => {
  return (
    <Grid container direction="column">
      <Header />
      <Switch>
        <Route component={Content} path="/" exact />
        <Route component={AuthContainer} path="/login" exact />
        <Route component={AuthContainer} path="/registration" exact />
        <Route
          component={AddDevicesContainer}
          path="/addDevicesContainer"
          exact
        />
        <Route component={ProfileDevice} path="/profile/:id" />
      </Switch>
    </Grid>
  );
};

export default MyRouter;
