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
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { connect } from 'react-redux';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {};
type MapDispathPropsType = {};
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
    top: 0,
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
    padding: '15px 0px 0px 15px',
  },

  media: {
    height: 100,
    cursor: 'pointer',
    paddingTop: 50,
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

const Cart: React.FC<PropsType> = ({}) => {
  const classes = useStyles();

  useEffect(() => {
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
          всего товаров: <span style={{ fontWeight: 'bold' }}>3</span>
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
        ) : [1, 2].length === 0 ? (
          <Typography align="center" className={classes.textTitle}>
            Ваша корзина пуста!
          </Typography>
        ) : (
          <>
            <Box style={{ display: 'flex', flexDirection: 'column' }}>
              {[] &&
                [1, 2].map((item) => {
                  return (
                    <>
                      <Grid container spacing={2} className={classes.root}>
                        <Grid
                          item
                          md={3}
                          className={classes.media}
                          /*  onClick={() => {
                        history.push(`/profileDevice/${item._id}`);
                      }} */
                        >
                          <img
                            // src={`${ROOT_URL}/${picture[0]}`}
                            style={{ height: '100px', width: 'auto' }}
                            alt="картинка"
                          />
                        </Grid>
                        <Grid item md={8} style={{ position: 'relative' }}>
                          <Box>
                            <Typography
                              component="h1"
                              variant="h6"
                              color="initial"
                            >
                              Samsung Galaxy Note9 128Gb
                            </Typography>
                            <Typography variant="subtitle1" color="inherit">
                              1450 p
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              style={{ wordWrap: 'break-word' }}
                            >
                              2 SIM, Android, экран 6.4 ", Super AMOLED,
                              1440x2960, Exynos 9810, оперативная память 6 Гб,
                              встроенная память 128 Гб, камера 12 Мп,
                              аккумулятор 4000 мАч, цвет синий.
                            </Typography>
                          </Box>
                          <HighlightOffIcon
                            className={classes.HighlightOffIcon}
                          />
                        </Grid>
                      </Grid>
                      <Divider />
                    </>
                  );
                })}
            </Box>
          </>
        )}
        <Box marginTop={5} marginBottom={5} className={classes.box_order}>
          <Typography variant="h6" align="center">
            сумма заказа:1200 р
          </Typography>
          <Button className={classes.button_order}>Оформить заказ</Button>
        </Box>
      </Container>
    </Container>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {};
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(
  mapStateToProps,
  {}
)(Cart);
