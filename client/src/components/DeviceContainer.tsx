import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';
import Masonry from 'react-masonry-css'; // контейнерный компонент для стиля(расположение элементов)
import Device from './Device';
import { DeviceType } from '../store/reducer/deviceReducer';
import { AuthReducerType } from '../store/reducer/authReducer';

//----типизация пропсов----
type PropsType = {
  devices: DeviceType[];
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
}));

const breakpoints = {
  default: 5,
  1100: 2,
  700: 1,
}; // это для Masonry,компонент регулирет расположение карточек(отдельно установлен)
const DeviceContainer: React.FC<PropsType> = ({
  devices,
  auth,
  isAuth,
  removeDevice,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.imageContainer}>
        <Grid item sm={7}>
          <Container maxWidth="md">
            <div className={classes.jumbo}>
              <div className={classes.overlay}></div>
            </div>
          </Container>
        </Grid>
        <Grid item sm={5}>
          <div className={classes.jumbo2} style={{ marginRight: '20px' }}>
            <div className={classes.overlay}></div>
          </div>
        </Grid>
      </Grid>
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
      </Masonry>
    </>
  );
};

export default DeviceContainer;
