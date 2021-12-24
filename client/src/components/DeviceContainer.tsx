import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid, Typography, Divider } from '@material-ui/core';
import Masonry from 'react-masonry-css'; // контейнерный компонент для стиля(расположение элементов)
import Device from './Device';
import { DeviceType } from '../store/reducer/deviceReducer'; //типизация устройств
import { AuthReducerType } from '../store/reducer/authReducer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom';
import {
  TypeDeviceType, // типизация типов устройст
  setBrandIdActionType, //типизация экшена запись брэнда в стейт
  setTypeIdActionType, //типизация экшена запись типа в стейт
} from '../store/reducer/deviceReducer';
import byk1 from '../img/byk1.jpg';
import planshet1 from '../img/planshet1.jpg';
import reclama1 from '../img/reclama1.jpg';

//----типизация пропсов----
type PropsType = {
  devices: DeviceType[];
  types: TypeDeviceType[];
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;

  auth: AuthReducerType;
  isAuth: boolean;
  removeDevice: (id: string | undefined) => void;
};
//-------------------------

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  jumbo2: {
    backgroundImage: "url('/images/os5.png')",
    backgroundRepeat: 'no-repeat fixed bottom',
    backgroundSize: 'cover',
    color: '#efefef',
    height: '400px',
    position: 'relative',
    zIndex: -2,
    top: 0,
  },
  jumbo: {
    backgroundImage: "url('/images/os9.png')",
    backgroundRepeat: 'no-repeat fixed bottom',
    backgroundSize: 'cover',
    color: '#efefef',
    height: '400px',
    position: 'relative',
    zIndex: -2,
    top: 0,
  },
  overlay: {
    backgroundColor: '#000',
    opacity: 0.5,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  imageContainer: {
    display: 'none',
    '@media (min-width:600px)': {
      marginTop: '20px',
      display: 'flex',
    },
  },
  link: {
    textDecoration: 'none',
    color: 'initial',
  },
}));

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
}; // это для Masonry,компонент регулирет расположение карточек(отдельно установлен)
const DeviceContainer: React.FC<PropsType> = ({
  devices, // устройства
  types, // типы устройств
  setTypeId, // запись типа устройства в стейт
  setBrandId, //запись брэнда устройства в стейт

  auth,
  isAuth,
  removeDevice,
}) => {
  const classes = useStyles();
  //запись выбранного типа устройства в стейт и удаление существующего брэнда из стейта
  const handleDevice = (id: string) => {
    setTypeId(id);
    setBrandId(null);
  };
  return (
    <>
      <Grid container className={classes.imageContainer}>
        <Grid item sm={6}>
          <Container maxWidth="md">
            <div className={classes.jumbo2}>
              <div className={classes.overlay}></div>
            </div>
          </Container>
        </Grid>
        <Grid item sm={6}>
          <div className={classes.jumbo} style={{ marginRight: '20px' }}>
            <div className={classes.overlay}></div>
          </div>
        </Grid>
      </Grid>
      <Container maxWidth="lg">
        <Grid container spacing={10}>
          <Grid item xs={12} sm={3}>
            <Typography style={{ marginTop: '115px', fontWeight: 'bold' }}>
              {' '}
              Каталог товаров
            </Typography>
            <List component="nav" aria-label="main mailbox folders">
              {types &&
                types.map((type) => {
                  return (
                    <div key={type._id}>
                      <ListItem
                        button
                        onClick={() => {
                          handleDevice(type._id);
                        }}
                      >
                        <ListItemText
                          primary={
                            <Link
                              to={`/profileType/${type._id}`}
                              className={classes.link}
                            >
                              {type.name}
                            </Link>
                          }
                        />
                      </ListItem>
                      <Divider />
                    </div>
                  );
                })}
            </List>
            <div>
              <img
                src={reclama1}
                style={{ height: '200px', width: 'auto', marginTop: '25px' }}
              />
              <img
                src={planshet1}
                style={{ height: '205px', width: 'auto', marginTop: '25px' }}
              />
              <img
                src={byk1}
                style={{ height: '205px', width: 'auto', marginTop: '25px' }}
              />
            </div>
          </Grid>
          <Grid item xs={false} sm={9}>
            <Typography variant="h6" style={{ marginTop: '50px' }}>
              {' '}
              Все товары
            </Typography>
            <Divider />
            <Masonry
              breakpointCols={breakpoints}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {devices.map((item) => {
                return (
                  <Device
                    item={item}
                    key={Math.random()}
                    auth={auth}
                    isAuth={isAuth}
                    removeDevice={removeDevice}
                  />
                );
              })}
            </Masonry>{' '}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DeviceContainer;
