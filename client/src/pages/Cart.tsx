import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Box, Container, Button, Divider } from '@material-ui/core';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { getProductCart, deleteProductCart } from '../action/basketAction';
import { BasketType } from '../store/reducer/basketReducer';
import { ROOT_URL } from '../constants/url';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  basket: BasketType[];
  totalCount: number;
  totalPrice: number;
};
type MapDispathPropsType = {
  getProductCart: () => void;
  deleteProductCart: (id: string) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;

//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    marginTop: 15,
  },
  shoppingCartOutlinedIcon: {
    fontSize: '24px',
    position: 'relative',
    top: '3px',
    right: '10px',
  },
  deleteCart: {
    display: 'flex',
    position: 'relative',
    top: '10px',
    cursor: 'pointer',
    '&:hover': {
      color: '#000',
    },
  },
  HighlightOffIcon: {
    fontSize: '24px',
    position: 'absolute',
    top: 15,
    right: 0,
    cursor: 'pointer',
    color: 'grey',
    '&:hover': {
      color: 'red',
    },
  },
  textTitle: {
    marginTop: '50px',
    marginBottom: '50px',
  },
  root: {
    padding: '25px ',
    position: 'relative',
  },

  media: {
    height: 100,
    cursor: 'pointer',
  },
  box_order: {
    '@media (min-width:600px)': {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  button_order: {
    backgroundColor: '#0047ae',
    color: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#1a237e',
    },
    '@media (max-width:600px)': {
      width: '100%',
    },
  },
}));

const Cart: React.FC<PropsType> = ({
  getProductCart, // запрос на корзину
  deleteProductCart, // удаление товаров из корзины
  basket,
  totalCount,
  totalPrice,
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    getProductCart();
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      <Box className={classes.breadcrumb}>
        <ActiveLastBreadcrumb name="Корзина" />
      </Box>
      <Container maxWidth="md">
        <Typography
          component="h1"
          variant="h5"
          align="center"
          style={{ marginTop: '25px' }}
        >
          <ShoppingCartOutlinedIcon
            className={classes.shoppingCartOutlinedIcon}
          />{' '}
          Корзина
        </Typography>
        <Typography
          color="textPrimary"
          align="center"
          style={{ marginBottom: '25px' }}
        >
          всего товаров:{' '}
          <span style={{ fontWeight: 'bold' }}>{totalCount}</span>
        </Typography>
        {false ? (
          <Typography
            align="center"
            color="error"
            className={classes.textTitle}
          >
            Что-то пошло не так!
          </Typography>
        ) : false ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            style={{ paddingTop: '50px' }}
          >
            <CircularProgress />
          </Box>
        ) : basket.length === 0 ? (
          <Typography align="center" className={classes.textTitle}>
            Ваша корзина пуста!
          </Typography>
        ) : (
          <>
            <Box>
              {basket &&
                basket.map((item) => {
                  return (
                    <div key={item.id}>
                      <Grid container spacing={2} className={classes.root}>
                        <Grid
                          item
                          md={3}
                          className={classes.media}
                          onClick={() => {
                            history.push(`/profileDevice/${item.id}`);
                          }}
                        >
                          <img
                            src={`${ROOT_URL}/${item.picture[0]}`}
                            style={{ height: '100px', width: 'auto' }}
                            alt="картинка"
                          />
                        </Grid>
                        <Grid item md={8}>
                          <Box>
                            <Typography
                              component="h1"
                              variant="h6"
                              color="initial"
                            >
                              {item.name}
                            </Typography>
                            <Typography variant="subtitle1" color="inherit">
                              {item.price} p
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              style={{ wordWrap: 'break-word' }}
                            >
                              {item.description}
                            </Typography>
                          </Box>
                          <Box
                            className={classes.HighlightOffIcon}
                            onClick={() => deleteProductCart(item.id)}
                          >
                            <span
                              style={{
                                position: 'absolute',
                                fontSize: '20px',
                                bottom: 7,
                                right: 25,
                              }}
                            >
                              {item.quantity}
                            </span>
                            <HighlightOffIcon />
                          </Box>
                        </Grid>
                      </Grid>
                      <Divider />
                    </div>
                  );
                })}
            </Box>
          </>
        )}
        <Box marginTop={5} marginBottom={5} className={classes.box_order}>
          <Typography variant="h6" align="center">
            сумма заказа:{totalPrice} р
          </Typography>
          <Button className={classes.button_order}>Оформить заказ</Button>
        </Box>
      </Container>
    </Container>
  );
};

const mapStateToProps = ({ basket }: RootStateType): MapStateToPropsType => {
  return {
    basket: basket.basket, //массив товаров в корзине
    totalCount: basket.totalCount, //количество товаров в корзине
    totalPrice: basket.totalPrice, //сумма заказа
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getProductCart, deleteProductCart })(Cart);
