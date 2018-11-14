import {apiHost} from '../../config/HostConfig';
import {UserCarDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserCarInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/userCar?userCarId=' + id;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserCarDetailActionType.getUserCarInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取车辆信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getCheckCarList = (id) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserCarDetailReducer.start;
        // 检索条件：每页数量
        const size = getState().UserCarDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/checkCar?start=' + start + '&size=' + size + '&userCarId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserCarDetailActionType.setDataSize, payload: res.result.length});
            dispatch({type: UserCarDetailActionType.getCheckCarList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取扫描记录列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};