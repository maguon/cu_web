import {apiHost} from '../../config/HostConfig';
import {UserAddressActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserAddressList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserAddressReducer.start;
        // 检索条件：每页数量
        const size = getState().UserAddressReducer.size;

        // 检索条件：地址编号
        const conditionNo = getState().UserAddressReducer.conditionNo.trim();
        // 检索条件：收货人
        const conditionShipName = getState().UserAddressReducer.conditionShipName.trim();
        // 检索条件：收货电话
        const conditionShipPhone = getState().UserAddressReducer.conditionShipPhone.trim();
        // 检索条件：用户
        const conditionBindUser = getState().UserAddressReducer.conditionBindUser.trim();
        // 检索条件：绑定手机
        const conditionBindPhone = getState().UserAddressReducer.conditionBindPhone.trim();

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/userShipAddress?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：地址编号
            shipAddressId: conditionNo,
            // 检索条件：收货人
            shipName: conditionShipName,
            // 检索条件：收货电话
            shipPhone: conditionShipPhone,
            // 检索条件：用户
            userName: conditionBindUser,
            // 检索条件：绑定手机
            phone: conditionBindPhone
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserAddressActionType.setDataSize, payload: res.result.length});
            dispatch({type: UserAddressActionType.getUserAddressList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取收货地址列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};