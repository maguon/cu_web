import {apiHost} from '../../config/HostConfig';
import {PaymentDetailActionType} from '../../actionTypes';

const commonAction = require('../../actions/main/CommonAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getPaymentInfo = (logId) => async (dispatch) => {
    console.log('getPaymentInfo');
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/log?logId=' + logId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: PaymentDetailActionType.getPaymentInfo, payload: res.result});
            if (res.result.length > 0) {
                dispatch(commonAction.getOrderInfo(res.result[0].order_id));
            }
        } else if (res.success === false) {
            swal('获取发货详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};