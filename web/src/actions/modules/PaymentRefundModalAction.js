import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

// TODO
export const refund = () => async (dispatch, getState) => {
    // 退款信息：订单信息
    const orderInfo = getState().PaymentRefundModalReducer.orderInfo;

    // 退款信息：本次退款
    const refundMoney = getState().PaymentRefundModalReducer.refundMoney.trim();
    // 退款信息：处理描述
    const remark = getState().PaymentRefundModalReducer.remark.trim();
    try {
        if (refundMoney === '' || remark === '') {
            swal('添加失败', '请输入完整的退款信息！', 'warning');
        } else {
            const params = {
                refundFee: refundMoney,
                remark: remark
            };
            const url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/order/' + 1 + '/payment/' + 1 + '/refund';
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