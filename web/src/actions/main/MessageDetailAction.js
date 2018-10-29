import {apiHost} from '../../config/HostConfig';
import {MessageDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getMessageInfo = (messageId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/getMessage?userMessageId=' + messageId;
        const res = await httpUtil.httpGet(url);

        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: MessageDetailActionType.setMsgId, payload: messageId});
                dispatch({type: MessageDetailActionType.setMsgCreatedOn, payload: res.result[0].created_on});
                dispatch({type: MessageDetailActionType.setMsgType, payload: res.result[0].type});
                dispatch({type: MessageDetailActionType.setBindUser, payload: res.result[0].user_name});
                dispatch({type: MessageDetailActionType.setPhone, payload: res.result[0].phone});
                dispatch({type: MessageDetailActionType.setMsgContent, payload: res.result[0].content});
            } else {
                swal('未获取消息详情，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取消息详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};