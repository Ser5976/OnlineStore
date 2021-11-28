import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Masonry from 'react-masonry-css'; // контейнерный компонент для стиля(расположение элементов)
import Device from './Device';
import { DeviceType } from '../store/reducer/deviceReducer';

//----типизация пропсов----
type PropsType = {
  devices: DeviceType[];
};
//-------------------------

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}));

const breakpoints = {
  default: 4,
  1100: 2,
  700: 1,
}; // это для Masonry,компонент регулирет расположение карточек(отдельно установлен)
const DeviceContainer: React.FC<PropsType> = ({ devices }) => {
  return (
    <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {devices.map((item) => {
        return <Device item={item} key={Math.random()} />;
      })}
    </Masonry>
  );
};

export default DeviceContainer;
