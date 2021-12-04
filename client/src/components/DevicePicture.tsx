import React from 'react';
import {
  addedDeviceType, //типизация добавленного устройства
  setAddedDeviceActionType, //типизация экшена
} from '../store/reducer/deviceReducer';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardSharpIcon from '@material-ui/icons/ArrowForwardSharp';
import ArrowBackSharpIcon from '@material-ui/icons/ArrowBackSharp';
import { DropzoneArea } from 'material-ui-dropzone'; // загрузка файлов

//-----------------------------------------
// типизация пропсов
type PropsType = {
  addedDevice: addedDeviceType;
  setAddedDevice: (data: addedDeviceType) => setAddedDeviceActionType;
  handleNext: () => void;
  handleBack: () => void;
};
//--------------------------------------------
const schema = yup.object().shape({
  picture: yup.mixed().test('required', 'Необходимо добавить файл', (value) => {
    return value && value.length;
  }),
  /* .test("fileSize", "The file is too large", (value, context) => {
    return value && value[0] && value[0].size <= 200000;
  })
  .test("type", "We only support jpeg", function (value) {
    return value && value[0] && value[0].type === "image/jpeg";
  }), */
});
const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  dropzone: {
    minHeight: 50,
    border: '0px',
    '& 	.MuiDropzoneArea-text': { fontSize: '1.00rem' },
    '& 	.MuiDropzoneArea-icon': { color: '#3f51b5', marginBottom: 25 },
  },
}));

const DevicePicture: React.FC<PropsType> = ({
  addedDevice, //добавленное устройство
  setAddedDevice, //запись добавленного устройства в стейт
  handleNext, // вперёд на следующий степ
  handleBack, // назад на предыдущий степ
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
  // получаем данных из формы,создаём копию объекта добавленного устройства,изменяем данные, которые получем из формы, и записываем в стейт
  const onSubmit = (data: any) => {
    //console.log(data);
    const copyAddedPicture: addedDeviceType = {
      ...addedDevice,
      picture: data.picture,
    };
    setAddedDevice(copyAddedPicture);
    handleNext();
  };
  // console.log(errors);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="picture"
        control={control}
        defaultValue={addedDevice.picture}
        render={({ field }) => (
          <DropzoneArea
            {...field}
            initialFiles={addedDevice.picture}
            filesLimit={7}
            dropzoneText="Перетащите сюда файл или щелкните"
            dropzoneClass={classes.dropzone}
          />
        )}
      />
      {errors.picture && (
        <Typography
          component="h1"
          variant="subtitle1"
          align="center"
          color="error"
        >
          {errors.picture.message}
        </Typography>
      )}
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
export default DevicePicture;
