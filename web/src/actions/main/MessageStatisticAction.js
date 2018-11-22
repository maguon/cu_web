import {apiHost} from '../../config/HostConfig';
import {LogCompanyActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const tempMethod = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if(monthStart === "" || monthStart === undefined){
            monthStart = getState().MessageStatisticReducer.monthStart;
        }

        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if(monthEnd === "" || monthEnd === undefined){
            monthEnd = getState().MessageStatisticReducer.monthEnd;
        }

        console.log('monthStart',monthStart)
        console.log('monthEnd',monthEnd)

        // // 基本检索URL
        // let url = apiHost + '/api/admin/' + localUtil.getLocalItem(sysConst.USER_ID) + '/logCompany?start=0';
        //
        // // 检索条件
        // let conditionsObj = {
        //     // 检索条件：编号
        //     logCompanyId: conditionNo,
        //     // 检索条件：名称
        //     companyName: conditionName,
        //     // 检索条件：联系电话
        //     phone: conditionPhone
        // };
        // let conditions = httpUtil.objToUrl(conditionsObj);
        // // 检索URL
        // url = conditions.length > 0 ? url + "&" + conditions : url;
        // const res = await httpUtil.httpGet(url);
        // if (res.success === true) {
        //     dispatch({type: LogCompanyActionType.getLogCompanyList, payload: res.result});
        // } else if (res.success === false) {
        //     swal('获取快递公司列表信息失败', res.msg, 'warning');
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};