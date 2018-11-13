import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {OrderDetailModal,PaymentRefundModal} from '../modules/index';
import {PaymentRefundModalActionType} from "../../actionTypes";

const commonAction = require('../../actions/main/CommonAction');
const paymentDetailAction = require('../../actions/main/PaymentDetailAction');
const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class PaymentDetail extends React.Component {

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
        this.props.getPaymentInfo();
    }

    /**
     * 显示 订单详情 模态画面
     */
    showOrderDetailModal = (orderId) => {
        $('#orderDetailModal').modal('open');
        this.props.getOrderDetail(orderId);
    };

    /**
     * 显示 退款 模态画面
     */
    showPaymentRefundModal = () => {
        $('#paymentRefundModal').modal('open');
        this.props.initRefundModalData(this.props.commonReducer.orderInfo);
    };

    render() {
        const {paymentDetailReducer, commonReducer} = this.props;
        return (
            <div>
                {/* 标题部分 */}
                <div className="row margin-bottom0">
                    <div className="input-field col s12">
                        <Link to={{pathname: '/payment', state: {fromDetail: true}}}>
                            <a className="btn-floating btn waves-effect custom-blue waves-light fz15">
                                <i className="mdi mdi-arrow-left-bold"/>
                            </a>
                        </Link>
                        <span className="page-title margin-left30">支付管理 - 支付详情</span>
                        <div className="divider custom-divider margin-top10"/>
                    </div>
                </div>

                {/* 主体部分：支付信息 */}
                {paymentDetailReducer.paymentInfo.length > 0 &&
                <div>
                    <div className="row margin-top40 margin-left50 margin-right50">
                        <div className="col s12 no-padding blue-font bold-font">本次支付</div>
                        <div className="col s12 blue-divider margin-top10"/>
                    </div>

                    <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50">
                        <div className="row detail-box-header vc-center">
                            {/* 支付信息：支付编号 */}
                            <div className="col s6 no-padding">支付编号：{this.props.match.params.id}</div>

                            {/* 支付信息：支付/退款 状态 */}
                            <div className="col s6 no-padding right-align">
                                {sysConst.PAYMENT_TYPE[paymentDetailReducer.paymentInfo[0].type].label}
                            </div>
                        </div>

                        <div className="col s12 grey-text text-darken-2">

                            {/** 订单信息 */}
                            {commonReducer.orderInfo.length > 0 &&
                            <div className="row detail-box custom-grey">
                                {/* 订单信息：订单编号 */}
                                <div className="col s6 margin-top10">订单编号：{commonReducer.orderInfo[0].id}</div>

                                {/* 订单信息：支付/发货 状态 */}
                                <div className="col s6 margin-top10 right-align blue-font">
                                    {sysConst.PAYMENT_STATUS[commonReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[commonReducer.orderInfo[0].log_status].label}
                                </div>

                                {/* 订单信息：订单描述/ */}
                                <div className="col s8 margin-top10 margin-bottom10 context-ellipsis">
                                    {commonReducer.orderInfo[0].remark}
                                </div>

                                {/* 订单信息：下单时间 */}
                                <div className="col s4 margin-top10 margin-bottom10 right-align">
                                    <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</span>
                                </div>

                                {/* 订单信息：查看详情 按钮/ */}
                                <div className="col s12 margin-top10 margin-bottom10 right-align">
                                    <button type="button" className="btn detail-btn" onClick={()=> {this.showOrderDetailModal(commonReducer.orderInfo[0].id)}}>查看详情</button>
                                </div>
                                <OrderDetailModal/>
                            </div>}

                            {/** 支付描述 */}
                            <div className="row">
                                <div className="col s8">
                                    支付人：<span className="grey-text">{paymentDetailReducer.paymentInfo[0].user_name} ({paymentDetailReducer.paymentInfo[0].phone})</span>
                                </div>
                                <div className="col s4 right-align">
                                    支付时间：{formatUtil.getDateTime(paymentDetailReducer.paymentInfo[0].created_on)}
                                </div>
                            </div>

                            {/** 支付金额 */}
                            <div className="row">
                                <div className="col s12 right-align">
                                    支付金额：¥ <span className="red-font bold-font fz16">{formatUtil.formatNumber(paymentDetailReducer.paymentInfo[0].total_fee, 2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 退款 按钮 (存在支付信息，订单信息，并且是支付状态时 显示) */}
                    {paymentDetailReducer.paymentInfo[0].type === sysConst.PAYMENT_TYPE[1].value && commonReducer.orderInfo.length > 0 &&
                    <div>
                        <div className="col s12 right-align padding-top25 padding-right70">
                            <button type="button" className="btn confirm-btn" onClick={this.showPaymentRefundModal}>退款</button>
                        </div>
                        <PaymentRefundModal/>
                    </div>}

                    {/* 相关支付 */}
                    {paymentDetailReducer.relPaymentArray.length > 0 &&
                    <div>
                        <div className="row margin-top25 margin-left50 margin-right50">
                            <div className="col s12 no-padding blue-font bold-font">相关支付</div>
                            <div className="col s12 blue-divider margin-top10"/>
                        </div>

                        {paymentDetailReducer.relPaymentArray.map(function (item) {
                            return (
                                <div className="row z-depth-1 detail-box margin-top10 margin-left50 margin-right50">
                                    <div className="row detail-box-header vc-center">
                                        {/* 支付信息：支付编号 */}
                                        <div className="col s6 no-padding">支付编号：{item.id}</div>

                                        {/* 支付信息：支付/退款 状态 */}
                                        <div className="col s6 no-padding right-align">
                                            {sysConst.PAYMENT_TYPE[item.type].label}
                                        </div>
                                    </div>

                                    <div className="col s12 grey-text text-darken-2">
                                        {/** 支付描述 */}
                                        <div className="row">
                                            <div className="col s8">
                                                支付金额：¥ <span className="red-font bold-font fz16">{formatUtil.formatNumber(item.total_fee, 2)}</span>
                                            </div>
                                            <div className="col s4 right-align">
                                                支付时间：{formatUtil.getDateTime(item.created_on)}
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col s12">
                                                处理描述：<span className="grey-text">{item.remark}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        }, this)
                        }
                    </div>}
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        paymentDetailReducer: state.PaymentDetailReducer,
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    getPaymentInfo: () => {
        dispatch(paymentDetailAction.getPaymentInfo(ownProps.match.params.id));
        dispatch(paymentDetailAction.getRelPaymentList(ownProps.match.params.id));
    },
    getOrderDetail: (orderId) => {
        dispatch(commonAction.getOrderDetail(orderId))
    },
    initRefundModalData: (orderInfo) => {
        dispatch(PaymentRefundModalActionType.setOrderInfo(orderInfo));
        dispatch(PaymentRefundModalActionType.setRefundMoney(''));
        dispatch(PaymentRefundModalActionType.setRemark(''));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail)