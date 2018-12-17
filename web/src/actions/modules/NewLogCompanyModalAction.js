import {apiHost} from '../../config/HostConfig';
import {NewLogCompanyModalActionType} from "../../actionTypes";

const logCompanyAction = require('../../actions/main/LogCompanyAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const saveLogCompany = () => async (dispatch, getState) => {
    // 新增快递公司：画面类型(新建/编辑)
    const pageType = getState().NewLogCompanyModalReducer.pageType;
    // 新增快递公司：快递公司编号
    const companyId = getState().NewLogCompanyModalReducer.companyId;
    // 新增快递公司：快递公司名称
    const companyName = getState().NewLogCompanyModalReducer.companyName.trim();
    // 新增快递公司：联系电话
    const phone = getState().NewLogCompanyModalReducer.phone.trim();
    // 新增快递公司：备注
    const remark = getState().NewLogCompanyModalReducer.remark.trim();
    try {
        if (companyName === '' || phone === '') {
            swal('保存失败', '请输入完整的快递公司信息！', 'warning');
        } else {
            const params = {
                companyName: companyName,
                phone: phone,
                remark: remark
            };

            // 基本url
            let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID) + '/logCompany';
            let res = null;
            // 编辑时
            if (pageType === 'edit') {
                url = url + '/' + companyId + '/logCompanyInfo';
                res = await httpUtil.httpPut(url, params);
            } else {
                // 新建时
                res = await httpUtil.httpPost(url, params);
            }
            if (res.success === true) {
                $('#newLogCompanyModal').modal('close');
                swal("保存成功", "", "success");
                // 保存成功后，重新检索画面数据
                dispatch(logCompanyAction.getLogCompanyList());
            } else if (res.success === false) {
                swal('保存失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getCompanyInfo = (companyId) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/logCompany?logCompanyId=' + companyId;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                dispatch({type: NewLogCompanyModalActionType.setCompanyId, payload: res.result[0].id});
                dispatch({type: NewLogCompanyModalActionType.setCompanyName, payload: res.result[0].company_name});
                dispatch({type: NewLogCompanyModalActionType.setPhone, payload: res.result[0].phone});
                dispatch({type: NewLogCompanyModalActionType.setRemark, payload: res.result[0].remark});
            } else {
                swal('未找到该订单详细信息', '', 'warning');
            }
        } else if (res.success === false) {
            swal('获取订单详细信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};