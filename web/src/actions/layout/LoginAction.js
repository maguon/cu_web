import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const LocalUtil = require('../../util/LocalUtil');
const SysConst = require('../../util/SysConst');

export const login = (params) => async () => {
    try {
        const res = await httpUtil.httpPost(apiHost + '/api/adminLogin', params);

        if (res.success === true) {
            LocalUtil.setLocalItem(SysConst.USER_ID, res.result.userId);
            LocalUtil.setLocalItem(SysConst.USER_TYPE, res.result.type);
            LocalUtil.setLocalItem(SysConst.AUTH_TOKEN, res.result.accessToken);

            window.location.href = '/index.html';
        } else if (res.success === false) {
            swal('登陆失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};