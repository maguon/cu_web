import React from 'react';
import {connect} from 'react-redux';

// import Highcharts from 'highcharts';
// Alternatively, this is how to load Highstock. Highmaps is similar.
import Highcharts from 'highcharts/highstock';

// Load the exporting module.
import Exporting from 'highcharts/modules/exporting';
// Initialize exporting module.
Exporting(Highcharts);

const logCompanyAction = require('../../actions/main/LogCompanyAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');


class MessageStatistic extends React.Component {

    /**
     * 组件准备要挂载的最一开始，调用执行
     */
    constructor(props) {
        super(props);
    }

    /**
     * 组件完全挂载到页面上，调用执行
     */
    componentDidMount() {
        this.props.getLogCompanyList();

        $('#monthStart,#monthEnd').monthpicker();

        // $('#monthStart,#monthEnd').MonthPicker({
        //     Button: false,
        //     MonthFormat: 'yymm'
        // });

        // // 初始化图表
        let options = {
            // options - see https://api.highcharts.com/highcharts
            chart: {
                type: 'bar',
                marginLeft: 150
            },
            title: {
                text: '截止 2016年4月 Highcharts 最受欢迎的功能需求'
            },
            subtitle: {},
            xAxis: {
                type: 'category',
                title: {
                    text: null
                },
                min: 0,
                max: 4,
                scrollbar: {
                    enabled: true
                },
                tickLength: 0
            },
            yAxis: {
                min: 0,
                max: 1200,
                title: {
                    text: '投票数',
                    align: 'high'
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
                enabled: false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: '投票',
                data: [
                    ["甘特图", 1000],
                    ["自动计算趋势线", 575],
                    ["增加导航器用于多个数据列", 523],
                    ["动态调整图表字体", 427],
                    ["多坐标轴及对其方式控制", 399],
                    ["不规则时间的堆叠图", 309],
                    ["图表高度根据图例高度自适应", 278],
                    ["图表数据导出为 Excel 文件", 239],
                    ["图例切换", 235],
                    ["韦恩图", 203],
                    ["范围选择器可调整位置", 182],
                    ["可拖动的图例", 157],
                    ["桑基图", 149],
                    ["Highstock Y轴滚动条", 144],
                    ["x轴分组", 143],
                    ["ReactJS 插件", 137],
                    ["3D 曲面图", 134],
                    ["在股票图中数据分析线", 118],
                    ["数据库功能模块", 118],
                    ["可拖动的点", 117]
                ]
            }]
        };

        Highcharts.chart('container', options);
    }

    render() {
        const {logCompanyReducer, getLogCompanyList} = this.props;
        return (
            <div>

                {/* 下部分：本月订单数 本月商城收益 本月发布指令 本月申请售后数 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 cyan lighten-1 lighten-4 bold white-text text-darken-1 no-mp">
                        <div className="col s6 left">
                            <p>消息发送-按月统计</p>
                        </div>

                        <div className="col s6 right">
                            <div className="col s3 left"/>

                            <div className="col s3 input-field">
                                {/*<input type="text" id="yearpicker">*/}
                                <input type="text" id="monthStart" value="startInitial" />
                                <i className="mdi mdi-table-large dataIcon"/>
                            </div>
                            <div className="col s1 center">
                                <p>至</p>
                            </div>
                            <div className="col s3 input-field">
                                <input type="text" id="monthEnd" value="endInitial" readonly/>
                                <i className="mdi mdi-table-large dataIcon"/>
                            </div>
                            <div className="col s2 center">
                                <i className="mdi mdi-magnify"/>
                            </div>
                        </div>
                    </div>
                    <div id="container"/>
                </div>


            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logCompanyReducer: state.LogCompanyReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getLogCompanyList: () => {
        dispatch(logCompanyAction.getLogCompanyList())
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageStatistic)