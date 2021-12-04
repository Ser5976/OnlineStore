import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import {
  TypeDeviceType, //типизация типов
  BrandType, //типизация брэндов
  addedDeviceType, //типизация добавленного устройства
  setAddedDeviceActionType, //типизация экшена
} from '../store/reducer/deviceReducer';

//схема валидации---------------------
const schema = yup.object().shape({
  typeId: yup.string().required('Пожалуйста, выберите тип'),
  brandId: yup.string().required('Пожалуйста, выберите брэнд'),
  name: yup.string().required('Поле обязательное для заполнения'),
  price: yup.string().required('Поле обязательное для заполнения'),
});
//-----------------------------------------
// типизация пропсов
type PropsType = {
  types: TypeDeviceType[];
  brands: BrandType[];
  addedDevice: addedDeviceType;
  setAddedDevice: (data: addedDeviceType) => setAddedDeviceActionType;
  handleNext: () => void;
};
//--------------------------------------------

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    margin: '15px 15x',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const DeviceData: React.FC<PropsType> = ({
  types, //типы устройств
  brands, // брэнды
  addedDevice, //добавленное устройство
  setAddedDevice, //запись добавленного устройства в стейт
  handleNext, // вперёд на следующий степ
}) => {
  const classes = useStyles();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  // получаем данных из формы,создаём копию объекта добавленного устройства,изменяем данные, которые получем из формы, и записываем в стейт
  const onSubmit: SubmitHandler<addedDeviceType> = (
    data: addedDeviceType
  ): void => {
    //console.log('Отправлено:', data);
    const copyAddedDevice: addedDeviceType = {
      ...addedDevice,
      name: data.name,
      price: data.price,
      typeId: data.typeId,
      brandId: data.brandId,
    };
    setAddedDevice(copyAddedDevice);
    handleNext();
  };
  // console.log('Ошибка:', errors);
  return (
    <form noValidate className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Grid container component="main">
        <Grid container component="main">
          <Grid item xs={12} sm={6} style={{ padding: '5px 5px' }}>
            <Controller
              name="typeId"
              control={control}
              defaultValue={addedDevice.typeId}
              render={({ field }) => (
                <TextField
                  {...field}
                  //  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Выберите тип"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.typeId}
                  select
                  helperText={errors.typeId ? errors.typeId?.message : null}
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
          </Grid>

          <Grid item xs={12} sm={6} style={{ padding: '5px 5px' }}>
            <Controller
              name="brandId"
              control={control}
              defaultValue={addedDevice.brandId}
              render={({ field }) => (
                <TextField
                  {...field}
                  // variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Выберите брэнд"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton>
                          <AddCircleOutlineIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  error={!!errors.brandId}
                  select
                  helperText={errors.brandId ? errors.brandId?.message : null}
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
          </Grid>
        </Grid>

        <Controller
          name="name"
          control={control}
          defaultValue={addedDevice.name}
          render={({ field }) => (
            <TextField
              {...field}
              // variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Введите название устройства"
              error={!!errors.name}
              helperText={errors.name ? errors.name?.message : null}
            />
          )}
        />
        <Controller
          name="price"
          control={control}
          defaultValue={addedDevice.price}
          render={({ field }) => (
            <TextField
              {...field}
              //variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Введите стоимость устройства"
              error={!!errors.price}
              helperText={errors.price ? errors.price?.message : null}
            />
          )}
        />
      </Grid>
      <div className={classes.buttons}>
        <IconButton type="submit" style={{ color: '#3f51b5' }}>
          <ArrowForwardSharpIcon />
        </IconButton>
      </div>
    </form>
  );
};
export default DeviceData;
