import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';


export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,HeaderReducer
})