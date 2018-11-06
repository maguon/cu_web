import {apiHost} from '../../config/HostConfig';

const httpUtil = require('../../util/HttpUtil');

export const refund = () => async (dispatch, getState) => {
    try {
        // 基本URL
        const url = apiHost + '/api/user/' + getState().CarQRCodeModalReducer.userId
            + '/userCar/' + getState().CarQRCodeModalReducer.carNo + '/qrCode';
        const res = await httpUtil.httpPost(url, {});

        if (res.success === true) {
            let qrCodeText = apiHost + '/api/qrCode/' + res.result.code;
        } else if (res.success === false) {
            swal('获取车辆二维码失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};