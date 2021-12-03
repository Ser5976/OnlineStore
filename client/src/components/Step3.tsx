import React from 'react';
import {
  addedDeviceType,
  setAddedDeviceActionType,
} from '../store/reducer/deviceReducer';
import { useForm, Controller } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
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
  // picture: yup.mixed().required('First name is a required field'),
  //  .test('fileSize', 'The file is too large', (value) => {
  //   return value && value[0].size <= 20000;
  //  }),
});
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#eee',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    marginTop: '20px',
  },
  icon: {
    marginTop: '16px',
    color: '#888888',
    fontSize: '42px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  dropzone: {
    minHeight: 50,
    // marginTop: 15,
    border: '0px',
    '& 	.MuiDropzoneArea-text': { color: '#3f51b5', fontSize: '1.00rem' },
    '& 	.MuiDropzoneArea-icon': { color: '#3f51b5' },
  },
}));

const Step3: React.FC<PropsType> = ({
  addedDevice,
  setAddedDevice,
  handleNext,
  handleBack,
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

  const onSubmit = (data: any) => {
    console.log(data);
    const copyAddedPicture: addedDeviceType = {
      ...addedDevice,
      picture: data.picture,
    };
    setAddedDevice(copyAddedPicture);
    handleNext();
  };
  console.log(errors);
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
      {errors.picture && <p>{errors.picture.message}</p>}
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
export default Step3;
