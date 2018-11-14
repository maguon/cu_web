import {apiHost} from '../../config/HostConfig';
import {LogCompanyActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getLogCompanyList = () => async (dispatch, getState) => {
    try {
        // 检索条件：编号
        const conditionNo = getState().LogCompanyReducer.conditionNo.trim();
        // 检索条件：名称
        const conditionName = getState().LogCompanyReducer.conditionName.trim();
        // 检索条件：联系电话
        const conditionPhone = getState().LogCompanyReducer.conditionPhone.trim();

        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/logCompany?start=0';

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            logCompanyId: conditionNo,
            // 检索条件：名称
            companyName: conditionName,
            // 检索条件：联系电话
            phone: conditionPhone
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: LogCompanyActionType.getLogCompanyList, payload: res.result});
        } else if (res.success === false) {
            swal('获取快递公司列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};