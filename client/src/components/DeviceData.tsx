import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone'; // загрузка файлов
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { TypeDeviceType, BrandType } from '../store/reducer/deviceReducer';

//типизация данных
type DataDeviceType = {
  name: string;
  price: number;
  picture: any;
  typeId: string;
  brandId: string;
};

//схема валидации---------------------
const schema = yup.object().shape({
  types: yup.string().required('Пожалуйста, выберите тип'),
  brands: yup.string().required('Пожалуйста, выберите брэнд'),
  name: yup.string().required('Поле обязательное для заполнения'),
  price: yup.string().required('Поле обязательное для заполнения'),
});
//-----------------------------------------
// типизация пропсов
type PropsType = {
  types: TypeDeviceType[];
  brands: BrandType[];
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
  button: {
    margin: '15px 15x',
  },
  dropzone: {
    minHeight: 50,
    // marginTop: 15,
    border: '0px',
    '& 	.MuiDropzoneArea-text': { color: '#3f51b5', fontSize: '1.00rem' },
    '& 	.MuiDropzoneArea-icon': { color: '#3f51b5' },
  },
}));

const DeviceData: React.FC<PropsType> = ({ types, brands }) => {
  const history: any = useHistory();
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  // получение данных из формы и отправка на сервак(авторизация или регистрация)
  const onSubmit: SubmitHandler<DataDeviceType> = (
    data: DataDeviceType
  ): void => {
    //console.log('Отправлено:', data);
  };
  // console.log('Отправлено:', errors);
  return (
    <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container component="main">
        <Grid container component="main">
          <Grid item xs={12} sm={6} style={{ padding: '5px 5px' }}>
            <Controller
              name="types"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="type"
                  label="Выберите тип"
                  autoFocus
                  error={!!errors.types}
                  select
                  helperText={errors.types ? errors.types?.message : null}
                >
                  {types.map((item, index) => {
                    return (
                      <MenuItem value={item._id} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Button variant="contained" color="primary" fullWidth>
              Добавить тип
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} style={{ padding: '5px 5px' }}>
            <Controller
              name="brands"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="brands"
                  label="Выберите брэнд"
                  error={!!errors.brands}
                  select
                  helperText={errors.brands ? errors.brands?.message : null}
                >
                  {brands.map((item, index) => {
                    return (
                      <MenuItem value={item._id} key={index}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </TextField>
              )}
            />
            <Button variant="contained" color="primary" fullWidth>
              Добавить брэнд
            </Button>
          </Grid>
        </Grid>

        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Введите название устройства"
              autoFocus
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : null}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="price"
              label="Введите стоимость устройства"
              type="number"
              autoFocus
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : null}
            />
          )}
        />
        <Controller
          name="picture"
          control={control}
          render={({ field }) => (
            <DropzoneArea
              {...field}
              dropzoneText="Перетащите сюда файл или щелкните"
              dropzoneClass={classes.dropzone}
            />
          )}
        />
      </Grid>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Сохранить
      </Button>
    </form>
  );
};
export default DeviceData;
