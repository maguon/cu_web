import {apiHost} from '../../config/HostConfig';
import {RefundModalActionType} from "../../actionTypes";

const paymentAction = require('../../actions/main/PaymentAction');
const paymentDetailAction = require('../../actions/main/PaymentDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderInfo = (orderId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/order?orderId=' + orderId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: RefundModalActionType.getOrderInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const refund = () => async (dispatch, getState) => {
    // 前画面
    const prePage = getState().RefundModalReducer.prePage;
    // 退款信息：订单信息
    const orderInfo = getState().RefundModalReducer.orderInfo;
    // 退款信息：支付编号
    const paymentId = getState().RefundModalReducer.paymentId;
    // 退款信息：本次退款
    const refundMoney = getState().RefundModalReducer.refundMoney.trim();
    // 退款信息：处理描述
    const remark = getState().RefundModalReducer.remark.trim();
    try {
        if (orderInfo.length === 0 || refundMoney === '') {
            swal('退款失败', '请输入完整的退款信息！', 'warning');
        } else {
            const params = {
                refundFee: refundMoney,
                remark: remark
            };
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/user/' + orderInfo[0].user_id + '/order/' + orderInfo[0].id + '/wechatRefund';
            const res = await httpUtil.httpPost(url, params);
            if (res.success === true) {
                swal("退款成功", "", "success");
                $('#refundModal').modal('close');
                // 退款成功后，重新检索画面数据
                if (prePage === 'paymentDetail') {
                    dispatch(paymentDetailAction.getPaymentInfo(paymentId));
                    dispatch(paymentDetailAction.getRelPaymentList(paymentId));
                } else if (prePage === 'payment') {
                    dispatch(paymentAction.getPaymentList())
                }

            } else if (res.success === false) {
                swal('退款失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};