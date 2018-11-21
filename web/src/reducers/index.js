import {combineReducers} from 'redux'
import {reducer as reduxFormReducer} from 'redux-form';

import HeaderReducer from './layout/HeaderReducer';
import LoginReducer from './layout/LoginReducer';
import CommonReducer from './main/CommonReducer';
import CheckCarReducer from './main/CheckCarReducer';
import CheckCarDetailReducer from './main/CheckCarDetailReducer'
import FeedBackReducer from './main/FeedBackReducer';
import FeedBackDetailReducer from './main/FeedBackDetailReducer'
import LogCompanyReducer from './main/LogCompanyReducer';
import LogReducer from './main/LogReducer';
import LogDetailReducer from './main/LogDetailReducer';
import MessageReducer from './main/MessageReducer';
import MessageDetailReducer from './main/MessageDetailReducer';
import OrderReducer from './main/OrderReducer';
import OrderDetailReducer from './main/OrderDetailReducer';
import PaymentReducer from './main/PaymentReducer';
import PaymentDetailReducer from './main/PaymentDetailReducer';
import ProductReducer from './main/ProductReducer';
import ProductDetailReducer from './main/ProductDetailReducer';
import SaleReducer from './main/SaleReducer';
import SaleDetailReducer from './main/SaleDetailReducer';
import TrafficPoliceReducer from './main/TrafficPoliceReducer';
import TrafficPoliceDetailReducer from './main/TrafficPoliceDetailReducer';
import UserAddressReducer from './main/UserAddressReducer';
import UserAddressDetailReducer from './main/UserAddressDetailReducer';
import UserCarReducer from './main/UserCarReducer';
import UserCarDetailReducer from './main/UserCarDetailReducer';
import UserManagerReducer from './main/UserManagerReducer';
import UserManagerDetailReducer from './main/UserManagerDetailReducer';
import CarQRCodeModalReducer from './modules/CarQRCodeModalReducer';
import NewLogCompanyModalReducer from './modules/NewLogCompanyModalReducer';
import NewLogModalReducer from './modules/NewLogModalReducer';
import RefundModalReducer from './modules/RefundModalReducer';
import ReSendModalReducer from './modules/ReSendModalReducer';
import SendOutModalReducer from './modules/SendOutModalReducer';

export default combineReducers({
    form: reduxFormReducer,
    LoginReducer,
    HeaderReducer,
    CommonReducer,
    CheckCarReducer,
    CheckCarDetailReducer,
    FeedBackReducer,
    FeedBackDetailReducer,
    OrderReducer,
    OrderDetailReducer,
    PaymentReducer,
    PaymentDetailReducer,
    LogCompanyReducer,
    LogReducer,
    LogDetailReducer,
    MessageReducer,
    MessageDetailReducer,
    ProductReducer,
    ProductDetailReducer,
    SaleReducer,
    SaleDetailReducer,
    TrafficPoliceReducer,
    TrafficPoliceDetailReducer,
    UserAddressReducer,
    UserAddressDetailReducer,
    UserCarReducer,
    UserCarDetailReducer,
    UserManagerReducer,
    UserManagerDetailReducer,
    CarQRCodeModalReducer,
    NewLogCompanyModalReducer,
    NewLogModalReducer,
    RefundModalReducer,
    ReSendModalReducer,
    SendOutModalReducer
})