import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { SetLogoutActionType } from '../store/reducer/authReducer';
import { useHistory } from 'react-router-dom';
import { SetClearCartActionType } from '../store/reducer/basketReducer';

//типизация--------------------------------
type PropsType = {
  setLogout: () => SetLogoutActionType;
  setClearCart: () => SetClearCartActionType;
};
//-----------------------------------------

const Logout: React.FC<PropsType> = ({
  setLogout, //очистка авторизации в сторе
  setClearCart, //очистка корзины
}) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  //очистка
  const cleaning = () => {
    //удаление данных авторизации из стора
    setLogout();
    //очистка корзины
    setClearCart();
    // удаление данных из sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('role');
    //на главную страницу
    history.push('/');
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircleOutlinedIcon
          style={{ fontSize: '33px', color: 'black' }}
        />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={cleaning}>Выйти</MenuItem>
      </Menu>
    </>
  );
};
export default Logout;
