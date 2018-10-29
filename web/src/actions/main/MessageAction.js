import {apiHost} from '../../config/HostConfig';
import {MessageActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getMessageList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().MessageReducer.start;
        // 检索条件：每页数量
        const size = getState().MessageReducer.size;

        // 检索条件：消息编号
        const conditionNo = getState().MessageReducer.conditionNo.trim();
        // 检索条件：接收电话
        const conditionPhone = getState().MessageReducer.conditionPhone.trim();
        // 检索条件：接收用户
        const conditionBindUser = getState().MessageReducer.conditionBindUser.trim();
        // 检索条件：消息类型
        const conditionMsgType = getState().MessageReducer.conditionMsgType;

        // 检索条件：发送时间
        const conditionStartDate = getState().MessageReducer.conditionStartDate;
        const conditionEndDate = getState().MessageReducer.conditionEndDate;
        // 检索条件：是否成功
        const conditionStatus = getState().MessageReducer.conditionStatus;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/getMessage?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：消息编号
            userMessageId: conditionNo,
            // 检索条件：接收电话
            phone: conditionPhone,
            // 检索条件：接收用户
            userName: conditionBindUser,
            // 检索条件：消息类型
            type: conditionMsgType === null ? '' : conditionMsgType.value,
            // 检索条件：发送时间
            createdStartOn: conditionStartDate,
            createdEndOn: conditionEndDate,
            // 检索条件：是否成功
            status: conditionStatus === null ? '' : conditionStatus.value
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: MessageActionType.setDataSize, payload: res.result.length});
            dispatch({type: MessageActionType.getMessageList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取消息列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};