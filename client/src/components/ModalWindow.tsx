import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { Divider } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

//--типизация----------------------------------
//  пропсы
type PropsType = {
  handleClose: () => void;
  open: boolean;
  title: string;
  addData: (data: { name: string }, handleClose: () => void) => void;
  addedDeviceError: boolean;
  setAddedDeviceError: (data: boolean) => void;
};
//--------------------------------------------
//схема валидации---------------------
const schema = yup.object().shape({
  name: yup.string().required('Поле обязательное для заполнения'),
});
//-----------------------------------------
const useStyles = makeStyles((theme) => ({
  paper: {
    width: 450,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  textTitle: {
    marginTop: '5px',
  },
}));

const ModalWindow: React.FC<PropsType> = ({
  handleClose, //закрытие модального окна
  open, //открытие модального окна
  title, // заголовок(тип или брэнд)
  addData, //функция отправляющая тип или брэнд в базу данных
  addedDeviceError, // ошибка
  setAddedDeviceError, //изменение ошибки
}) => {
  const classes = useStyles();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: { name: string }) => {
    //console.log(data);
    addData(data, handleClose);
  };

  return (
    <Modal open={open} className={classes.modal}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h6" style={{ padding: 15 }}>
          Добавить {title}
        </Typography>
        <Divider />
        {addedDeviceError && (
          <Typography
            align="center"
            color="error"
            className={classes.textTitle}
          >
            Что-то пошло не так!
          </Typography>
        )}
        <form style={{ padding: 15 }} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                label="Введите название типа"
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : null}
              />
            )}
          />
          <div className={classes.buttons}>
            <Button
              variant="outlined"
              color="primary"
              style={{ margin: 5, fontSize: 12 }}
              onClick={() => {
                handleClose();
                setAddedDeviceError(false); //
              }}
            >
              Закрыть
            </Button>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ margin: 5, fontSize: 12 }}
            >
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalWindow;
