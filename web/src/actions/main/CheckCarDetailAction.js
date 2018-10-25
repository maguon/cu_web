import {apiHost} from '../../config/HostConfig';
import {CheckCarDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCheckCarInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID)
            + '/checkCar?checkCarId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: CheckCarDetailActionType.setStatus, payload: res.result[0].status});
                dispatch({type: CheckCarDetailActionType.setCreatedOn, payload: res.result[0].created_on});
                dispatch({type: CheckCarDetailActionType.setPlateNum, payload: res.result[0].license_plate});
                dispatch({type: CheckCarDetailActionType.setVin, payload: res.result[0].vin});
                dispatch({type: CheckCarDetailActionType.setEngineNum, payload: res.result[0].engine_num});
                dispatch({type: CheckCarDetailActionType.setPhone, payload: res.result[0].phone});
                dispatch({type: CheckCarDetailActionType.setCarOwner, payload: res.result[0].user_name});
                dispatch({type: CheckCarDetailActionType.setAddress, payload: res.result[0].address});
                dispatch({type: CheckCarDetailActionType.setSuperviseName, payload: res.result[0].supervise_name});
            } else {
                swal('未获取记录详情，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取记录详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};