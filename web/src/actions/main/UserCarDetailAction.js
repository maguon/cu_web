import {apiHost} from '../../config/HostConfig';
import {UserCarDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserCarInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/userCar?userCarId=' + id;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 绑定时间
                dispatch({type: UserCarDetailActionType.setCreatedOn, payload: res.result[0].created_on});
                // 绑定状态
                dispatch({type: UserCarDetailActionType.setStatus, payload: res.result[0].status});
                // 车辆信息：车牌号码
                dispatch({type: UserCarDetailActionType.setPlateNum, payload: res.result[0].license_plate});
                // 车辆信息：联系电话
                dispatch({type: UserCarDetailActionType.setPhone, payload: res.result[0].phone});
                // 车辆信息：绑定用户
                dispatch({type: UserCarDetailActionType.setBindUser, payload: res.result[0].user_name});
                // 车辆信息：车辆识别码
                dispatch({type: UserCarDetailActionType.setVin, payload: res.result[0].vin});
                // 车辆信息：发动机号码
                dispatch({type: UserCarDetailActionType.setEngineNum, payload: res.result[0].engine_num});
            } else {
                swal('未获取车辆信息，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取车辆信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getMessageList = (id) => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserCarDetailReducer.start;
        // 检索条件：每页数量
        const size = getState().UserCarDetailReducer.size;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/getMessage?start=' + start + '&size=' + size + '&carId=' + id;
        const res = await httpUtil.httpGet(url);

        if (res.success === true) {
            dispatch({type: UserCarDetailActionType.setDataSize, payload: res.result.length});
            dispatch({type: UserCarDetailActionType.getMessageList, payload: res.result.slice(0, 10)});
        } else if (res.success === false) {
            swal('获取扫描记录列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getMessageInfo = (messageId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/getMessage?userMessageId=' + messageId;
        const res = await httpUtil.httpGet(url);

        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: UserCarDetailActionType.setMsgId, payload: messageId});
                dispatch({type: UserCarDetailActionType.setMsgName, payload: res.result[0].message_name});
                dispatch({type: UserCarDetailActionType.setMsgCreatedOn, payload: res.result[0].created_on});
                dispatch({type: UserCarDetailActionType.setMsgContent, payload: res.result[0].message_order});
                dispatch({type: UserCarDetailActionType.setMsgAddress, payload: res.result[0].address});
                dispatch({type: UserCarDetailActionType.setMsgSuperviseName, payload: res.result[0].superviseName});
            } else {
                swal('未获取消息详情，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取消息详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};