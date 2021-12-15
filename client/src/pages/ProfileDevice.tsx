import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { RootStateType } from '../store/store'; // типизация всего стейта( для типизации state)
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import { getSelectedDevice } from '../action/deviceAction';
import { DeviceType, InfoType } from '../store/reducer/deviceReducer';
import { ROOT_URL } from '../constants/url';
import ImageList from '../components/ImageList';
import { connect } from 'react-redux';

//типизация---------------------------------------------------------------------
type MapStateToPropsType = {
  selectedDevice: DeviceType;
};
type MapDispathPropsType = {
  getSelectedDevice: (id: string) => void;
};
type PropsType = MapStateToPropsType & MapDispathPropsType;
type ParamsType = {
  id: string;
};
//-----------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(7),
  },
  listImage: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'auto',
    marginTop: 5,
    padding: 5,
  },
  image: {
    height: 50,
    width: 'auto',
    margin: 5,
    cursor: 'pointer',
  },
}));

const ProfileDevice: React.FC<PropsType> = ({
  getSelectedDevice,
  selectedDevice,
}) => {
  const classes = useStyles();
  const { id } = useParams<ParamsType>(); //  хук роутера ,который помогает получить значение params
  console.log(selectedDevice);
  useEffect(() => {
    getSelectedDevice(id);
    // eslint-disable-next-line
  }, []);
  const { name, picture, price, info } = selectedDevice;

  let params: InfoType[];
  info ? (params = [...info]) : (params = []);
  console.log(params[0]);
  let image: string[];
  picture ? (image = [...picture]) : (image = []);
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={12} sm={4}>
        <ImageList image={image} />
      </Grid>
      <Grid item xs={12} sm={5}></Grid>
      <Grid item xs={12} sm={2}></Grid>
    </Grid>
  );
};

const mapStateToProps = (state: RootStateType): MapStateToPropsType => {
  return {
    selectedDevice: state.devices.selectedDevice,
  };
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // первичные пропсы
  RootStateType
>(mapStateToProps, { getSelectedDevice })(ProfileDevice);
