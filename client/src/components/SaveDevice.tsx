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

const SaveDevice: React.FC<PropsType> = ({
  addedDevice, //добавленное устройство
  setAddedDevice, //запись добавленного устройства в стейт
  handleNext, // вперёд на следующий степ
  handleBack, // назад на предыдущий степ
}) => {
  const classes = useStyles();

  return <div>Привет</div>;
};
export default SaveDevice;
