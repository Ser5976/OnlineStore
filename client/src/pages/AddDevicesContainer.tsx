import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
//import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeviceData from '../components/DeviceData';
import DeviceProperty from '../components/DeviceProperty';
import DevicePicture from '../components/DevicePicture';
import Grid from '@material-ui/core/Grid';
import { RootStateType } from '../store/store'; //типизиция всего стора
import {
  TypeDeviceType, //типизация типов
  BrandType, //типизация брэндов
  setAddedDevice, //экшен запись добавленного девайса в стейт
  setAddedDeviceActionType, //типизация экшена
  addedDeviceType, // типизация добавленного устройства\
  setAddedDeviceError, //изменения ошибки
} from '../store/reducer/deviceReducer';
import { addDevice, addType, addBrand } from '../action/deviceAction';
import { connect } from 'react-redux';
import ModalWindow from '../components/ModalWindow';

//типизация--------------------------------
type MapStateToPropsType = {
  types: TypeDeviceType[];
  brands: BrandType[];
  addedDevice: addedDeviceType;
  addedDeviceError: boolean;
};
type MapDispathPropsType = {
  setAddedDevice: (data: addedDeviceType) => setAddedDeviceActionType;
  addDevice: (data: addedDeviceType, history: any) => void;
  addType: (data: { name: string }, handleClose: () => void) => void;
  addBrand: (data: { name: string }, handleClose: () => void) => void;
  setAddedDeviceError: (data: boolean) => void;
};

type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    paddingTop: theme.spacing(7),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(3),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  textTitle: {
    marginBottom: '25px',
  },
}));

const steps = [
  'Данные о товаре',
  'Добавить изображения',
  'Добавить новые данные',
];

const AddDevicesContainer: React.FC<PropsType> = ({
  types, //типы
  brands, //брэнды
  addedDevice, //добавленный девайс
  setAddedDevice, //запись добавленного девайса в стейт
  addDevice, //добавить устройства в базу данных
  addType, //добавить тип устройства в базу данных
  addBrand, //добавить брэнд устройства в базу данных
  addedDeviceError, //ошибка добавленного устройства
  setAddedDeviceError, //изменение ошибки
}) => {
  const history = useHistory();
  const classes = useStyles();
  //степер
  const [activeStep, setActiveStep] = React.useState(0);

  //открытие модального окна-------------------------------
  //для типа
  const [openType, setOpenType] = React.useState(false);
  const handleOpenType = () => {
    setOpenType(true);
  };
  const handleCloseType = () => {
    setOpenType(false);
  };
  //для брэнда
  const [openBrand, setOpenBrand] = React.useState(false);
  const handleOpenBrand = () => {
    setOpenBrand(true);
  };
  const handleCloseBrand = () => {
    setOpenBrand(false);
  };
  //------------------------------------------------------------
  const getStepContent = (step: number): JSX.Element => {
    switch (step) {
      case 0:
        return (
          <>
            <DeviceData
              types={types}
              brands={brands}
              handleNext={handleNext}
              setAddedDevice={setAddedDevice}
              addedDevice={addedDevice}
              handleOpenType={handleOpenType}
              handleOpenBrand={handleOpenBrand}
            />
            <ModalWindow
              handleClose={handleCloseType}
              open={openType}
              addData={addType}
              title="тип"
              addedDeviceError={addedDeviceError}
              setAddedDeviceError={setAddedDeviceError}
            />
            <ModalWindow
              handleClose={handleCloseBrand}
              open={openBrand}
              addData={addBrand}
              title="брэнд"
              addedDeviceError={addedDeviceError}
              setAddedDeviceError={setAddedDeviceError}
            />
          </>
        );
      case 1:
        return (
          <DevicePicture
            setAddedDevice={setAddedDevice}
            addedDevice={addedDevice}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:
        return (
          <DeviceProperty
            handleNext={handleNext}
            setAddedDevice={setAddedDevice}
            addedDevice={addedDevice}
            handleBack={handleBack}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  //отправка добаленного устройства  на сервак,используем FormData из за файлов,history чтобы вернуться на главную
  const appendDevice = () => {
    const { picture, price, name, typeId, brandId, info } = addedDevice;
    const formData: any = new FormData();
    formData.append('price', price);
    formData.append('name', name);
    formData.append('typeId', typeId);
    formData.append('brandId', brandId);
    formData.append('info', JSON.stringify(info));
    picture.forEach((file) => {
      formData.append('picture', file);
    });
    addDevice(formData, history);
  };

  return (
    <main className={classes.layout}>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" align="center">
          Добавить товар
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <React.Fragment>
          {activeStep === steps.length ? (
            <React.Fragment>
              {addedDeviceError && (
                <Typography
                  align="center"
                  color="error"
                  className={classes.textTitle}
                >
                  Что-то пошло не так!
                </Typography>
              )}
              <Grid container component="main">
                <Grid item xs={12} sm={6} style={{ padding: '5px 5px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: 15, fontSize: 12 }}
                    onClick={() => {
                      setActiveStep(0);
                    }}
                  >
                    Отмена
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} style={{ padding: '5px 5px' }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    style={{ marginBottom: 15, fontSize: 12 }}
                    onClick={appendDevice}
                  >
                    Сохранить
                  </Button>
                </Grid>
              </Grid>
            </React.Fragment>
          ) : (
            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
          )}
        </React.Fragment>
      </div>
    </main>
  );
};
const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    types: state.devices.types,
    brands: state.devices.brands,
    addedDevice: state.devices.addedDevice,
    addedDeviceError: state.devices.addedDeviceError,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, {
  setAddedDevice,
  addDevice,
  addType,
  addBrand,
  setAddedDeviceError,
})(AddDevicesContainer);
