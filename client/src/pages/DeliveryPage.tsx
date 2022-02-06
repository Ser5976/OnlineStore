import React from 'react';
import { Box, Container, Typography, makeStyles } from '@material-ui/core';
import { RootStateType } from '../store/store'; //типизиция всего стора
import ActiveLastBreadcrumb from '../components/ActiveLastBreadcrumb';
import { connect } from 'react-redux';

//типизация--------------------------------
type MapStateToPropsType = {};
type MapDispathPropsType = {};

type PropsType = MapDispathPropsType & MapStateToPropsType;
//-----------------------------------------
const useStyles = makeStyles((theme) => {});

const DeliveryPage: React.FC<PropsType> = ({}) => {
  const classes = useStyles();

  return (
    <>
      <Box style={{ margin: '25px' }}>
        <ActiveLastBreadcrumb name="Доставка" />
      </Box>
      <Container maxWidth="md">
        <Typography component="h1" variant="h5" gutterBottom>
          Доставка
        </Typography>
        <Typography variant="body1">
          Разместите на этой странице информацию с описанием способов доставки,
          которые использует ваш интернет-магазин.
        </Typography>
      </Container>
    </>
  );
};
const mapStateToProps = ({}: RootStateType): MapStateToPropsType => {
  return {};
};
export default connect<
  MapStateToPropsType,
  MapDispathPropsType,
  unknown, // личные пропсы
  RootStateType
>(
  mapStateToProps,
  {}
)(DeliveryPage);
