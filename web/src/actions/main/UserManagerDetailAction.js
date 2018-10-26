import {apiHost} from '../../config/HostConfig';
import {UserManagerDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/user?userId=' + id;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                // 授权时间
                dispatch({type: UserManagerDetailActionType.setCreatedOn, payload: res.result[0].created_on});
                // 微信昵称
                dispatch({type: UserManagerDetailActionType.setWeChatName, payload: res.result[0].wechat_name});
                // 关注状态
                dispatch({type: UserManagerDetailActionType.setWeChatStatus, payload: res.result[0].wechat_status});
                // 认证状态
                dispatch({type: UserManagerDetailActionType.setAuthStatus, payload: res.result[0].auth_status});
            } else {
                swal('未获取用户信息，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取用户信息失败', res.msg, 'warning');
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
            dispatch({type: UserManagerDetailActionType.setMsgDataSize, payload: res.result.length});
            dispatch({type: UserManagerDetailActionType.getCheckCarList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取扫描记录列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};