import React from 'react';
import { useLocation } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Copyright from '../components/Copyright';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import FormLogin from '../components/FormLogin';
import { makeStyles } from '@material-ui/core/styles';
import { authorization, registration } from '../action/authAction';
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { RootStateType } from '../store/store';
import { AuthType } from '../action/authAction';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
// типизация пропсов
type MapStateToPropsType = {
  errorMessage: string | null;
};
type MapDispathPropsType = {
  authorization: (value: AuthType, history: any) => void;
  registration: (value: AuthType, history: any) => void;
};
type PropsType = MapDispathPropsType & MapStateToPropsType;

const useStyles = makeStyles((theme) => ({
  breadcrumb: {
    margin: 15,
  },
  root: {
    height: '100vh',
  },
  paper: {
    // margin: theme.spacing(1, 1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: { color: theme.palette.secondary.main },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AuthContainer: React.FC<PropsType> = ({
  authorization, //отправка авторизации на сервак
  registration, //отправка регистрации на сервак
  errorMessage, // ошибка авторизации
}) => {
  const classes = useStyles();
  //Чтобы поменять авторизацию на регистрацию
  const location = useLocation();
  console.log(location);
  const isLogin: boolean = location.pathname === '/login';

  return (
    <Container maxWidth="lg">
      <Box className={classes.breadcrumb}>
        <ActiveLastBreadcrumb name={isLogin ? 'авторизация' : 'регистрация'} />
      </Box>
      <Grid
        container
        component="main"
        className={classes.root}
        justifyContent="center"
        alignItems="center"
      >
        <CssBaseline />

        <Grid item>
          <Box className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? <div>Войти</div> : <div>Зарегистрироваться</div>}
            </Typography>
            {errorMessage ? (
              errorMessage === 'Request failed with status code 400' ? (
                <Typography
                  component="h1"
                  variant="body1"
                  className={classes.error}
                >
                  {isLogin ? (
                    <div> Неверный логин и пароль</div>
                  ) : (
                    <div>Пользователь с таким именем уже существует</div>
                  )}
                </Typography>
              ) : (
                <Typography
                  component="h1"
                  variant="body1"
                  className={classes.error}
                >
                  Что то пошло не так
                </Typography>
              )
            ) : null}

            <FormLogin
              authorization={authorization}
              isLogin={isLogin}
              errorMessage={errorMessage}
              registration={registration}
            />

            <Box mt={5}>
              <Copyright />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    errorMessage: state.auth.errorMessage, //ошибка авторизации
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { authorization, registration })(AuthContainer);

//xs={12} sm={4} md={8}
