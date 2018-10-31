import {apiHost} from '../../config/HostConfig';
import QRCode from "qrcode";

const httpUtil = require('../../util/HttpUtil');

export const getQRCode = () => async (dispatch, getState) => {
    try {
        // 基本URL
        const url = apiHost + '/api/user/' + getState().CarQRCodeModalReducer.userId
            + '/userCar/' + getState().CarQRCodeModalReducer.carNo + '/qrCode';
        const res = await httpUtil.httpPost(url, {});

        if (res.success === true) {
            let qrCodeText = apiHost + '/api/qrCode/' + res.result.code;
            QRCode.toCanvas(document.getElementById('canvas'), qrCodeText, {width: 270}, function (error) {});
        } else if (res.success === false) {
            swal('获取车辆二维码失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};