import {apiHost} from '../../config/HostConfig';
import {PaymentActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getPaymentList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().LogReducer.start;
        // 检索条件：每页数量
        const size = getState().LogReducer.size;

        // 检索条件：发货编号
        const conditionNo = getState().LogReducer.conditionNo.trim();
        // 检索条件：关联订单
        const conditionOrder = getState().LogReducer.conditionOrder.trim();
        // 检索条件：快递公司
        const conditionLogCo = getState().LogReducer.conditionLogCo;
        // 检索条件：物流编号
        const conditionLogNum = getState().LogReducer.conditionLogNum.trim();
        // 检索条件：收货人
        const conditionRecvName = getState().LogReducer.conditionRecvName.trim();
        // 检索条件：收货电话
        const conditionRecvPhone = getState().LogReducer.conditionRecvPhone.trim();
        // 检索条件：创建时间
        const conditionCreatedOnStart = getState().LogReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().LogReducer.conditionCreatedOnEnd;
        // 检索条件：发货时间
        const conditionUpdatedOnStart = getState().LogReducer.conditionUpdatedOnStart;
        const conditionUpdatedOnEnd = getState().LogReducer.conditionUpdatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/log?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：发货编号
            logId: conditionNo,
            // 检索条件：关联订单
            orderId: conditionOrder,
            // 检索条件：快递公司
            logCompanyId: conditionLogCo === null ? '' : conditionLogCo.value,
            // 检索条件：物流编号
            logNum: conditionLogNum,
            // 检索条件：收货人
            recvName: conditionRecvName,
            // 检索条件：收货电话
            recvPhone: conditionRecvPhone,
            // 检索条件：创建时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：发货时间
            updatedOnStart: conditionUpdatedOnStart,
            updatedOnEnd: conditionUpdatedOnEnd
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