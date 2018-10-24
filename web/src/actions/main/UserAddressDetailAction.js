import {apiHost} from '../../config/HostConfig';
import {UserAddressDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserAddressInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/userShipAddress?shipAddressId=' + id;
        const res = await httpUtil.httpGet(url);

        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: UserAddressDetailActionType.setLastModifyTime, payload: res.result[0].updated_on});
                dispatch({type: UserAddressDetailActionType.setWeChatName, payload: res.result[0].wechat_name});
                dispatch({type: UserAddressDetailActionType.setBindPhone, payload: res.result[0].phone});
                dispatch({type: UserAddressDetailActionType.setShipName, payload: res.result[0].ship_name});
                dispatch({type: UserAddressDetailActionType.setShipPhone, payload: res.result[0].ship_phone});
                dispatch({type: UserAddressDetailActionType.setAddress, payload: res.result[0].address});
            } else {
                swal('未获取收货地址详情，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取收货地址详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};