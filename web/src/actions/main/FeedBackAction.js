import {apiHost} from '../../config/HostConfig';
import {OrderActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getOrderList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().OrderReducer.start;
        // 检索条件：每页数量
        const size = getState().OrderReducer.size;

        // 检索条件：订单编号
        const conditionNo = getState().OrderReducer.conditionNo.trim();
        // 检索条件：购买人
        const conditionUser = getState().OrderReducer.conditionUser.trim();
        // 检索条件：手机
        const conditionPhone = getState().OrderReducer.conditionPhone.trim();

        // 检索条件：下单时间
        const conditionCreatedOnStart = getState().OrderReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().OrderReducer.conditionCreatedOnEnd;
        // 检索条件：付款状态
        const conditionPaymentStatus = getState().OrderReducer.conditionPaymentStatus;
        // 检索条件：发货状态
        const conditionLogStatus = getState().OrderReducer.conditionLogStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/order?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：订单编号
            orderId: conditionNo,
            // 检索条件：购买人
            userName: conditionUser,
            // 检索条件：手机
            phone: conditionPhone,
            // 检索条件：绑定时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：付款状态
            paymentStatus: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
            // 检索条件：发货状态
            logStatus: conditionLogStatus === null ? '' : conditionLogStatus.value,
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: OrderActionType.setDataSize, payload: res.result.length});
            dispatch({type: OrderActionType.getOrderList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取订单列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};