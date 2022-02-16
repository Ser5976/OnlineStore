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
import { ProductType } from '../action/basketAction';
import { SetPathActionType } from '../store/reducer/authReducer';

//типизация----------------------

type PropsType = {
  item: DeviceType; //типизация  выбранного устройства
  addProductCart: (product: ProductType) => void;
  handleClick: () => void;
  isAuth: boolean;
  setPath: (value: string) => SetPathActionType;
  path: string;
};
//---------------------------------

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      padding: 25,
    },

    media: {
      height: 100,
      cursor: 'pointer',
      paddingTop: 50,
    },
    typography: {
      wordWrap: 'break-word',
    },
    lower_typography: {
      cursor: 'pointer',
      marginRight: '50px',
      color: '#0047ae',
      '&:hover': {
        color: '#29b6f6',
      },
    },
  })
);

const Device: React.FC<PropsType> = ({
  item, //девайс
  addProductCart, //добавление товара в корзину
  isAuth, //маркер авторизации
  handleClick, //открытие алерта(добавления товара в корзину либо ошибки)
  setPath, //запись пути последнего клика
  path, //путь последнего клика
}) => {
  const { name, picture, price, description } = item;
  const classes = useStyles();
  const history = useHistory();

  // добавление товара в корзину(если ошибка - показываем алерт ошибки,если неавторизирован-авторизация,если всё норм-алерт норм)
  const addToCart = (item: DeviceType) => {
    const { name, picture, price, description, _id: id } = item;
    if (isAuth) {
      const product: ProductType = {
        name,
        picture,
        price,
        description,
        id,
      };
      addProductCart(product); // передаем объек товара в базу корзины
    } else {
      history.push('/login');
    }
  };

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
          <Box>
            <Typography
              component="h5"
              variant="h5"
              color="initial"
              className={classes.typography}
            >
              {name}
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              {price} p
            </Typography>
            <Typography
              variant="subtitle2"
              color="textSecondary"
              className={classes.typography}
            >
              {description}
            </Typography>
            <Box display="flex" marginTop={2}>
              <Typography
                variant="subtitle2"
                className={classes.lower_typography}
                onClick={() => {
                  history.push(`/profileDevice/${item._id}`);
                }}
              >
                Описание
              </Typography>
              <Typography
                variant="subtitle2"
                className={classes.lower_typography}
                onClick={() => {
                  addToCart(item);
                  setPath(path);
                  handleClick();
                }}
              >
                Добавить в корзину
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider />
    </div>
  );
};

export default Device;
