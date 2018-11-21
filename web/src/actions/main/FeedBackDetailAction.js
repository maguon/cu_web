import {apiHost} from '../../config/HostConfig';
import {FeedBackDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getFeedBackInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderFeedback?orderFeedbackId=' + id;
        console.log('url',url);
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            console.log(res.result);

            dispatch({type: FeedBackDetailActionType.getFeedBackInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(getOrderInfo(res.result[0].order_id));
                dispatch(getOrderDetail(res.result[0].order_id));
                dispatch({type: FeedBackDetailActionType.setProcessRemark, payload: res.result[0].process_remark});
                dispatch({type: FeedBackDetailActionType.setProcessMethod, payload: res.result[0].process_method});
            }
        } else if (res.success === false) {
            swal('获取售后详情信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderInfo = (id) => async (dispatch) => {

    try {
        // 基本检索URL
        const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/order?orderId=' + id;

        console.log('url',url);
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FeedBackDetailActionType.getOrderInfo, payload: res.result});
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
        console.log('url',url);

        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FeedBackDetailActionType.getProductList, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单购买信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const updateFeedBack = (feedBackId, orderId) => async (dispatch, getState) => {

    // 处理描述
    const processRemark = getState().FeedBackDetailReducer.processRemark.trim();
    // 处理方法
    const processMethod = getState().FeedBackDetailReducer.processMethod.trim();

    try {
        if (processRemark === '' || processMethod === '') {
            swal('修改失败', '请输入完整的售后处理信息！', 'warning');
        } else {
            const params = {
                processRemark: processRemark,
                processMethod: processMethod
            };
            const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
                + '/order/' + orderId  + '/orderFeedback/' + feedBackId  + '/orderFeedbackPayment';
            const res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("修改成功", "", "success");
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};