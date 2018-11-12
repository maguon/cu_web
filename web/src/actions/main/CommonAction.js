import {apiHost} from '../../config/HostConfig';
import {CommonActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLogCoList = () => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/logCompany';
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CommonActionType.getLogCoList, payload: res.result});
        } else if (res.success === false) {
            swal('获取快递公司列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};