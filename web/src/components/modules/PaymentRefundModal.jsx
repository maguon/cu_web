import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'react-materialize';
import {PaymentRefundModalActionType} from "../../actionTypes";

const paymentRefundModalAction = require('../../actions/modules/PaymentRefundModalAction');
const formatUtil = require('../../util/FormatUtil');

class PaymentRefundModal extends React.Component {

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
        $('.modal').modal();
    }

    /**
     * 更新 退款金额
     */
    changeRefund = (event) => {
        this.props.setRefundMoney(event.target.value);
    };

    /**
     * 更新 处理描述
     */
    changeRemark = (event) => {
        this.props.setRemark(event.target.value);
    };

    render() {
        const {paymentRefundModalReducer, refund, closeModal} = this.props;
        return (
            <div id="paymentRefundModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">退款</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    {/* 订单信息描述 */}
                    {paymentRefundModalReducer.orderInfo.length > 0 &&
                    <div className="col s12 padding-left20 padding-right20 margin-top10">
                        <div className="col s12 detail-box custom-grey padding-top20 padding-bottom20">
                            <div className="col s6">订单编号：{paymentRefundModalReducer.orderInfo[0].id}</div>
                            <div className="col s6 right-align">
                                <span className="grey-text fz14">下单时间：{formatUtil.getDateTime(paymentRefundModalReducer.orderInfo[0].created_on)}</span>
                            </div>
                            {/* 订单描述 */}
                            <div className="col s12 margin-top10">{paymentRefundModalReducer.orderInfo[0].remark}</div>
                            {/* 支付金额 */}
                            <div className="col s12 margin-top10">支付金额：¥ <span
                                className="red-font bold-font fz16">{formatUtil.formatNumber(paymentRefundModalReducer.orderInfo[0].total_price + paymentRefundModalReducer.orderInfo[0].total_freight, 2)}</span>
                            </div>
                        </div>
                    </div>}

                    {/** 本次退款(元) */}
                    <div className="col s12 margin-top25">
                        <Input s={12} label="本次退款(元)" type="number" className="right-align red-font fz16"
                               value={paymentRefundModalReducer.refundMoney} onChange={this.changeRefund}/>
                    </div>
                    {/** 处理描述 */}
                    <div className="col s12 margin-top10">
                        <Input s={12} label="处理描述" value={paymentRefundModalReducer.remark}
                               onChange={this.changeRemark}/>
                    </div>
                </div>

                {/** Modal固定底部：取消/确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn close-btn" onClick={closeModal}>取消</button>
                    <button type="button" className="btn confirm-btn margin-left20" onClick={refund}>确定</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        paymentRefundModalReducer: state.PaymentRefundModalReducer
    }
};

const mapDispatchToProps = (dispatch) => ({
    setRefundMoney: (value) => {
        dispatch(PaymentRefundModalActionType.setRefundMoney(value))
    },
    setRemark: (value) => {
        dispatch(PaymentRefundModalActionType.setRemark(value))
    },
    refund: () => {
        dispatch(paymentRefundModalAction.refund())
    },
    closeModal: () => {
        $('#paymentRefundModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentRefundModal)
