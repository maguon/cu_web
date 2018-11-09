import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";

const logDetailAction = require('../../actions/main/LogDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class LogDetail extends React.Component {

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
        // 取得消息信息
        this.props.getLogInfo();
    }

    /**
     * 售后信息TAB：补发按钮 点击事件
     */
    showSendModal = () => {
        $('#reSendModal').modal('open');
    };

    render() {
        const {logDetailReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/log', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">发货管理 - 发货详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分：发货信息 */}
                {logDetailReducer.logInfo.length > 0 &&
                <div>
                    <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                        <div className="row detail-box-header vc-center">
                            {/* 消息信息：发货编号 */}
                            <div className="col s6 no-padding">发货编号：{this.props.match.params.id}</div>

                            {/* 消息信息：生成时间 */}
                            <div className="col s6 no-padding right-align">
                                <span className="grey-text fz14">生成时间：{formatUtil.getDateTime(logDetailReducer.logInfo[0].created_on)}</span>
                            </div>
                        </div>

                        <div className="col s12 grey-text text-darken-2">

                            {/** 订单信息 */}
                            {logDetailReducer.orderInfo.length > 0 &&
                            <div className="row detail-box custom-grey">
                                {/* 订单信息：订单编号 */}
                                <div className="col s6 margin-top10">订单编号：{logDetailReducer.orderInfo[0].id}</div>

                                {/* 订单信息：支付/发货/取消 状态 */}
                                <div className="col s6 margin-top10 right-align blue-font">
                                    {sysConst.PAYMENT_STATUS[logDetailReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[logDetailReducer.orderInfo[0].log_status].label}
                                </div>

                                {/* 订单信息：订单描述/ */}
                                <div className="col s8 margin-top10 margin-bottom10 context-ellipsis">
                                    {logDetailReducer.orderInfo[0].remark}
                                </div>

                                {/* 订单信息：下单时间 */}
                                <div className="col s4 margin-top10 margin-bottom10 right-align">
                                    <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(logDetailReducer.orderInfo[0].created_on)}</span>
                                </div>
                            </div>}

                            {/** 发货描述 */}
                            <div className="row">
                                <div className="col s12">{logDetailReducer.logInfo[0].product_des}</div>
                            </div>

                            <div className="row dotted-line margin-left10 margin-right10"/>

                            {/** 收货地址 收货人信息 */}
                            <div className="row">
                                <div className="col s8">
                                    收货地址：<span className="grey-text">{logDetailReducer.logInfo[0].recv_address}</span>
                                </div>
                                <div className="col s4 right-align">
                                    收货人：<span className="grey-text">{logDetailReducer.logInfo[0].recv_name} ({logDetailReducer.logInfo[0].recv_phone})</span>
                                </div>
                            </div>

                            {/* 快递公司相关信息 (已发货状态显示) */}
                            {logDetailReducer.logInfo[0].status === sysConst.LOG_STATUS[1].value &&
                            <div>
                                <div className="row dotted-line margin-left10 margin-right10"/>

                                {/** 快递公司 快递单号 快递费 */}
                                <div className="row">
                                    <div className="col s8">
                                        {logDetailReducer.logInfo[0].company_name}<span className="margin-left10">{logDetailReducer.logInfo[0].log_num}</span>
                                    </div>
                                    <div className="col s4 right-align">
                                        快递费：¥ <span className="red-font fz16">{formatUtil.formatNumber(logDetailReducer.logInfo[0].freight, 2)}</span>
                                    </div>
                                </div>

                                <div className="row dotted-line margin-left10 margin-right10"/>

                                {/** 备注 */}
                                <div className="row">
                                    <div className="col s12">
                                        备注：<span className="grey-text">{logDetailReducer.logInfo[0].remark}</span>
                                    </div>
                                </div>

                                <div className="row dotted-line margin-left10 margin-right10"/>

                                {/** 发货时间 */}
                                <div className="row">
                                    <div className="col s12 right-align">
                                        <span className="grey-text fz14">发货时间：{formatUtil.getDateTime(logDetailReducer.logInfo[0].updated_on)}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    {/* 发货 按钮 (未发货状态显示) */}
                    {logDetailReducer.logInfo[0].status === sysConst.LOG_STATUS[0].value &&
                    <div className="col s12 right-align padding-right70">
                        <button type="button" className="btn confirm-btn" onClick={this.showSendModal}>发货</button>
                    </div>}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        logDetailReducer: state.LogDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getLogInfo: () => {
        dispatch(logDetailAction.getLogInfo(ownProps.match.params.id))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogDetail)
