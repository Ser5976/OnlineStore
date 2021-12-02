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
  addedDeviceType,
  InfoType,
  setAddedDeviceActionType,
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
/* const info = [
  { title: 'gfgfgfgf', description: 'gfgfg' },
  { title: 'kghkhkhjkj', description: 'dgfbjfgghk' },
]; */

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
}));

const DeviceProperty: React.FC<PropsType> = ({
  addedDevice,
  setAddedDevice,
  handleNext,
  handleBack,
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

  const onSubmit = (data: InfoType[]): void => {
    console.log('data', data);
    handleNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        color="primary"
        style={{ marginBottom: 15, fontSize: 12 }}
        onClick={() => {
          append({ title: '', description: '' });
        }}
      >
        Добавить новое поле
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
              <IconButton onClick={() => remove(index)}>
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
