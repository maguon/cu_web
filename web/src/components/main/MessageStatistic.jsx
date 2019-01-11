import React from 'react';
import {connect} from 'react-redux';
import {MessageStatisticActionType} from "../../actionTypes";

const messageStatisticAction = require('../../actions/main/MessageStatisticAction');
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
        // 初期化 开始月/终了月
        this.props.setMonthStart(formatUtil.formatDate(new Date(), 'yyyy') + '01');
        this.props.setMonthEnd(formatUtil.formatDate(new Date(), 'yyyyMM'));
        // 初期化 统计日数（暂定20）
        this.props.setDataSize('20');
        // 消息发送-按月统计
        this.props.getMsgStatByMonth();
        // 消息发送-按日统计
        this.props.getMsgStatByDay();

        // 初期化 month-picker 组件
        $('#monthStart,#monthEnd').MonthPicker({
            Button: false,
            MonthFormat: 'yymm'
        });
    }

    render() {
        const {messageStatisticReducer, getMsgStatByMonth} = this.props;
        return (
            <div>
                {/* 上部分：消息发送-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-blue bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15">消息发送-按月统计</div>

                        <div className="col s6 right">
                            <div className="col s4 left"/>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthStart" value={messageStatisticReducer.monthStart}/>
                                <i className="mdi mdi-table-large table-icon"/>
                            </div>

                            <div className="col s1 center"><p>至</p></div>

                            <div className="col s3 position-relative">
                                <input type="text" className="margin-bottom0" readOnly id="monthEnd" value={messageStatisticReducer.monthEnd}/>
                                <i className="mdi mdi-table-large table-icon"/>
                            </div>
                            <div className="col s1 center padding-top10">
                                <i className="mdi mdi-magnify fz24 pointer" onClick={getMsgStatByMonth}/>
                            </div>

                        </div>
                    </div>
                    <div id="month-chart" className="statistic-half-page"/>
                </div>

                {/* 下部分：消息发送-按月统计 */}
                <div className="row margin-top40 margin-left50 margin-right50 z-depth-1 white">
                    <div className="col s12 custom-blue bold white-text text-darken-1 no-padding">
                        <div className="col s6 margin-top15 margin-bottom15">消息发送-按日统计</div>
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
        messageStatisticReducer: state.MessageStatisticReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    getMsgStatByMonth: () => {
        dispatch(messageStatisticAction.getMsgStatByMonth())
    },
    getMsgStatByDay: () => {
        dispatch(messageStatisticAction.getMsgStatByDay())
    },
    setMonthStart: (value) => {
        dispatch(MessageStatisticActionType.setMonthStart(value))
    },
    setMonthEnd: (value) => {
        dispatch(MessageStatisticActionType.setMonthEnd(value))
    },
    setDataSize: (value) => {
        dispatch(MessageStatisticActionType.setDataSize(value))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MessageStatistic)