import React, { useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';
import {
  TypeDeviceType,
  BrandType,
  setTypeIdActionType,
  setBrandIdActionType,
} from '../store/reducer/deviceReducer'; //типизация
import TypeListDelete from './TypeListDelete';
import BrandListDelete from './BrandListDelete';

//----типизация пропсов----
type PropsType = {
  types: TypeDeviceType[];
  brands: BrandType[];
  setTypeId: (data: string | null) => setTypeIdActionType;
  setBrandId: (data: string | null) => setBrandIdActionType;
  removeType: (id: string) => void;
  removeBrand: (id: string) => void;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};
//-------------------------

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginTop: 20,
    padding: '0px 5px',
  },
  products: { paddingLeft: theme.spacing(2), marginBottom: 25 },
  activProducts: {
    paddingLeft: theme.spacing(2),
    marginBottom: 25,
    backgroundColor: '#e0e0e0',
  },
  listType: { paddingLeft: theme.spacing(5) },
  activListType: { paddingLeft: theme.spacing(5), backgroundColor: '#e0e0e0' },
  listBrand: {
    paddingLeft: theme.spacing(9),
    color: '#9e9e9e',
  },
  activListBrand: {
    color: theme.palette.primary.main,
  },
}));

const TypeBarDelete: React.FC<PropsType> = ({
  types, //типы товаров
  brands, // брынды
  setTypeId, // запись типа товара в стейт
  setBrandId, // запись брэнда товара в стейт
  removeType, // удаление типа товара
  removeBrand, // удаление брэнда товара
  setCategory, // изменение категории
}) => {
  const classes = useStyles();
  //создаём объект с булевыми значениями для управления элементами списка(открытие закрытие)(чтобы реагировать на каждый элемент)
  let objType = {} as any;
  for (let i = 0; i < types.length; i++) {
    objType[i] = false;
    // console.log(objType);
  }

  const [open, setOpen] = useState(objType); // открытие вложенного списа
  const [activType, setActivType] = useState<null | number>(null); // выделение типа
  const [activBrand, setActivBrand] = useState<null | string>(null); //выделение бренда
  const [allDevice, setAllDevice] = useState(true); //выделение всех товаров
  // console.log(open);
  // выбор типа,открытие  вложенного спиская,снятие выбранного брэнда
  const handleType = (index: number) => {
    setActivType(index);
    setOpen({ ...open, [index]: !open[index] }); //изменяем булевое значение для каждого элемента
    setActivBrand(null); // снятие выбранного бренда
  }; // выбор брэнда
  const handleBrand = (id: string, index: number) => {
    setActivBrand(id);
    setActivType(index);
  };

  return (
    <>
      <List component="nav" className={classes.root}>
        <ListItem
          button
          className={allDevice ? classes.activProducts : classes.products}
          onClick={() => {
            setTypeId(null); //удаление из стейта существующего типа
            setBrandId(null); // удаление из стейта существующего брэнда
            setOpen(objType); //закрытие списка
            setActivType(null); //удаление выделения типа
            setAllDevice(true); //выделение всех товаров
            setCategory('Все товары');
          }}
        >
          <ListItemText
            disableTypography
            primary={
              <Typography variant="subtitle1" gutterBottom>
                Все товары
              </Typography>
            }
          />
        </ListItem>
      </List>
      <List component="nav" className={classes.root}>
        {types.map((type, indexType) => {
          return (
            <div key={type._id}>
              <ListItem
                button
                className={
                  activType === indexType
                    ? classes.activListType
                    : classes.listType
                }
                onClick={() => {
                  handleType(indexType); //управление типом
                  setTypeId(type._id); //запись в стейт выбранного типа
                  setBrandId(null); // удаление из стейта существующего брэнда
                  setAllDevice(false); // удаление выделения всех товаров
                  setCategory(type.name);
                }}
              >
                <ListItemText
                  disableTypography
                  primary={
                    <Typography variant="subtitle1">{type.name}</Typography>
                  }
                />
                {open[indexType] ? <ExpandLess /> : <ExpandMore />}
              </ListItem>

              <Collapse in={open[indexType]} timeout="auto" unmountOnExit>
                <List component="div">
                  {type.brands.map((brand) => {
                    return (
                      <div key={brand._id}>
                        <ListItem
                          button
                          className={classes.listBrand}
                          onClick={() => {
                            handleBrand(brand._id, indexType); //управление брэндом
                            setTypeId(type._id); //запись в стейт выбранного типа
                            setBrandId(brand._id); //запись в стейт выбранного брэнда
                          }}
                        >
                          <ListItemText
                            disableTypography
                            className={
                              activBrand === brand._id &&
                              activType === indexType
                                ? classes.activListBrand
                                : undefined
                            }
                            primary={
                              <Typography variant="subtitle1">
                                {brand.name}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </div>
                    );
                  })}
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
      <TypeListDelete types={types} removeType={removeType} />
      <BrandListDelete brands={brands} removeBrand={removeBrand} />
    </>
  );
};

export default TypeBarDelete;
