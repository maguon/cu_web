import {apiHost} from '../../config/HostConfig';
import {TrafficPoliceActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');

export const getPoliceList = () => async (dispatch, getState) => {
    try {

        // 检索条件：编号
        const conditionNo = getState().TrafficPoliceReducer.conditionNo.trim();
        // 检索条件：姓名
        const conditionName = getState().TrafficPoliceReducer.conditionName.trim();
        // 检索条件：性别
        const conditionGender = getState().TrafficPoliceReducer.conditionGender;
        // 检索条件：职务
        const conditionPosition = getState().TrafficPoliceReducer.conditionPosition;
        // 检索条件：电话
        const conditionPhone = getState().TrafficPoliceReducer.conditionPhone.trim();
        // 检索条件：状态
        const conditionStatus = getState().TrafficPoliceReducer.conditionStatus;

        console.log('conditionNo',conditionNo);
        console.log('conditionName',conditionName);
        console.log('conditionGender',conditionGender);
        console.log('conditionPosition',conditionPosition);
        console.log('conditionPhone',conditionPhone);
        console.log('conditionStatus',conditionStatus);

        // const url = apiHost + '/api/city';
        // const res = await httpUtil.httpGet(url);
        //
        // if (res.success === true) {
        //     dispatch({type: TrafficPoliceActionType.getCityInfo, payload: res.result})
        // } else if (res.success === false) {
        //     swal('获取城市信息失败', res.msg, 'warning');
        // }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const addCity = () => async (dispatch, getState) => {
    try {
        const cityName = getState().TrafficPoliceReducer.cityName.trim();
        if (cityName === '') {
            swal('添加失败', '请输入城市名称！', 'warning');
        } else {
            const userId = getState().HeaderReducer.userInfo.id;
            const params = {
                cityName: cityName
            };
            const url = apiHost + '/api/user/' + userId + '/city';
            const res = await httpUtil.httpPost(url, params);

            if (res.success === true) {
                swal("添加成功", "", "success");
                // 恢复添加前画面样子
                dispatch({type: TrafficPoliceActionType.setCityFormFlag, payload: false});
                dispatch({type: TrafficPoliceActionType.setCityName, payload: ''});
                // 添加成功后，重新检索画面数据
                dispatch(getCityList());
            } else if (res.success === false) {
                swal('添加失败', res.msg, 'warning');
            }
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};