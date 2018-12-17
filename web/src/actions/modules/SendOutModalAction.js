import {apiHost} from '../../config/HostConfig';

const logDetailAction = require('../../actions/main/LogDetailAction');
const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const sendOut = () => async (dispatch, getState) => {
    try {
        // 发货信息
        const logInfo = getState().SendOutModalReducer.logInfo;
        // 快递公司
        const logCompany = getState().SendOutModalReducer.logCompany;
        // 快递单号
        const logNum = getState().SendOutModalReducer.logNum.trim();
        // 运费
        const freight = getState().SendOutModalReducer.freight.trim();
        // 备注
        const remark = getState().SendOutModalReducer.remark.trim();

        if (logInfo.length <= 0 || logCompany === null || logNum === '' || freight === '') {
            swal('修改失败', '请输入完整的发货信息！', 'warning');
        } else {
            const params = {
                logNum: logNum,
                remark: remark,
                logCompanyId: logCompany.value,
                freight: freight
            };
            const url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
                + '/log/' + logInfo[0].id + '/logInfo';
            const res = await httpUtil.httpPut(url, params);
            if (res.success === true) {
                swal("修改成功", "", "success");
                $('#sendOutModal').modal('close');
                // 添加成功后，重新检索画面数据
                dispatch(logDetailAction.getLogInfo(logInfo[0].id))
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};