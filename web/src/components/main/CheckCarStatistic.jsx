import React from 'react';
import {connect} from 'react-redux';
import {CheckCarStatisticActionType} from "../../actionTypes";

const checkCarStatisticAction = require('../../actions/main/CheckCarStatisticAction');
const formatUtil = require('../../util/FormatUtil');

class CheckCarStatistic extends React.Component {

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
        // 初期化 开始月/终了月
        this.props.setMonthStart(formatUtil.formatDate(new Date(), 'yyyy') + '01');
        this.props.setMonthEnd(formatUtil.formatDate(new Date(), 'yyyyMM'));
        // 初期化 统计日数（暂定20）
        this.props.setDataSize('20');
        // 扫码-按月统计
        this.props.getCheckCarStatByMonth();
        // 扫码-按日统计
        this.props.getCheckCarStatByDay();

        // 初期化 month-picker 组件
        $('#monthStart,#monthEnd').MonthPicker({
            Button: false,
            MonthFormat: 'yymm'
        });
    }

    render() {
        const {checkCarStatisticReducer, getCheckCarStatByMonth} = this.props;
        return (
            <div>
                {/* 上部分：扫码-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-blue bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15">扫码-按月统计</div>

                        <div className="col s6 right">
                            <div className="col s4 left"/>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthStart" value={checkCarStatisticReducer.monthStart}/>
                                <i className="mdi mdi-table-large table-icon"/>
                            </div>

                            <div className="col s1 center"><p>至</p></div>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthEnd" value={checkCarStatisticReducer.monthEnd}/>
                                <i className="mdi mdi-table-large table-icon"/>
                            </div>
                            <div className="col s1 center padding-top10">
                                <i className="mdi mdi-magnify fz24 pointer" onClick={getCheckCarStatByMonth}/>
                            </div>

                        </div>
                    </div>
                    <div id="month-chart" className="statistic-half-page"/>
                </div>

                {/* 下部分：扫码-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-blue bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15 margin-bottom15">扫码-按日统计</div>
                        <div className="col s6 margin-top15 margin-bottom15 padding-right20 right-align">近 20 天</div>
                    </div>
                    <div id="day-chart" className="statistic-half-page"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        checkCarStatisticReducer: state.CheckCarStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCheckCarStatByMonth: () => {
        dispatch(checkCarStatisticAction.getCheckCarStatByMonth())
    },
    getCheckCarStatByDay: () => {
        dispatch(checkCarStatisticAction.getCheckCarStatByDay())
    },
    setMonthStart: (value) => {
        dispatch(CheckCarStatisticActionType.setMonthStart(value))
    },
    setMonthEnd: (value) => {
        dispatch(CheckCarStatisticActionType.setMonthEnd(value))
    },
    setDataSize: (value) => {
        dispatch(CheckCarStatisticActionType.setDataSize(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckCarStatistic)