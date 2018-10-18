import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const login = (params) => async () => {
    try {
        const res = await httpUtil.httpPost(apiHost + '/api/adminLogin', params);

        if (res.success === true) {
            localUtil.setLocalItem(sysConst.USER_ID, res.result.userId);
            localUtil.setLocalItem(sysConst.USER_TYPE, res.result.type);
            localUtil.setLocalItem(sysConst.AUTH_TOKEN, res.result.accessToken);

            window.location.href = '/index.html';
        } else if (res.success === false) {
            swal('登陆失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};