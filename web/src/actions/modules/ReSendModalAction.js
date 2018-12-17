import {apiHost} from '../../config/HostConfig';
import {ReSendModalActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderInfo = (orderId) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ReSendModalActionType.getOrderInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(getOrderItemList(orderId));
                dispatch({type: ReSendModalActionType.setOrderItem, payload: null});
                dispatch({type: ReSendModalActionType.setOrderItemCnt, payload: ''});
                dispatch({type: ReSendModalActionType.setLogList, payload: []});
                dispatch({type: ReSendModalActionType.setRecvName, payload: res.result[0].recv_name});
                dispatch({type: ReSendModalActionType.setRecvPhone, payload: res.result[0].recv_phone});
                dispatch({type: ReSendModalActionType.setRecvAddress, payload: res.result[0].recv_address});
            } else {
                swal('未找到该订单详细信息', '', 'warning');
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
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/orderItem?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: ReSendModalActionType.getOrderItemList, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单内商品列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addLog = () => async (dispatch, getState) => {
    // 新增发货信息：订单信息
    const orderInfo = getState().ReSendModalReducer.orderInfo;
    // 新增发货信息：发货商品列表
    const logList = getState().ReSendModalReducer.logList;
    // 新增发货信息：收货人
    const name = getState().ReSendModalReducer.recvName.trim();
    // 新增发货信息：收货电话
    const phone = getState().ReSendModalReducer.recvPhone.trim();
    // 新增发货信息：收货地址
    const address = getState().ReSendModalReducer.recvAddress.trim();
    try {
        if (orderInfo.length === 0 || logList.length === 0 || name === '' || phone === '' || address === '') {
            swal('添加失败', '请输入完整的发货信息！', 'warning');
        } else {
            let productDes = '';
            logList.map(function (item) {
                productDes = productDes + item.name + ' x' + item.cnt + ';'
            });
            const params = {
                orderId: orderInfo[0].id,
                productDes: productDes,
                recvName: name,
                recvPhone: phone,
                recvAddress: address,
                type: sysConst.LOG_RESEND_STATUS[0].value
            };

            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/log';
            const res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                swal("添加成功", "", "success");
                $('#reSendModal').modal('close');
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};