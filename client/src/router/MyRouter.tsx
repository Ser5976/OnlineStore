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
import Cart from '../pages/Cart';
import PaymetPage from '../pages/PaymetPage';
import ContactPage from '../pages/ContactPage';
import DeliveryPage from '../pages/DeliveryPage';

const MyRouter: React.FC = () => {
  return (
    <div className="wrapper">
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
        <Route component={Cart} path="/cart" />
        <Route component={PaymetPage} path="/paymetPage" />
        <Route component={ContactPage} path="/contactPage" />
        <Route component={DeliveryPage} path="/deliveryPage" />
      </Switch>

      <Footer />
    </div>
  );
};

export default MyRouter;
