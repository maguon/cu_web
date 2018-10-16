import {apiHost} from '../../config/HostConfig';
import {TrafficPoliceDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');

export const getPoliceInfo = (id) => async (dispatch, getState) => {
    try {
        // 基本检索URL
        const url = apiHost + '/api/querySupervise?superviseId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            if (res.result.length > 0) {
                let selectedPos = {
                    value: res.result[0].type,
                    label: getState().TrafficPoliceDetailReducer.policePositionList[res.result[0].type].label
                };
                dispatch({type: TrafficPoliceDetailActionType.setStatus, payload: res.result[0].status});
                dispatch({type: TrafficPoliceDetailActionType.setName, payload: res.result[0].user_name});
                dispatch({type: TrafficPoliceDetailActionType.setGender, payload: res.result[0].gender});
                dispatch({type: TrafficPoliceDetailActionType.setPolicePosition, payload: selectedPos});
                dispatch({type: TrafficPoliceDetailActionType.setPhone, payload: res.result[0].phone});
                dispatch({type: TrafficPoliceDetailActionType.setAvatarImg, payload: res.result[0].avatar_image});
                $("#label_name").addClass('active');
                $("#label_phone").addClass('active');
            } else {
                swal('未获取交警信息，请重新查询', res.msg, 'warning');
            }
        } else if (res.success === false) {
            swal('获取交警信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const changeStatus = (id) => async (dispatch, getState) => {
    swal({
        title: "",
        text: "确认修改？",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
    }).then(async function (isConfirm) {
        if (isConfirm && isConfirm.value === true) {
            // 状态
            let status = 0;
            if (getState().TrafficPoliceDetailReducer.status === 0) {
                // 启用
                status = 1
            } else {
                // 停用
                status = 0
            }
            const url = apiHost + '/api/admin/' + getState().HeaderReducer.userInfo.id + '/supervise/' + id + '/updateSuperviseStatus/' + status;
            const res = await httpUtil.httpPut(url, {});

            if (res.success === true) {
                swal("修改成功", "", "success");
                dispatch(getPoliceInfo(id));
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    });
};

export const updatePolice = (id) => async (dispatch, getState) => {

    // 增加交警：姓名
    const name = getState().TrafficPoliceDetailReducer.name.trim();
    // 增加交警：性别
    const gender = getState().TrafficPoliceDetailReducer.gender;
    // 增加交警：职务
    const position = getState().TrafficPoliceDetailReducer.position.value;
    // 增加交警：电话
    const phone = getState().TrafficPoliceDetailReducer.phone.trim();

    try {
        if (name === '' || position === '' || phone === '') {
            swal('修改失败', '请输入完整的交警信息！', 'warning');
        } else {
            const params = {
                userName: name,
                gender: gender,
                phone: phone,
                type: position
            };
            const url = apiHost + '/api/admin/' + getState().HeaderReducer.userInfo.id + '/supervise/' + id + '/updateSupervise';
            const res = await httpUtil.httpPut(url, params);

            if (res.success === true) {
                swal("修改成功", "", "success");
            } else if (res.success === false) {
                swal('修改失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};