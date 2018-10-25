import {apiHost} from '../../config/HostConfig';
import {CheckCarActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCheckCarList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().CheckCarReducer.start;
        // 检索条件：每页数量
        const size = getState().CheckCarReducer.size;

        // 检索条件：编号
        const conditionNo = getState().CheckCarReducer.conditionNo.trim();
        // 检索条件：车牌号
        const conditionPlateNum = getState().CheckCarReducer.conditionPlateNum.trim();
        // 检索条件：车主电话
        const conditionPhone = getState().CheckCarReducer.conditionPhone.trim();
        // 检索条件：交警
        const conditionPoliceNm = getState().CheckCarReducer.conditionPoliceNm.trim();
        // 检索条件：扫描时间
        const conditionStartDate = getState().CheckCarReducer.conditionStartDate;
        const conditionEndDate = getState().CheckCarReducer.conditionEndDate;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/checkCar?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            checkCarId: conditionNo,
            // 检索条件：车牌号
            licensePlate: conditionPlateNum,
            // 检索条件：车主电话
            phone: conditionPhone,
            // 检索条件：交警
            superviseName: conditionPoliceNm,
            // 检索条件：扫描时间
            createdStartOn: conditionStartDate,
            createdEndOn: conditionEndDate
        };

        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CheckCarActionType.setDataSize, payload: res.result.length});
            dispatch({type: CheckCarActionType.getCheckCarList, payload: res.result.slice(0, 10)})
        } else if (res.success === false) {
            swal('获取违停扫码列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};