import {apiHost} from '../../config/HostConfig';
import Highcharts from "highcharts/highstock";

const httpUtil = require('../../util/HttpUtil');
const localUtil = require('../../util/LocalUtil');
const sysConst = require('../../util/SysConst');

export const getMsgStatByMonth = () => async (dispatch, getState) => {
    try {
        // 统计开始月份
        let monthStart = $('#monthStart').val();
        if (monthStart === "" || monthStart === undefined) {
            monthStart = getState().MessageStatisticReducer.monthStart;
        }
        // 统计结束月份
        let monthEnd = $('#monthEnd').val();
        if (monthEnd === "" || monthEnd === undefined) {
            monthEnd = getState().MessageStatisticReducer.monthEnd;
        }
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/msgStatByMonth?monthStart=' + monthStart + '&monthEnd=' + monthEnd;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 月份
            let xAxisData = [];
            // 初始化 y轴数据 消息发送-按月统计
            let yAxisData = [
                {
                    name: '信息总数',
                    data: []
                },
                {
                    name: '发送成功数',
                    data: []
                },
                {
                    name: '发送失败数',
                    data: []
                }
            ];

            // 数据反转
            res.result.reverse();

            // 临时的成功消息数
            let successMsgCnt = 0;
            for (let i = 0; i < res.result.length; i++) {
                // 失败的消息数
                if (res.result[i].message_status === 1) {
                    // 数据反转后，第一次条数据为成功的消息
                    successMsgCnt = Math.ceil(res.result[i].user_message_count);
                    // 发送成功数
                    yAxisData[1].data.push(successMsgCnt);
                } else {
                    // 信息总数
                    yAxisData[0].data.push(Math.ceil(res.result[i].user_message_count) + successMsgCnt);
                    // 发送失败数
                    yAxisData[2].data.push(Math.ceil(res.result[i].user_message_count));
                    // x轴月份
                    xAxisData.push(res.result[i].y_month);
                }
            }
            dispatch(showMonthChart(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取消息发送按月统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

export const getMsgStatByDay = () => async (dispatch, getState) => {
    try {
        let dateSize = getState().MessageStatisticReducer.dataSize;
        // 基本检索URL
        let url = apiHost + '/api/admin/' + localUtil.getSessionItem(sysConst.USER_ID)
            + '/msgStatByDay?dateSize=' + dateSize;
        let res = await httpUtil.httpGet(url);
        if (res.success === true) {
            // 初始化 x轴数据 日期
            let xAxisData = [];
            // 初始化 y轴数据 消息发送-按日统计
            let yAxisData = [
                {
                    name: '信息总数',
                    data: []
                },
                {
                    name: '发送成功数',
                    data: []
                },
                {
                    name: '发送失败数',
                    data: []
                }
            ];

            // 数据反转
            res.result.reverse();

            // 临时的成功消息数
            let successMsgCnt = 0;
            for (let i = 0; i < res.result.length; i++) {
                // 失败的消息数
                if (res.result[i].message_status === 1) {
                    // 数据反转后，第一次条数据为成功的消息
                    successMsgCnt = Math.ceil(res.result[i].message_count);
                    // 发送成功数
                    yAxisData[1].data.push(successMsgCnt);
                } else {
                    // 信息总数
                    yAxisData[0].data.push(Math.ceil(res.result[i].message_count) + successMsgCnt);
                    // 发送失败数
                    yAxisData[2].data.push(Math.ceil(res.result[i].message_count));
                    // x轴日期
                    xAxisData.push(res.result[i].id);
                }
            }
            dispatch(showDayChart(xAxisData, yAxisData));
        } else if (res.success === false) {
            swal('获取消息发送按日统计信息失败', res.msg, 'warning');
        }
    } catch (err) {
        swal('操作失败', err.message, 'error');
    }
};

const highChartOptions = (xAxisData, yAxisData) => {
    return {
        // bar: 条形图，line：折线图，column：柱状图
        chart: {
            type: 'line',
        },
        title: {
            text: null
        },
        xAxis: {
            categories: xAxisData,
            crosshair: true
        },
        yAxis: {
            title: {
                text: '消息数',
                // 可用的值有 "low"，"middle" 和 "high"，分别表示于最小值对齐、居中对齐、与最大值对齐。 默认是：middle.
                align: 'middle'
            }
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true
                }
            }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            enabled: false
        },
        series: yAxisData
    };
};

export const showMonthChart = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('month-chart', highChartOptions(xAxisData, yAxisData));
};

export const showDayChart = (xAxisData, yAxisData) => () => {
    // 初始化图表
    Highcharts.chart('day-chart', highChartOptions(xAxisData, yAxisData));
};