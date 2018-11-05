import {apiHost} from '../../config/HostConfig';
import {OrderDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/order?orderId=' + id;

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderDetailActionType.getOrderInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderDetail = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderItem?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderDetailActionType.getProductList, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单购买信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};