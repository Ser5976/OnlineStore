import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { authReducer } from './reducer/authReducer';
import { deviceReducer } from './reducer/deviceReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  devices: deviceReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export type RootStateType = ReturnType<typeof rootReducer>; //типизация стейта
