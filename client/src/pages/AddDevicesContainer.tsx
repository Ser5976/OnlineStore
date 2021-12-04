import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DeviceData from '../components/DeviceData';
import DeviceProperty from '../components/DeviceProperty';
import DevicePicture from '../components/DevicePicture';
import { RootStateType } from '../store/store'; //типизиция всего стора
import {
  TypeDeviceType, //типизация типов
  BrandType, //типизация брэндов
  setAddedDevice, //экшен запись добавленного девайса в стейт
  setAddedDeviceActionType, //типизация экшена
  addedDeviceType, //типизация добавленного устройства
} from '../store/reducer/deviceReducer';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {
  types: TypeDeviceType[];
  brands: BrandType[];
  addedDevice: addedDeviceType;
};
type MapDispathPropsType = {
  setAddedDevice: (data: addedDeviceType) => setAddedDeviceActionType;
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
}));

const steps = [
  'Данные о товаре',
  'Добавить изображения',
  'Добавить новые данные',
  'Добавить товар',
];

const AddDevicesContainer: React.FC<PropsType> = ({
  types, //типы
  brands, //брэнды
  addedDevice, //добавленный девайс
  setAddedDevice, //запись добавленного девайса в стейт
}) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const getStepContent = (step: number): JSX.Element => {
    switch (step) {
      case 0:
        return (
          <DeviceData
            types={types}
            brands={brands}
            handleNext={handleNext}
            setAddedDevice={setAddedDevice}
            addedDevice={addedDevice}
          />
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
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <div className={classes.buttons}>
                {activeStep === steps.length - 1 && (
                  <Button
                    variant="contained"
                    color="primary"
                    // onClick={handleNext}
                    className={classes.button}
                  >
                    Сохранить
                  </Button>
                )}
              </div>
            </React.Fragment>
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
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(mapStateToProps, { setAddedDevice })(AddDevicesContainer);
