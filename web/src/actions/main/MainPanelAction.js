import {apiHost} from '../../config/HostConfig';
import {MainPanelActionType} from "../../actionTypes";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

export const getUserStat = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/userStat';
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: MainPanelActionType.getUserCnt, payload: res.result[0].user_count});
            } else {
                dispatch({type: MainPanelActionType.getUserCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取绑定用户总数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getUserCarStat = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/userCarStat';
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: MainPanelActionType.getUserCarCnt, payload: res.result[0].car_count});
            } else {
                dispatch({type: MainPanelActionType.getUserCarCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取绑定车辆总数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getSuperviseStat = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/superviseStat';
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: MainPanelActionType.getPoliceCnt, payload: res.result[0].supervise_count});
            } else {
                dispatch({type: MainPanelActionType.getPoliceCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取交警用户总数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getCheckCarStatByMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/checkCarStatByMonth?yMonth=' + formatUtil.formatDate(new Date(), 'yyyyMM');
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: MainPanelActionType.getCheckCarCnt, payload: res.result[0].checkCar_count});
            } else {
                dispatch({type: MainPanelActionType.getCheckCarCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取本月扫描车辆失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderStatByMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderStatByMonth?yMonth=' + formatUtil.formatDate(new Date(), 'yyyyMM');
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                let waitCnt = 0;
                res.result.forEach((value) => {
                    if (value.payment_status === 0) {
                        waitCnt = value.order_count;
                    } else {
                        dispatch({type: MainPanelActionType.getOrderPaymentCnt, payload: value.order_count});
                        dispatch({type: MainPanelActionType.getOrderCnt, payload: waitCnt + value.order_count});
                    }
                });
            } else {
                dispatch({type: MainPanelActionType.getOrderCnt, payload: 0});
                dispatch({type: MainPanelActionType.getOrderPaymentCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取本月订单数信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getPaymentFeeByMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/paymentFeeByMonth?yMonth=' + formatUtil.formatDate(new Date(), 'yyyyMM');
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                let waitCnt = 0;
                res.result.forEach((value) => {
                    // 退款
                    if (value.payment_status === 0) {
                        waitCnt = value.payment_fee;
                        dispatch({type: MainPanelActionType.getRefundFee, payload: value.payment_fee});
                    } else {
                        dispatch({type: MainPanelActionType.getPaymentFee, payload: value.payment_fee});
                        dispatch({type: MainPanelActionType.getProfit, payload: value.payment_fee - waitCnt});
                    }
                });
            } else {
                dispatch({type: MainPanelActionType.getProfit, payload: 0});
                dispatch({type: MainPanelActionType.getPaymentFee, payload: 0});
                dispatch({type: MainPanelActionType.getRefundFee, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取本月商城收益信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getLogStatByMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/logStatByMonth?yMonth=' + formatUtil.formatDate(new Date(), 'yyyyMM');
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                let waitCnt = 0;
                res.result.forEach((value) => {
                    if (value.log_status === 0) {
                        waitCnt = value.log_count;
                        dispatch({type: MainPanelActionType.getLogWaitCnt, payload: waitCnt});
                    } else {
                        dispatch({type: MainPanelActionType.getLogCnt, payload: waitCnt + value.log_count});
                    }
                });
            } else {
                dispatch({type: MainPanelActionType.getLogCnt, payload: 0});
                dispatch({type: MainPanelActionType.getLogWaitCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取本月发布指令失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getOrderFeedbackStatByMonth = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderFeedbackStatByMonth?yMonth=' + formatUtil.formatDate(new Date(), 'yyyyMM');
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                let waitCnt = 0;
                res.result.forEach((value) => {
                    if (value.feedback_status === 0) {
                        waitCnt = value.feedback_count;
                        dispatch({type: MainPanelActionType.getFeedBackWaitCnt, payload: waitCnt});
                    } else {
                        dispatch({type: MainPanelActionType.getFeedBackCnt, payload: waitCnt + value.feedback_count});
                    }
                });
            } else {
                dispatch({type: MainPanelActionType.getFeedBackCnt, payload: 0});
                dispatch({type: MainPanelActionType.getFeedBackWaitCnt, payload: 0});
            }
        } else if (res.success === false) {
            swal('获取本月申请售后数失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};