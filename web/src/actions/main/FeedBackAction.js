import {apiHost} from '../../config/HostConfig';
import {FeedBackActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getFeedBackList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().FeedBackReducer.start;
        // 检索条件：每页数量
        const size = getState().FeedBackReducer.size;

        // 检索条件：售后编号
        const conditionNo = getState().FeedBackReducer.conditionNo.trim();
        // 检索条件：关联订单
        const conditionOrderId = getState().FeedBackReducer.conditionOrderId.trim();
        // 检索条件：申请人
        const conditionUser = getState().FeedBackReducer.conditionUser.trim();
        // 检索条件：手机
        const conditionPhone = getState().FeedBackReducer.conditionPhone.trim();

        // 检索条件：申请时间
        const conditionCreatedOnStart = getState().FeedBackReducer.conditionCreatedOnStart;
        const conditionCreatedOnEnd = getState().FeedBackReducer.conditionCreatedOnEnd;
        // 检索条件：处理时间
        const conditionUpdatedOnStart = getState().FeedBackReducer.conditionUpdatedOnStart;
        const conditionUpdatedOnEnd = getState().FeedBackReducer.conditionUpdatedOnEnd;

        // 检索条件：处理状态
        const conditionStatus = getState().FeedBackReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/orderFeedback?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：售后编号
            orderFeedbackId: conditionNo,
            // 检索条件：关联订单
            orderId: conditionOrderId,
            // 检索条件：申请人
            userName: conditionUser,
            // 检索条件：手机
            phone: conditionPhone,
            // 检索条件：申请时间
            createdOnStart: conditionCreatedOnStart,
            createdOnEnd: conditionCreatedOnEnd,
            // 检索条件：处理时间
            updatedOnStart: conditionUpdatedOnStart,
            updatedOnEnd: conditionUpdatedOnEnd,
            // 检索条件：处理状态
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: FeedBackActionType.setDataSize, payload: res.result.length});
            dispatch({type: FeedBackActionType.getFeedBackList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取售后管理列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};