import {handleActions} from 'redux-actions';
import {SaleDetailActionType} from '../../actionTypes';

const initialState = {
    // 商品销售 - 商品详情
    saleInfo: []
};

export default handleActions({
    [SaleDetailActionType.getSaleInfo]: (state, action) => {
        return {
            ...state,
            saleInfo: action.payload
        }
    }
}, initialState)