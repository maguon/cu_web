import React from 'react';
import {connect} from 'react-redux';

const sysConst = require('../../util/SysConst');
const formatUtil = require('../../util/FormatUtil');

class OrderDetailModal extends React.Component {

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

    render() {
        const {commonReducer, closeModal} = this.props;
        return (
            <div id="orderDetailModal" className="modal modal-fixed-footer row">

                {/** Modal头部：Title */}
                <div className="modal-title center-align white-text">订单详情</div>

                {/** Modal主体 */}
                <div className="modal-content white grey-text text-darken-2">

                    {/* 订单详情 */}
                    {commonReducer.orderInfo.length > 0 &&
                    <div className="col s12 padding-left20 padding-right20 margin-top10">

                        {/* 订单信息 */}
                        <div className="grey-text">
                            <div className="col s6 blue-font">订单编号：{commonReducer.orderInfo[0].id}</div>
                            <div className="col s6 blue-font right-align fz14">
                                {sysConst.PAYMENT_STATUS[commonReducer.orderInfo[0].payment_status].label}/{sysConst.LOG_STATUS[commonReducer.orderInfo[0].log_status].label}
                            </div>

                            <div className="col s12 margin-top10"><div className="col s12 dotted-line"/></div>

                            <div className="col s6 margin-top10">下单人：{commonReducer.orderInfo[0].user_name} ({commonReducer.orderInfo[0].phone})</div>
                            <div className="col s6 margin-top10 right-align fz14">下单时间：{formatUtil.getDateTime(commonReducer.orderInfo[0].created_on)}</div>

                            <div className="col s12 margin-top10"><div className="col s12 dotted-line"/></div>

                            <div className="col s12 margin-top10">{commonReducer.orderInfo[0].remark}</div>

                            <div className="col s12 margin-top10"><div className="col s12 dotted-line"/></div>

                            <div className="col s8 margin-top10 grey-text">
                                {commonReducer.orderInfo[0].recv_address} {commonReducer.orderInfo[0].recv_name} {commonReducer.orderInfo[0].recv_phone}
                            </div>
                            <div className="col s4 margin-top10 right-align grey-text text-darken-2">
                                运费：¥ {formatUtil.formatNumber(commonReducer.orderInfo[0].total_freight, 2)}
                            </div>
                        </div>

                        {/* 订单信息/订单商品 分割线 */}
                        <div className="col s12 custom-divider margin-top20 margin-bottom10"/>

                        {/* 订单商品 */}
                        {commonReducer.orderItem.map(function (item) {
                            return (
                                <div className="grey-text text-darken-2">
                                    <div className="col s6 margin-top10">{item.product_name} <span className="margin-left10">x {item.prod_count}</span></div>
                                    <div className="col s6 margin-top10 right-align">单价：¥ {formatUtil.formatNumber(item.unit_price, 2)}</div>

                                    <div className="col s8 margin-top10 context-ellipsis grey-text">{item.remark}</div>
                                    <div className="col s4 margin-top10 right-align">总价：¥ {formatUtil.formatNumber(item.total_price, 2)}</div>

                                    <div className="col s12"><div className="col s12 dotted-line margin-top10"/></div>
                                </div>
                            )
                        })}

                        {/* 支付金额 */}
                        <div className="col s12 right-align margin-top20">
                            支付金额：¥ <span className="red-font fz16">{formatUtil.formatNumber(commonReducer.orderInfo[0].total_price + commonReducer.orderInfo[0].total_freight, 2)}</span>
                        </div>
                    </div>}
                </div>

                {/** Modal固定底部：确定按钮 */}
                <div className="modal-footer">
                    <button type="button" className="btn confirm-btn margin-left20" onClick={closeModal}>确定</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        commonReducer: state.CommonReducer
    }
};

const mapDispatchToProps = () => ({
    closeModal: () => {
        $('#orderDetailModal').modal('close');
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal)