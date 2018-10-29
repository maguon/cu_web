import {handleActions} from 'redux-actions';
import {CheckCarDetailActionType} from '../../actionTypes';

const initialState = {
    // 记录详情：状态
    status: 0,
    // 记录详情：扫描时间
    createOn: '',
    // 检索条件：车牌号
    plateNum: '',
    // 车辆信息：车辆识别码
    vin: '',
    // 车辆信息：发动机号码
    engineNum: '',
    // 车辆信息：联系电话
    phone: '',
    // 车辆信息：车主
    carOwner: '',
    // 车辆信息：地址
    address: '',
    // 车辆信息：执行交警
    superviseName: '',
    // 车辆信息：是否显示车辆信息标记
    showCarInfoFlag : false
};

export default handleActions({
    [CheckCarDetailActionType.setStatus]: (state, action) => {
        return {
            ...state,
            status: action.payload
        }
    },
    [CheckCarDetailActionType.setCreatedOn]: (state, action) => {
        return {
            ...state,
            createOn: action.payload
        }
    },
    [CheckCarDetailActionType.setPlateNum]: (state, action) => {
        return {
            ...state,
            plateNum: action.payload
        }
    },
    [CheckCarDetailActionType.setVin]: (state, action) => {
        return {
            ...state,
            vin: action.payload
        }
    },
    [CheckCarDetailActionType.setEngineNum]: (state, action) => {
        return {
            ...state,
            engineNum: action.payload
        }
    },
    [CheckCarDetailActionType.setPhone]: (state, action) => {
        return {
            ...state,
            phone: action.payload
        }
    },
    [CheckCarDetailActionType.setCarOwner]: (state, action) => {
        return {
            ...state,
            carOwner: action.payload
        }
    },
    [CheckCarDetailActionType.setAddress]: (state, action) => {
        return {
            ...state,
            address: action.payload
        }
    },
    [CheckCarDetailActionType.setSuperviseName]: (state, action) => {
        return {
            ...state,
            superviseName: action.payload
        }
    },
    [CheckCarDetailActionType.setShowCarInfoFlag]: (state, action) => {
        return {
            ...state,
            showCarInfoFlag: action.payload
        }
    }
}, initialState)