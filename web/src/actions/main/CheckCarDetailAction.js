import {apiHost} from '../../config/HostConfig';
import {CheckCarDetailActionType} from '../../actionTypes';

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getCheckCarInfo = (id) => async (dispatch) => {
    try {
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/checkCar?checkCarId=' + id;
        const res = await httpUtil.httpGet(url);
        if (res.success === true) {
            dispatch({type: CheckCarDetailActionType.getCheckCarInfo, payload: res.result});

            if (res.result.length > 0) {
                let lon = res.result[0].lon;
                let lat = res.result[0].lat;

                if (lon === 0 && lat === 0) {
                    // 如果没有经纬度，则默认显示大连
                    new AMap.Map("map-container", {
                        resizeEnable: true,
                        center: sysConst.DEFAULT_LOCATION,
                        zoom: 11
                    });
                } else {
                    // 设置地图显示
                    let map = new AMap.Map('map-container', {
                        resizeEnable: true,
                        zoom: 13,
                        center: [lon, lat]
                    });
                    let marker = new AMap.Marker({position: [lon, lat]});
                    map.add(marker);
                }
            }
        } else if (res.success === false) {
            swal('获取记录详情失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};