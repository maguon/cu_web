import {apiHost} from '../../config/HostConfig';
import {MessageDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getMessageInfo = (messageId) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/getMessage?userMessageId=' + messageId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: MessageDetailActionType.getMessageInfo, payload: res.result});
        } else if (res.success === false) {
            swal('获取消息详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};