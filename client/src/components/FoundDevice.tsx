import React from 'react';
import {
  Typography,
  Divider,
  createStyles,
  makeStyles,
  Grid,
  Box,
} from '@material-ui/core';
import { DeviceType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import { useHistory } from 'react-router-dom';

//типизация----------------------

type PropsType = {
  item: DeviceType; //типизация  выбранного устройства
};
//---------------------------------

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: '15px 0px 0px 15px',
    },

    media: {
      height: 100,
      cursor: 'pointer',
      paddingTop: 50,
    },
  })
);

const FoundDevice: React.FC<PropsType> = ({ item }) => {
  const { name, picture, price } = item;
  const classes = useStyles();
  const history = useHistory();

  return (
    <div>
      <Grid container spacing={2} className={classes.root}>
        <Grid
          item
          md={3}
          className={classes.media}
          onClick={() => {
            history.push(`/profileDevice/${item._id}`);
          }}
        >
          <img
            src={`${ROOT_URL}/${picture[0]}`}
            style={{ height: '100px', width: 'auto' }}
          />
        </Grid>
        <Grid item md={8}>
          <Box style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography component="h5" variant="h5" color="initial">
              {name}
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              {price} p
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              style={{ wordWrap: 'break-word' }}
            >
              2 SIM, Android, экран 6.4 ", Super AMOLED, 1440x2960, Exynos 9810,
              оперативная память 6 Гб, встроенная память 128 Гб, камера 12 Мп,
              аккумулятор 4000 мАч, цвет синий.
            </Typography>
            <Box display="flex" marginTop={2}>
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ cursor: 'pointer', marginRight: '50px' }}
                onClick={() => {
                  history.push(`/profileDevice/${item._id}`);
                }}
              >
                Описание
              </Typography>
              <Typography
                variant="subtitle2"
                color="primary"
                style={{ cursor: 'pointer' }}
              >
                Добавить в карзину
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider />
    </div>
  );
};

export default FoundDevice;
