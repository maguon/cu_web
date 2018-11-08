import {apiHost} from '../../config/HostConfig';
import {NewLogModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderInfo = () => async (dispatch, getState) => {
    try {
        // 输入的订单编号
        const orderId = getState().NewLogModalReducer.orderId;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/order?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLogModalActionType.getOrderInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(getOrderItemList(orderId));
                dispatch({type: NewLogModalActionType.setRecvName, payload: res.result[0].recv_name});
                dispatch({type: NewLogModalActionType.setRecvPhone, payload: res.result[0].recv_phone});
                dispatch({type: NewLogModalActionType.setRecvAddress, payload: res.result[0].recv_address});
            }
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderItemList = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderItem?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLogModalActionType.getOrderItemList, payload: res.result});
            dispatch({type: NewLogModalActionType.getOrderItemCntList, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单内商品列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderItemCnt = (selectedItem) => async (dispatch,getState) => {
    const orderItemCntMap = getState().NewLogModalReducer.orderItemCntMap;
    let orderItemCnt = 0;
    if (selectedItem != null) {
        orderItemCnt = orderItemCntMap.get(selectedItem.value);
    }
    dispatch(NewLogModalActionType.setOrderItemCnt(orderItemCnt));
};