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
import { Tooltip } from '@material-ui/core';

//----типизация пропсов----
type PropsType = {
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
};
//-------------------------
const useStyles = makeStyles(() => ({
  menu: {
    marginTop: '25px',
  },
  icon: {
    fontSize: '37px',
    color: 'gray',
    '&:hover': {
      color: 'black',
    },
  },
  span: {
    // display: 'block',
    '@media (max-width:600px)': {
      display: 'none',
    },
  },
}));

const MenuAdmin: React.FC<PropsType> = ({ setTypeId, setBrandId }) => {
  const history = useHistory();
  const classes = useStyles();
  // для меню
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //--------------------------

  return (
    <>
      <Tooltip
        title="Панель администратора. 
      Доступ только авторизованным пользователям с правами администратора. 
      email:admin@admin.admin пароль: 12345"
      >
        <Button color="inherit" onClick={handleOpenMenu}>
          <SupervisorAccountOutlinedIcon className={classes.icon} />
        </Button>
      </Tooltip>
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
