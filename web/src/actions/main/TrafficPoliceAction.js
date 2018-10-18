import {apiHost} from '../../config/HostConfig';
import {TrafficPoliceActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');

export const getPoliceList = () => async (dispatch, getState) => {
    try {
        // 检索条件：开始位置
        const start = getState().TrafficPoliceReducer.start;
        // 检索条件：每页数量
        const size = getState().TrafficPoliceReducer.size;

        // 检索条件：编号
        const conditionNo = getState().TrafficPoliceReducer.conditionNo.trim();
        // 检索条件：姓名
        const conditionName = getState().TrafficPoliceReducer.conditionName.trim();
        // 检索条件：性别
        const conditionGender = getState().TrafficPoliceReducer.conditionGender.value;
        // 检索条件：职务
        const conditionPosition = getState().TrafficPoliceReducer.conditionPosition.value;
        // 检索条件：电话
        const conditionPhone = getState().TrafficPoliceReducer.conditionPhone.trim();
        // 检索条件：状态
        const conditionStatus = getState().TrafficPoliceReducer.conditionStatus.value;

        // 基本检索URL
        let url = apiHost + '/api/admin/' + getState().HeaderReducer.userInfo.id + '/supervise?start=' + start + '&size=' + size;

        // 检索条件
        let conditionsObj = {
            // 检索条件：编号
            superviseId: conditionNo,
            // 检索条件：姓名
            userName: conditionName,
            // 检索条件：性别
            gender: conditionGender,
            // 检索条件：职务
            type: conditionPosition,
            // 检索条件：电话
            phone: conditionPhone,
            // 检索条件：状态
            status: conditionStatus
        };
        let conditions = httpUtil.objToUrl(conditionsObj);
        // 检索URL
        url = conditions.length > 0 ? url + "&" + conditions : url;
        const res = await httpUtil.httpGet(url);

        if (res.success === true) {
            // 前一页
            if (start > 0) {
                $("#pre").show();
            } else {
                $("#pre").hide();
            }
            // 下一页
            if (res.result.length < size) {
                $("#next").hide();
            } else {
                $("#next").show();
            }
            dispatch({type: TrafficPoliceActionType.getPoliceList, payload: res.result.slice(0, 10)})
        } else if (res.success === false) {
            swal('获取交警列表信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addPolice = () => async (dispatch, getState) => {
    // 增加交警：姓名
    const name = getState().TrafficPoliceReducer.name.trim();
    // 增加交警：性别
    const gender = getState().TrafficPoliceReducer.gender;
    // 增加交警：职务
    const position = getState().TrafficPoliceReducer.position.value;
    // 增加交警：电话
    const phone = getState().TrafficPoliceReducer.phone.trim();
    // 增加交警：密码
    const password = getState().TrafficPoliceReducer.password;
    // 增加交警：状态 开通
    const status = getState().TrafficPoliceReducer.policeStatusList[1].value;
    try {
        if (name === '' || position === '' || phone === '' || password === '') {
            swal('添加失败', '请输入完整的交警信息！', 'warning');
        } else {
            const params = {
                userName : name,
                gender : gender,
                password : password,
                phone : phone,
                status : status,
                type : position
            };
            const url = apiHost + '/api/admin/' + getState().HeaderReducer.userInfo.id + '/supervise';
            const res = await httpUtil.httpPost(url, params);

            if (res.success === true) {
                swal("添加成功", "", "success");
                $('#policeModal').modal('close');
                // 添加成功后，重新检索画面数据
                dispatch(getPoliceList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};