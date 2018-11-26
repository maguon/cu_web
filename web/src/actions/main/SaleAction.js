import {apiHost} from '../../config/HostConfig';
import {SaleActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getSaleList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().SaleReducer.start;
        // 检索条件：每页数量
        const size = getState().SaleReducer.size;

        // // 检索条件：销售编号
        // const conditionNo = getState().SaleReducer.conditionNo.trim();
        // 检索条件：支付状态
        const conditionPaymentStatus = getState().SaleReducer.conditionPaymentStatus;
        // 检索条件：商品编号
        const conditionProductId = getState().SaleReducer.conditionProductId.trim();
        // 检索条件：商品名称
        const conditionProductName = getState().SaleReducer.conditionProductName.trim();
        // 检索条件：关联订单
        const conditionOrderId = getState().SaleReducer.conditionOrderId.trim();
        // 检索条件：售出时间
        const conditionCreatedOnStart = getState().SaleReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().SaleReducer.conditionCreatedOnEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderItem?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：支付状态
            paymentStatus: conditionPaymentStatus === null ? '' : conditionPaymentStatus.value,
            // 检索条件：商品编号
            productId: conditionProductId,
            // 检索条件：商品名称
            productName: conditionProductName,
            // 检索条件：关联订单
            orderId: conditionOrderId,
            // 检索条件：售出时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: SaleActionType.setDataSize, payload: res.result.length});
            dispatch({type: SaleActionType.getSaleList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取商品销售列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};