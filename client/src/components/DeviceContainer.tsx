import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css'; // контейнерный компонент для стиля(расположение элементов)
import Device from './Device';
import { DeviceType } from '../store/reducer/deviceReducer';
import { AuthReducerType } from '../store/reducer/authReducer';

//----типизация пропсов----
type PropsType = {
  devices: DeviceType[];
  auth: AuthReducerType;
  isAuth: boolean;
  removeDevice: (id: string | undefined) => void;
};
//-------------------------

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const breakpoints = {
  default: 5,
  1100: 2,
  700: 1,
}; // это для Masonry,компонент регулирет расположение карточек(отдельно установлен)
const DeviceContainer: React.FC<PropsType> = ({
  devices,
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
