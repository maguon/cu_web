import {handleActions} from 'redux-actions';
import {CheckCarDetailActionType} from '../../actionTypes';

const initialState = {
    // 违停扫码 记录详情
    checkCarInfo: [],
    // 违停扫码 记录详情：是否显示车辆信息标记
    showCarInfoFlag : false
};

export default handleActions({
    [CheckCarDetailActionType.getCheckCarInfo]: (state, action) => {
        return {
            ...state,
            checkCarInfo: action.payload
        }
    },
    [CheckCarDetailActionType.setShowCarInfoFlag]: (state, action) => {
        return {
            ...state,
            showCarInfoFlag: action.payload
        }
    }
}, initialState)