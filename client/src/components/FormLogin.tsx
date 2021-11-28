import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { AuthType } from '../action/authAction';
import { useHistory } from 'react-router-dom';

//схема валидации---------------------
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Введите правильный email')
    .required('Обязательное поле'),
  password: yup
    .string()
    .required('Поле обязательное для заполнения')
    .min(5, 'Минимальное количество символов'),
});
//-----------------------------------------
// типизация пропсов
type PropsType = {
  authorization: (value: AuthType, history: any) => void;
  registration: (value: AuthType, history: any) => void;
  errorMessage: string | null;
  isLogin: boolean;
};
//--------------------------------------------

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    pointerEvents: 'none',
  },
}));

const FormLogin: React.FC<PropsType> = ({
  authorization,
  registration,
  isLogin,
  errorMessage,
}) => {
  const history: any = useHistory();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AuthType>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  // получение данных из формы и отправка на сервак(авторизация или регистрация)
  const onSubmit: SubmitHandler<AuthType> = (data: AuthType): void => {
    if (isLogin) {
      authorization(data, history);
      console.log('Авторизация:', data);
    } else {
      registration(data, history);
      console.log('Регистрация:', data);
    }
  };

  return (
    <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Email"
            autoComplete="text"
            autoFocus
            error={!!errors.email}
            helperText={errors.email ? errors.email?.message : null}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password}
            helperText={errors.password ? errors.password?.message : null}
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Войти
      </Button>
      <Grid container>
        <Grid item>
          <Link
            href="#"
            variant="body2"
            className={errorMessage ? classes.link : undefined}
            onClick={
              isLogin
                ? () => history.push('/registration')
                : () => history.push('/login')
            }
          >
            {isLogin
              ? 'Нет учетной записи? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};
export default FormLogin;
