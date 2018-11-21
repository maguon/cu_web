import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {Input} from 'react-materialize';
import {FeedBackDetailActionType} from '../../actionTypes';
import {RefundModal,ReSendModal} from '../modules/index';

const feedBackDetailAction = require('../../actions/main/FeedBackDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class FeedBackDetail extends React.Component {

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
        // 取得售后详情信息
        this.props.getFeedBackInfo();
    }

    /**
     * 售后信息TAB：更新 处理描述
     */
    changeProcessRemark = (event) => {
        this.props.setProcessRemark(event.target.value);
    };

    /**
     * 售后信息TAB：更新 处理方法
     */
    changeProcessMethod = (event) => {
        this.props.setProcessMethod(event.target.value);
    };

    /**
     * 售后信息TAB：退款按钮 点击事件
     */
    showRefundModal = () => {
        $('#refundModal').modal('open');
    };

    /**
     * 售后信息TAB：补发按钮 点击事件
     */
    showReSendModal = () => {
        $('#reSendModal').modal('open');
    };

    render() {
        const {feedBackDetailReducer, updateFeedBack} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/feed_back', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">售后管理 - 售后详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                <div className="row">
                    {/* 订单信息：明细 */}
                    {feedBackDetailReducer.orderInfo.length > 0 &&
                    <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                        <div className="row detail-box-header margin-bottom0">
                            <div className="col s6 no-padding">订单编号：{feedBackDetailReducer.orderInfo[0].id}</div>
                            <div className="col s6 no-padding right-align">
                                <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(feedBackDetailReducer.orderInfo[0].created_on)}</span>
                                <span className="margin-left50">{sysConst.LOG_STATUS[feedBackDetailReducer.orderInfo[0].log_status].label}</span>
                            </div>
                        </div>

                        <div className="col s12 grey-text">
                            {feedBackDetailReducer.productArray.length === 0 &&
                            <div className="row center grey-text margin-top20 fz15">
                                该订单暂无商品记录
                            </div>}
                            {feedBackDetailReducer.productArray.map(function (item) {
                                return (
                                    <div className="col s12 border-bottom-line padding-top20 padding-bottom20">
                                        <div className="col s12 no-padding">
                                            <div className="col s6 no-padding blue-font fz16">{item.product_name}</div>
                                            <div className="col s6 no-padding right-align">x <span className="fz16">{item.prod_count}</span></div>
                                            <div className="col s8 margin-top10 no-padding">{item.remark}</div>
                                            <div className="col s4 margin-top10 no-padding right-align">
                                                单价：¥ <span className="fz16">{formatUtil.formatNumber(item.unit_price, 2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            },this)}

                            <div className="col s12 padding-top20 padding-bottom20">
                                <div className="col s8 no-padding">
                                    收货地址：{feedBackDetailReducer.orderInfo[0].recv_address} {feedBackDetailReducer.orderInfo[0].recv_name} {feedBackDetailReducer.orderInfo[0].recv_phone}
                                </div>
                                <div className="col s4 no-padding right-align">
                                    运费：¥ {formatUtil.formatNumber(feedBackDetailReducer.orderInfo[0].total_freight, 2)}
                                </div>

                                <div className="col s12 no-padding margin-top20 right-align">
                                    <span className="grey-text text-darken-2">支付金额：¥ </span>
                                    <span className="fz16 red-font bold-font">
                                        {formatUtil.formatNumber(feedBackDetailReducer.orderInfo[0].total_price + feedBackDetailReducer.orderInfo[0].total_freight, 2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>}

                    {/* 售后信息 */}
                    {feedBackDetailReducer.feedBackInfo.length > 0 &&
                    <div className="row z-depth-1 detail-box margin-top25 margin-left50 margin-right50">
                        {/* 售后编号 处理状态 */}
                        <div className="row detail-box-header margin-bottom0">
                            <div className="col s6 no-padding">售后编号：{feedBackDetailReducer.feedBackInfo[0].id}</div>
                            <div className="col s6 no-padding right-align">{sysConst.FEED_BACK_STATUS[feedBackDetailReducer.feedBackInfo[0].status].label}</div>
                        </div>

                        {/* 申请人 */}
                        <div className="col s12 padding-top20 padding-bottom10 grey-text">
                            <div className="col s6 grey-text text-darken-2">申请人：{feedBackDetailReducer.feedBackInfo[0].user_name} ({feedBackDetailReducer.feedBackInfo[0].phone})</div>
                            <div className="col s6 fz14 right-align">
                                申请时间：{formatUtil.getDateTime(feedBackDetailReducer.feedBackInfo[0].updated_on)}
                            </div>
                        </div>

                        <div className="col s12 padding-left20 padding-right20"><div className="col s12 dotted-line"/></div>

                        <div className="col s12 padding-top20 padding-bottom20">
                            <div className="col s-percent-8 grey-text text-darken-2">退款原因：</div>
                            <div className="col s-percent-92 padding-left0 grey-text">{feedBackDetailReducer.feedBackInfo[0].apply_reason}</div>
                        </div>

                        <div className="col s12 padding-left20 padding-right20"><div className="col s12 divider"/></div>

                        {/* 售后处理 */}
                        <div className="col s12 padding-top20 padding-bottom10">
                            <div className="col s12 blue-font bold-font">售后处理</div>
                        </div>

                        <div className="col s12 padding-left20 padding-right20 padding-bottom10"><div className="col s12 blue-divider"/></div>

                        <div className="col s12">
                            <Input s={12} label="处理描述" className="right-align" value={feedBackDetailReducer.processRemark} onChange={this.changeProcessRemark}/>
                            <Input s={12} label="处理方法" className="right-align" value={feedBackDetailReducer.processMethod} onChange={this.changeProcessMethod}/>
                        </div>

                        <div className="col s12 right-align padding-bottom20 padding-right20">
                            <button type="button" className="btn confirm-btn" onClick={() => {updateFeedBack(feedBackDetailReducer.feedBackInfo[0].order_id)}}>确定</button>
                        </div>
                    </div>}

                    {/* 退款 补发 按钮 */}
                    <div className="col s12 right-align padding-right70">
                        <button type="button" className="btn confirm-btn" onClick={this.showRefundModal}>退款</button>
                        <button type="button" className="btn confirm-btn margin-left20" onClick={this.showReSendModal}>补发</button>
                    </div>
                    <RefundModal/>
                    <ReSendModal/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feedBackDetailReducer: state.FeedBackDetailReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getFeedBackInfo: () => {
        dispatch(feedBackDetailAction.getFeedBackInfo(ownProps.match.params.id))
    },

    updateFeedBack: (orderId) => {
        dispatch(feedBackDetailAction.updateFeedBack(ownProps.match.params.id ,orderId))
    },
    setProcessRemark: (value) => {
        dispatch(FeedBackDetailActionType.setProcessRemark(value))
    },
    setProcessMethod: (value) => {
        dispatch(FeedBackDetailActionType.setProcessMethod(value))
    },

});

export default connect(mapStateToProps, mapDispatchToProps)(FeedBackDetail)