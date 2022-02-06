import React from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import TextField from '@material-ui/core/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {
  addedDeviceType, //типизация добавленного устройства
  setAddedDeviceActionType, //типизация экшена
} from '../store/reducer/deviceReducer'; //типизация данных

//-----типизация------

// пропсы
type PropsType = {
  addedDevice: addedDeviceType;
  setAddedDevice: (data: addedDeviceType) => setAddedDeviceActionType;
  handleNext: () => void;
  handleBack: () => void;
};

//схема валидации---------------------
//массива info
const schemaInfo = yup.object().shape({
  title: yup.string().required('Поле обязательное для заполнения'),
  description: yup.string().required('Поле обязательное для заполнения'),
});
//общая
const schema = yup.object().shape({
  info: yup.array().of(schemaInfo).optional(),
});
//-----------------------------------------

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  addFieldsButton: {
    backgroundColor: '#0047ae',
    color: '#e0e0e0',
    fontSize: 12,
    '&:hover': {
      backgroundColor: '#1a237e',
    },
    marginBottom: 15,
  },
}));

const DeviceProperty: React.FC<PropsType> = ({
  addedDevice, //добавленное устройство
  setAddedDevice, //запись добавленного устройства в стейт
  handleNext, // вперёд на следующий степ
  handleBack, // назад на предыдущий степ
}) => {
  const { info } = addedDevice;
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      info: info,
    },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'info',
  });
  // получаем данных из формы,создаём копию объекта добавленного устройства,изменяем данные, которые получем из формы, и записываем в стейт
  const onSubmit = (data: addedDeviceType): void => {
    // console.log('data', data.info);
    const copyAddedDevice: addedDeviceType = {
      ...addedDevice,
      info: data.info,
    };
    setAddedDevice(copyAddedDevice);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        variant="contained"
        className={classes.addFieldsButton}
        onClick={() => {
          append({ title: '', description: '' });
        }}
      >
        Добавить поле
      </Button>
      {fields.map((item, index) => {
        return (
          <Grid container spacing={3} key={item.id}>
            <Grid item xs={12} sm={3}>
              <Controller
                name={`info.${index}.title` as const}
                control={control}
                defaultValue={item.title}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label=" название "
                    {...field}
                    error={!!errors.info}
                    helperText={
                      errors?.info?.[index]?.title
                        ? errors.info[index].title?.message
                        : null
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={7}>
              <Controller
                name={`info.${index}.description` as const}
                control={control}
                defaultValue={item.description}
                render={({ field }) => (
                  <TextField
                    {...field}
                    multiline
                    fullWidth
                    label=" описание "
                    error={!!errors.info}
                    helperText={
                      errors?.info?.[index]?.description
                        ? errors.info[index].description?.message
                        : null
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <IconButton onClick={() => remove(index)} color="secondary">
                <HighlightOffIcon style={{ fontSize: 30 }} />
              </IconButton>
            </Grid>
          </Grid>
        );
      })}
      <div className={classes.buttons}>
        <IconButton style={{ color: '#3f51b5' }} onClick={handleBack}>
          <ArrowBackSharpIcon />
        </IconButton>
        <IconButton type="submit" style={{ color: '#3f51b5' }}>
          <ArrowForwardSharpIcon />
        </IconButton>
      </div>
    </form>
  );
};
export default DeviceProperty;
