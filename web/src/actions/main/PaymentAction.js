import {apiHost} from '../../config/HostConfig';
import {PaymentActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getPaymentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().PaymentReducer.start;
        // 检索条件：每页数量
        const size = getState().PaymentReducer.size;

        // 检索条件：支付编号
        const conditionNo = getState().PaymentReducer.conditionNo.trim();
        // 检索条件：支付类型
        const conditionPaymentType = getState().PaymentReducer.conditionPaymentType;
        // 检索条件：支付人
        const conditionPaymentUser = getState().PaymentReducer.conditionPaymentUser.trim();
        // 检索条件：绑定手机
        const conditionBindPhone = getState().PaymentReducer.conditionBindPhone.trim();
        // 检索条件：关联订单
        const conditionOrder = getState().PaymentReducer.conditionOrder.trim();
        // 检索条件：支付时间
        const conditionCreatedOnStart = getState().PaymentReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().PaymentReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/payment?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：支付编号
            paymentId: conditionNo,
            // 检索条件：支付类型
            type: conditionPaymentType === null ? '' : conditionPaymentType.value,
            // 检索条件：收货人
            userName: conditionPaymentUser,
            // 检索条件：收货电话
            phone: conditionBindPhone,
            // 检索条件：关联订单
            orderId: conditionOrder,
            // 检索条件：支付时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: PaymentActionType.setDataSize, payload: res.result.length});
            dispatch({type: PaymentActionType.getPaymentList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取支付列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};