import React from 'react';
import Masonry from 'react-masonry-css'; // контейнерный компонент для стиля(расположение элементов)
import Device from './Device';
import { DeviceType } from '../store/reducer/deviceReducer'; //типизация устройств
import { AuthReducerType } from '../store/reducer/authReducer';

//----типизация пропсов----
type PropsType = {
  devices: DeviceType[];

  auth: AuthReducerType;
  isAuth: boolean;
  removeDevice: (id: string | undefined) => void;
};
//-------------------------

const breakpoints = {
  default: 3,
  1100: 2,
  700: 1,
}; // это для Masonry,компонент регулирет расположение карточек(отдельно установлен)
const DeviceContainer: React.FC<PropsType> = ({
  devices, // устройства

  auth,
  isAuth,
  removeDevice,
}) => {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {devices.map((item) => {
        return (
          <Device
            item={item}
            key={Math.random()}
            auth={auth}
            isAuth={isAuth}
            removeDevice={removeDevice}
          />
        );
      })}
    </Masonry>
  );
};

export default DeviceContainer;
