import {apiHost} from '../../config/HostConfig';
import {UserCarActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getUserCarList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().UserCarReducer.start;
        // 检索条件：每页数量
        const size = getState().UserCarReducer.size;

        // 检索条件：车辆编号
        const conditionNo = getState().UserCarReducer.conditionNo.trim();
        // 检索条件：车牌号码
        const conditionPlateNum = getState().UserCarReducer.conditionPlateNum.trim();
        // 检索条件：车辆识别码
        const conditionVin = getState().UserCarReducer.conditionVin.trim();
        // 检索条件：绑定状态
        const conditionBindStatus = getState().UserCarReducer.conditionBindStatus;

        // 检索条件：绑定用户
        const conditionBindUser = getState().UserCarReducer.conditionBindUser.trim();
        // 检索条件：联系电话
        const conditionPhone = getState().UserCarReducer.conditionPhone.trim();
        // 检索条件：绑定时间
        const conditionBindTimeStart = getState().UserCarReducer.conditionBindTimeStart;
        const conditionBindTimeEnd = getState().UserCarReducer.conditionBindTimeEnd;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/userCar?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：车辆编号
            userCarId: conditionNo,
            // 检索条件：车牌号码
            licensePlate: conditionPlateNum,
            // 检索条件：车辆识别码
            vin: conditionVin,
            // 检索条件：绑定状态
            status: conditionBindStatus === null ? '' : conditionBindStatus.value,
            // 检索条件：绑定用户
            userName: conditionBindUser,
            // 检索条件：联系电话
            phone: conditionPhone,
            // 检索条件：绑定时间
            createdStartOn: conditionBindTimeStart,
            createdEndOn: conditionBindTimeEnd
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: UserCarActionType.setDataSize, payload: res.result.length});
            dispatch({type: UserCarActionType.getUserCarList, payload: res.result.slice(0, size - 1)});
        } else if (res.success === false) {
            swal('获取车辆列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};