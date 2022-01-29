import React, { useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import {
  setBrandIdActionType,
  setTypeIdActionType,
} from '../store/reducer/deviceReducer';
import { AuthReducerType } from '../store/reducer/authReducer';
import { Tooltip } from '@material-ui/core';

//----типизация пропсов----
type PropsType = {
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  auth: AuthReducerType;
};
//-------------------------
const useStyles = makeStyles(() => ({
  menu: {
    marginTop: '25px',
  },
  icon: {
    fontSize: '37px',
    color: (auth: AuthReducerType): string => {
      if (auth.role === 'ADMIN') {
        return 'black';
      } else {
        return 'gray';
      }
    },
  },
  span: {
    // display: 'block',
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
}));

const MenuAdmin: React.FC<PropsType> = ({
  setTypeId, // запись в стейт выбранного типа(для обнуления)
  setBrandId, //запись в стейт выбранного типа(для обнуления)
  auth, //параметры авторизации
}) => {
  const history = useHistory();
  const classes = useStyles(auth);

  // для меню
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    if (auth.role === 'ADMIN') {
      setAnchorEl(event.currentTarget);
    } else {
      history.push('/login');
    }
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //--------------------------

  return (
    <>
      {auth.role === 'ADMIN' ? (
        <Button color="inherit" onClick={handleOpenMenu}>
          <SupervisorAccountOutlinedIcon className={classes.icon} />
        </Button>
      ) : (
        <Tooltip
          title="Панель администратора. 
      Доступ только авторизованным пользователям с правами администратора. 
      email: admin@admin.admin пароль: 12345"
        >
          <Button color="inherit" onClick={handleOpenMenu}>
            <SupervisorAccountOutlinedIcon className={classes.icon} />
          </Button>
        </Tooltip>
      )}

      <Menu
        variant="menu"
        elevation={2}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        className={classes.menu}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            history.push('/addDevicesContainer');
          }}
        >
          Добавить товар
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            history.push('/deleteContainer');
            setTypeId(null);
            setBrandId(null);
          }}
        >
          Удалить товар
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuAdmin;
