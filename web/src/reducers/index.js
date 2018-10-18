import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';
import TrafficPoliceReducer from './main/TrafficPoliceReducer';
import TrafficPoliceDetailReducer from './main/TrafficPoliceDetailReducer';
import UserCarReducer from './main/UserCarReducer';
import UserCarDetailReducer from './main/UserCarDetailReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer, HeaderReducer, TrafficPoliceReducer, TrafficPoliceDetailReducer, UserCarReducer, UserCarDetailReducer
})