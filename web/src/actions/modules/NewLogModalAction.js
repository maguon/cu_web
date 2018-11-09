import {apiHost} from '../../config/HostConfig';
import {NewLogModalActionType} from "../../actionTypes";

const logAction = require('../../actions/main/LogAction');
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
                dispatch({type: NewLogModalActionType.setOrderItem, payload: null});
                dispatch({type: NewLogModalActionType.setOrderItemDes, payload: ''});
                dispatch({type: NewLogModalActionType.setOrderItemCnt, payload: ''});
                dispatch({type: NewLogModalActionType.setRecvName, payload: res.result[0].recv_name});
                dispatch({type: NewLogModalActionType.setRecvPhone, payload: res.result[0].recv_phone});
                dispatch({type: NewLogModalActionType.setRecvAddress, payload: res.result[0].recv_address});
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
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderItem?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: NewLogModalActionType.getOrderItemList, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单内商品列表失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addLog = () => async (dispatch, getState) => {
    // 新增发货信息：订单信息
    const orderInfo = getState().NewLogModalReducer.orderInfo;
    // 新增发货信息：发货商品列表
    const logList = getState().NewLogModalReducer.logList;
    // 新增发货信息：收货人
    const name = getState().NewLogModalReducer.recvName.trim();
    // 新增发货信息：收货电话
    const phone = getState().NewLogModalReducer.recvPhone.trim();
    // 新增发货信息：收货地址
    const address = getState().NewLogModalReducer.recvAddress.trim();
    try {
        if (orderInfo.length === 0 || logList.length === 0 || name === '' || phone === '' || address === '') {
            swal('添加失败', '请输入完整的发货信息！', 'warning');
        } else {
            let productDes = '';
            logList.map(function (item) {
                productDes = productDes + item.name + '(' + item.remark + ')' + ' x' + item.cnt + ';'
            });
            const params = {
                orderId: orderInfo[0].id,
                productDes: productDes,
                recvName: name,
                recvPhone: phone,
                recvAddress: address,
                type: sysConst.LOG_RESEND_STATUS[0].value
            };

            const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/log';
            const res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                swal("添加成功", "", "success");
                $('#newLogModal').modal('close');
                // 添加成功后，重新检索画面数据
                dispatch(logAction.getLogList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const initData = () => async (dispatch) => {
    dispatch({type: NewLogModalActionType.setOrderId, payload: ''});
    dispatch({type: NewLogModalActionType.getOrderInfo, payload: []});
    dispatch({type: NewLogModalActionType.setOrderItem, payload: null});
    dispatch({type: NewLogModalActionType.setOrderItemDes, payload: ''});
    dispatch({type: NewLogModalActionType.setOrderItemCnt, payload: ''});
    dispatch({type: NewLogModalActionType.setLogList, payload: []});
    dispatch({type: NewLogModalActionType.setRecvName, payload: ''});
    dispatch({type: NewLogModalActionType.setRecvPhone, payload: ''});
    dispatch({type: NewLogModalActionType.setRecvAddress, payload: ''});
};