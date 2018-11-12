import React from 'react';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {OrderDetailModal} from '../modules/index';
import {SendOutModalActionType} from "../../actionTypes";

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
     * 显示 发货信息 模态画面
     */
    showSendModal = () => {
        // $('#sendOutModal').modal('open');
        // this.props.setLogInfo(this.props.paymentDetailReducer.paymentInfo);
        // this.props.initModalData();
    };

    /**
     * 显示 发货信息 模态画面
     */
    showOrderDetailModal = (orderId) => {
        $('#orderDetailModal').modal('open');
        this.props.getOrderDetail(orderId);
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
                    <div className="row z-depth-1 detail-box margin-top40 margin-left50 margin-right50">
                        <div className="row detail-box-header vc-center">
                            {/* 消息信息：支付编号 */}
                            <div className="col s6 no-padding">支付编号：{this.props.match.params.id}</div>

                            {/* 消息信息：生成时间 */}
                            <div className="col s6 no-padding right-align">
                                {/*{sysConst.PAYMENT_TYPE[paymentDetailReducer.paymentInfo[0].payment_status].label}*/}
                                {sysConst.PAYMENT_TYPE[0].label}
                            </div>
                        </div>

                        <div className="col s12 grey-text text-darken-2">

                            {/** 订单信息 */}
                            {commonReducer.orderInfo.length > 0 &&
                            <div className="row detail-box custom-grey">
                                {/* 订单信息：订单编号 */}
                                <div className="col s6 margin-top10">订单编号：{commonReducer.orderInfo[0].id}</div>

                                {/* 订单信息：支付/支付/取消 状态 */}
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
                                <div className="col s6">
                                    支付人：<span className="grey-text">{paymentDetailReducer.paymentInfo[0].recv_address}</span>
                                </div>
                                <div className="col s4 right-align">
                                    支付时间：{formatUtil.getDateTime(paymentDetailReducer.paymentInfo[0].created_on)}
                                </div>

                            </div>

                            <div className="row dotted-line margin-left10 margin-right10"/>

                            {/** 收货地址 收货人信息 */}
                            <div className="row">
                                <div className="col s12 right-align">
                                    支付金额：¥ <span className="red-font bold-font fz16">{formatUtil.formatNumber(9999, 2)}</span>
                                </div>
                            </div>

                            {/* 快递公司相关信息 (已支付状态显示) */}
                            {paymentDetailReducer.paymentInfo[0].status === sysConst.LOG_STATUS[1].value &&
                            <div>
                                <div className="row dotted-line margin-left10 margin-right10"/>

                                {/** 快递公司 快递单号 快递费 */}
                                <div className="row">
                                    <div className="col s8">
                                        {paymentDetailReducer.paymentInfo[0].company_name}<span className="margin-left10">{paymentDetailReducer.paymentInfo[0].log_num}</span>
                                    </div>
                                    <div className="col s4 right-align">
                                        快递费：¥ <span className="red-font fz16">{formatUtil.formatNumber(paymentDetailReducer.paymentInfo[0].freight, 2)}</span>
                                    </div>
                                </div>

                                <div className="row dotted-line margin-left10 margin-right10"/>

                                {/** 备注 */}
                                <div className="row">
                                    <div className="col s12">
                                        备注：<span className="grey-text">{paymentDetailReducer.paymentInfo[0].remark}</span>
                                    </div>
                                </div>

                                <div className="row dotted-line margin-left10 margin-right10"/>

                                {/** 支付时间 */}
                                <div className="row">
                                    <div className="col s12 right-align">
                                        <span className="grey-text fz14">支付时间：{formatUtil.getDateTime(paymentDetailReducer.paymentInfo[0].updated_on)}</span>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    </div>
                    {/* 退款 按钮 (支付状态显示) */}
                    {paymentDetailReducer.paymentInfo[0].status === sysConst.LOG_STATUS[0].value &&
                    <div>
                        <div className="col s12 right-align padding-right70">
                            <button type="button" className="btn confirm-btn" onClick={this.showSendModal}>退款</button>
                        </div>
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
        dispatch(paymentDetailAction.getPaymentInfo(ownProps.match.params.id))
    },
    setLogInfo: (value) => {
        dispatch(SendOutModalActionType.setLogInfo(value))
    },


    getOrderDetail: (orderId) => {
        dispatch(commonAction.getOrderDetail(orderId))
    },
    initModalData: () => {
        dispatch(SendOutModalActionType.setLogCompany(null));
        dispatch(SendOutModalActionType.setLogNum(''));
        dispatch(SendOutModalActionType.setFreight(''));
        dispatch(SendOutModalActionType.setRemark(''));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail)
