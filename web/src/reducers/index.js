import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';
import CheckCarReducer from './main/CheckCarReducer';
import CheckCarDetailReducer from './main/CheckCarDetailReducer'
import MessageReducer from './main/MessageReducer';
import MessageDetailReducer from './main/MessageDetailReducer';
import TrafficPoliceReducer from './main/TrafficPoliceReducer';
import TrafficPoliceDetailReducer from './main/TrafficPoliceDetailReducer';
import UserAddressReducer from './main/UserAddressReducer';
import UserAddressDetailReducer from './main/UserAddressDetailReducer';
import UserCarReducer from './main/UserCarReducer';
import UserCarDetailReducer from './main/UserCarDetailReducer';
import UserManagerReducer from './main/UserManagerReducer';
import UserManagerDetailReducer from './main/UserManagerDetailReducer';
import CarQRCodeModalReducer from './modules/CarQRCodeModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,
    CheckCarReducer,
    CheckCarDetailReducer,
    MessageReducer,
    MessageDetailReducer,
    TrafficPoliceReducer,
    TrafficPoliceDetailReducer,
    UserAddressReducer,
    UserAddressDetailReducer,
    UserCarReducer,
    UserCarDetailReducer,
    UserManagerReducer,
    UserManagerDetailReducer,
    CarQRCodeModalReducer
})