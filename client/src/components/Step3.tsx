import React from 'react';
import {
  DeviceType,
  setAddedDeviceActionType,
} from '../store/reducer/deviceReducer';

//-----------------------------------------
// типизация пропсов
type PropsType = {
  addedDevice: DeviceType;
  setAddedDevice: (data: DeviceType) => setAddedDeviceActionType;
  handleNext: () => void;
};
//--------------------------------------------

const Step3: React.FC<PropsType> = ({
  addedDevice,
  setAddedDevice,
  handleNext,
}) => {
  return <div></div>;
};
export default Step3;
